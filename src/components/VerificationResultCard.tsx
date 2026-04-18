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
        "relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-md sm:p-5",
        config.bg,
        config.border,
      )}
    >
      {/* Icon + full-width text block so descriptions never squeeze beside the badge */}
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card shadow-sm">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <h4 className="min-w-0 flex-1 text-base font-semibold leading-snug tracking-tight text-foreground text-pretty">
              {title}
            </h4>
            <div
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full bg-card/80 px-2 py-0.5",
                config.iconColor,
              )}
            >
              <StatusIcon className={cn("h-4 w-4 shrink-0 sm:h-5 sm:w-5", status === "pending" && "animate-spin")} />
              <span className="whitespace-nowrap text-xs font-medium sm:text-sm">{config.label}</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground text-pretty hyphens-none [word-break:normal]">
            {description}
          </p>
        </div>
      </div>
      {details && (
        <p className="mt-3 border-t border-border/50 pt-3 text-sm text-muted-foreground">{details}</p>
      )}
    </div>
  );
};

export default VerificationResultCard;
