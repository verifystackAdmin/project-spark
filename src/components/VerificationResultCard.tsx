import { LucideIcon, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type VerificationStatus = "verified" | "failed" | "warning" | "pending";

interface VerificationResultCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: VerificationStatus;
  details?: string;
}

const VerificationResultCard = ({
  icon: Icon,
  title,
  description,
  status,
  details,
}: VerificationResultCardProps) => {
  const statusConfig = {
    verified: {
      bg: "bg-trust/10",
      border: "border-trust/30",
      icon: CheckCircle,
      iconColor: "text-trust",
      label: "Verified",
    },
    failed: {
      bg: "bg-danger/10",
      border: "border-danger/30",
      icon: XCircle,
      iconColor: "text-danger",
      label: "Failed",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/30",
      icon: AlertTriangle,
      iconColor: "text-warning",
      label: "Warning",
    },
    pending: {
      bg: "bg-muted",
      border: "border-border",
      icon: Loader2,
      iconColor: "text-muted-foreground",
      label: "Pending",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-300 hover:shadow-md",
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shadow-sm">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1.5", config.iconColor)}>
          <StatusIcon
            className={cn("w-5 h-5", status === "pending" && "animate-spin")}
          />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
      </div>
      {details && (
        <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border/50">
          {details}
        </p>
      )}
    </div>
  );
};

export default VerificationResultCard;
