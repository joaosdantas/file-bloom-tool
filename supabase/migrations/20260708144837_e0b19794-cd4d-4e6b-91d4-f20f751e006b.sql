
-- ============ ENUM ============
CREATE TYPE public.project_role AS ENUM ('owner', 'admin', 'member', 'viewer');

-- ============ COMPANIES ============
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- ============ PROJECTS ============
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'planning',
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_projects_company_id ON public.projects(company_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- ============ PROJECT MEMBERS ============
CREATE TABLE public.project_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.project_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_members TO authenticated;
GRANT ALL ON public.project_members TO service_role;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

-- ============ SECURITY DEFINER HELPERS (avoid recursive RLS) ============
CREATE OR REPLACE FUNCTION public.is_project_member(_project_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE project_id = _project_id AND user_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.has_project_role(_project_id UUID, _user_id UUID, _roles public.project_role[])
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE project_id = _project_id AND user_id = _user_id AND role = ANY(_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_company_member(_company_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.project_members pm
    JOIN public.projects p ON p.id = pm.project_id
    WHERE p.company_id = _company_id AND pm.user_id = _user_id
  );
$$;

-- ============ POLICIES: companies ============
CREATE POLICY "Users view companies they belong to or created"
  ON public.companies FOR SELECT TO authenticated
  USING (created_by = auth.uid() OR public.is_company_member(id, auth.uid()));

CREATE POLICY "Authenticated users can create companies"
  ON public.companies FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creators can update their companies"
  ON public.companies FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creators can delete their companies"
  ON public.companies FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- ============ POLICIES: projects ============
CREATE POLICY "Members can view projects"
  ON public.projects FOR SELECT TO authenticated
  USING (created_by = auth.uid() OR public.is_project_member(id, auth.uid()));

CREATE POLICY "Users can create projects in their companies"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND EXISTS (SELECT 1 FROM public.companies c WHERE c.id = company_id AND c.created_by = auth.uid())
  );

CREATE POLICY "Owners and admins can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (created_by = auth.uid() OR public.has_project_role(id, auth.uid(), ARRAY['owner','admin']::public.project_role[]))
  WITH CHECK (created_by = auth.uid() OR public.has_project_role(id, auth.uid(), ARRAY['owner','admin']::public.project_role[]));

CREATE POLICY "Owners can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (created_by = auth.uid() OR public.has_project_role(id, auth.uid(), ARRAY['owner']::public.project_role[]));

-- ============ POLICIES: project_members ============
CREATE POLICY "Members can view project memberships"
  ON public.project_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_project_member(project_id, auth.uid()));

CREATE POLICY "Owners and admins can add members"
  ON public.project_members FOR INSERT TO authenticated
  WITH CHECK (
    public.has_project_role(project_id, auth.uid(), ARRAY['owner','admin']::public.project_role[])
    OR EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.created_by = auth.uid())
  );

CREATE POLICY "Owners and admins can update members"
  ON public.project_members FOR UPDATE TO authenticated
  USING (public.has_project_role(project_id, auth.uid(), ARRAY['owner','admin']::public.project_role[]))
  WITH CHECK (public.has_project_role(project_id, auth.uid(), ARRAY['owner','admin']::public.project_role[]));

CREATE POLICY "Owners and admins can remove members"
  ON public.project_members FOR DELETE TO authenticated
  USING (public.has_project_role(project_id, auth.uid(), ARRAY['owner','admin']::public.project_role[]));

-- ============ UPDATED_AT TRIGGERS ============
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_members_updated_at
  BEFORE UPDATE ON public.project_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ AUTO-CREATE PROFILE ON SIGNUP ============
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
