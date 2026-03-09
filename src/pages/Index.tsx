import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import ProgressTimeline from "@/components/ProgressTimeline";
import heroImage from "@/assets/hero-construction.jpg";
import { Building2, CreditCard, FileText, CalendarDays, Bell, TrendingUp } from "lucide-react";

const recentUpdates = [
  { title: "Concretagem do 8º andar concluída", time: "Hoje, 14:30", type: "obra" },
  { title: "Boleto de março disponível", time: "Ontem, 09:00", type: "pagamento" },
  { title: "Nova foto da obra publicada", time: "07 Mar, 16:45", type: "obra" },
  { title: "Assembleia marcada para 15/03", time: "05 Mar, 10:00", type: "evento" },
];

const Index = () => {
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
        <StatCard icon={TrendingUp} label="Progresso Geral" value="62%" change="+5% este mês" positive />
        <StatCard icon={CreditCard} label="Próximo Pagamento" value="R$ 3.450" change="Vence em 15/03" />
        <StatCard icon={FileText} label="Documentos" value="12" change="2 novos" positive />
        <StatCard icon={CalendarDays} label="Próximo Evento" value="15 Mar" change="Assembleia" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <ProgressTimeline />
        </div>

        {/* Recent Updates */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="h-5 w-5 text-accent" />
            <h3 className="font-display font-bold text-card-foreground text-lg">Atualizações</h3>
          </div>
          <div className="space-y-4">
            {recentUpdates.map((update, i) => (
              <div key={i} className="flex gap-3 items-start">
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
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
