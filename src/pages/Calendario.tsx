import AppLayout from "@/components/AppLayout";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";

const events = [
  {
    date: "15",
    month: "MAR",
    title: "Assembleia de Condomínio",
    time: "19:00",
    location: "Salão do empreendimento",
    type: "assembleia",
  },
  {
    date: "20",
    month: "MAR",
    title: "Visita técnica à obra",
    time: "10:00 - 12:00",
    location: "Canteiro de obras",
    type: "visita",
  },
  {
    date: "01",
    month: "ABR",
    title: "Escolha de acabamentos",
    time: "09:00 - 17:00",
    location: "Showroom da construtora",
    type: "personalização",
  },
  {
    date: "15",
    month: "ABR",
    title: "Vencimento parcela abril",
    time: "Até 23:59",
    location: "Online",
    type: "pagamento",
  },
  {
    date: "10",
    month: "MAI",
    title: "Encontro de compradores",
    time: "15:00",
    location: "Área comum do empreendimento",
    type: "comunidade",
  },
];

const typeColors: Record<string, string> = {
  assembleia: "bg-primary/10 text-primary border-primary/20",
  visita: "bg-success/10 text-success border-success/20",
  personalização: "bg-accent/10 text-accent border-accent/20",
  pagamento: "bg-warning/10 text-warning border-warning/20",
  comunidade: "bg-primary/10 text-primary border-primary/20",
};

const Calendario = () => (
  <AppLayout>
    <h1 className="text-2xl font-display font-bold text-foreground mb-6">Calendário de Eventos</h1>

    <div className="space-y-4">
      {events.map((event, i) => (
        <div key={i} className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">
          <div className="flex">
            <div className="gradient-primary flex flex-col items-center justify-center px-5 py-4 min-w-[80px]">
              <span className="text-2xl font-display font-bold text-primary-foreground">{event.date}</span>
              <span className="text-xs font-semibold text-primary-foreground/70">{event.month}</span>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${typeColors[event.type]}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default Calendario;
