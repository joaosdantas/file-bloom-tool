import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  projectsCount: number;
  documentsCount: number;
  teamCount: number;
  pendingPayments: number;
}

export interface TimelineStage {
  name: string;
  progress: number;
  date: string;
}

export interface RecentActivity {
  id: string;
  title: string;
  time: string;
  type: "obra" | "pagamento" | "evento";
}

export const dashboardService = {
  async getStats(userId: string): Promise<DashboardStats> {
    const { data: memberships } = await supabase
      .from("project_members")
      .select("project_id")
      .eq("user_id", userId);

    const projectIds = (memberships ?? []).map((m) => m.project_id);
    const projectsCount = projectIds.length;

    let teamCount = 0;
    if (projectIds.length > 0) {
      const { data: team } = await supabase
        .from("project_members")
        .select("user_id")
        .in("project_id", projectIds);
      teamCount = new Set((team ?? []).map((t) => t.user_id)).size;
    }

    return {
      projectsCount,
      documentsCount: 0,
      teamCount,
      pendingPayments: 0,
    };
  },

  async getTimeline(userId: string): Promise<TimelineStage[]> {
    return [];
  },

  async getRecentActivities(userId: string): Promise<RecentActivity[]> {
    return [];
  },
};