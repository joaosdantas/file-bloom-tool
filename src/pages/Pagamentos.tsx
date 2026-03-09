import AppLayout from "@/components/AppLayout";
import { CreditCard, Check, Clock, AlertTriangle, Download } from "lucide-react";

const payments = [
  { month: "Março 2025", value: "R$ 3.450,00", status: "pendente", due: "15/03/2025" },
  { month: "Fevereiro 2025", value: "R$ 3.450,00", status: "pago", due: "15/02/2025" },
  { month: "Janeiro 2025", value: "R$ 3.450,00", status: "pago", due: "15/01/2025" },
  { month: "Dezembro 2024", value: "R$ 3.450,00", status: "pago", due: "15/12/2024" },
  { month: "Novembro 2024", value: "R$ 3.450,00", status: "pago", due: "15/11/2024" },
  { month: "Outubro 2024", value: "R$ 3.300,00", status: "pago", due: "15/10/2024" },
];

const statusConfig = {
  pago: { icon: Check, label: "Pago", className: "bg-success/10 text-success" },
  pendente: { icon: Clock, label: "Pendente", className: "bg-warning/10 text-warning" },
  atrasado: { icon: AlertTriangle, label: "Atrasado", className: "bg-destructive/10 text-destructive" },
};

const Pagamentos = () => (
  <AppLayout>
    <h1 className="text-2xl font-display font-bold text-foreground mb-6">Pagamentos</h1>

    {/* Summary */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-card rounded-xl p-5 shadow-card">
        <p className="text-sm text-muted-foreground">Total Pago</p>
        <p className="text-2xl font-display font-bold text-card-foreground mt-1">R$ 41.400</p>
      </div>
      <div className="bg-card rounded-xl p-5 shadow-card">
        <p className="text-sm text-muted-foreground">Próximo Vencimento</p>
        <p className="text-2xl font-display font-bold text-accent mt-1">15/03/2025</p>
      </div>
      <div className="bg-card rounded-xl p-5 shadow-card">
        <p className="text-sm text-muted-foreground">Parcelas Restantes</p>
        <p className="text-2xl font-display font-bold text-card-foreground mt-1">18</p>
      </div>
    </div>

    {/* Payments Table */}
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <h3 className="font-display font-bold text-card-foreground">Histórico de Pagamentos</h3>
      </div>
      <div className="divide-y divide-border">
        {payments.map((p, i) => {
          const config = statusConfig[p.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          return (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="gradient-primary rounded-lg p-2">
                  <CreditCard className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{p.month}</p>
                  <p className="text-xs text-muted-foreground">Vencimento: {p.due}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-card-foreground">{p.value}</span>
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </AppLayout>
);

export default Pagamentos;
