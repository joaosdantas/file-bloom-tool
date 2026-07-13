import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import ProgressTimeline from "@/components/ProgressTimeline";
import heroImage from "@/assets/hero-construction.jpg";
import { Building2, CreditCard, FileText, Users, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  dashboardService,
  DashboardStats,
  TimelineStage,
  RecentActivity,
} from "@/services/dashboardService";

const Index = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [stages, setStages] = useState<TimelineStage[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    if (!user) return;
    dashboardService.getStats(user.id).then(setStats).catch(() => setStats(null));
    dashboardService.getTimeline(user.id).then(setStages).catch(() => setStages([]));
    dashboardService.getRecentActivities(user.id).then(setActivities).catch(() => setActivities([]));
  }, [user]);

  const fmt = (n: number | undefined) => (n === undefined ? "—" : String(n));

  return (
    <AppLayout>
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 lg:h-56">
        <img
          src={heroImage}
          alt="Obra em andamento"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
        <div className="absolute inset-0 flex items-center p-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground mb-2">
              Bem-vindo ao Obratech
            </h1>
            <p className="text-primary-foreground/80 text-sm lg:text-base max-w-lg">
              Acompanhe cada etapa do seu novo apartamento em tempo real
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Building2} label="Obras" value={fmt(stats?.projectsCount)} />
        <StatCard icon={FileText} label="Documentos" value={fmt(stats?.documentsCount)} />
        <StatCard icon={Users} label="Equipe" value={fmt(stats?.teamCount)} />
        <StatCard icon={CreditCard} label="Pagamentos pendentes" value={fmt(stats?.pendingPayments)} />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <ProgressTimeline stages={stages} />
        </div>

        {/* Recent Updates */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="h-5 w-5 text-accent" />
            <h3 className="font-display font-bold text-card-foreground text-lg">Atualizações</h3>
          </div>
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-card-foreground">Sem atividades ainda</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                As novidades da sua obra aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((update) => (
                <div key={update.id} className="flex gap-3 items-start">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    update.type === "obra" ? "bg-success" : update.type === "pagamento" ? "bg-accent" : "bg-primary"
                  }`} />
                  <div>
                    <p className="text-sm text-card-foreground">{update.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
