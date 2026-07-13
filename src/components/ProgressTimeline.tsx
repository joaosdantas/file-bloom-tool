import { Check, Clock, CalendarClock } from "lucide-react";
import { TimelineStage } from "@/services/dashboardService";

interface ProgressTimelineProps {
  stages: TimelineStage[];
}

const ProgressTimeline = ({ stages }: ProgressTimelineProps) => (
  <div className="bg-card rounded-xl p-6 shadow-card">
    <h3 className="font-display font-bold text-card-foreground text-lg mb-6">Etapas da Obra</h3>
    {stages.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <CalendarClock className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-card-foreground">Nenhuma etapa cadastrada</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          O cronograma da sua obra aparecerá aqui assim que for publicado.
        </p>
      </div>
    ) : (
    <div className="space-y-4">
      {stages.map((stage, i) => {
        const done = stage.progress === 100;
        const active = stage.progress > 0 && stage.progress < 100;
        return (
          <div key={stage.name} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? "bg-success text-success-foreground"
                    : active
                    ? "gradient-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              {i < stages.length - 1 && (
                <div className={`w-0.5 h-6 ${done ? "bg-success" : "bg-border"}`} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${done ? "text-success" : active ? "text-card-foreground" : "text-muted-foreground"}`}>
                  {stage.name}
                </span>
                <span className="text-xs text-muted-foreground">{stage.date}</span>
              </div>
              {active && (
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-accent transition-all duration-500"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    )}
  </div>
);

export default ProgressTimeline;
