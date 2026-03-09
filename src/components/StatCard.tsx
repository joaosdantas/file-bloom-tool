import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatCard = ({ icon: Icon, label, value, change, positive }: StatCardProps) => (
  <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-display font-bold text-card-foreground mt-1">{value}</p>
        {change && (
          <p className={`text-xs mt-1 font-medium ${positive ? "text-success" : "text-destructive"}`}>
            {change}
          </p>
        )}
      </div>
      <div className="gradient-primary rounded-lg p-2.5">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
  </div>
);

export default StatCard;
