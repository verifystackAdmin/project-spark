import { Activity, WifiOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PipelineStatusPillProps = {
  connected: boolean;
  className?: string;
};

export function PipelineStatusPill({ connected, className }: PipelineStatusPillProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            connected
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
            className,
          )}
        >
          <span className="relative flex h-2 w-2">
            {connected ? (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </>
            ) : (
              <WifiOff className="h-3.5 w-3.5" aria-hidden />
            )}
          </span>
          <span className="hidden sm:inline">{connected ? "Pipelines live" : "Degraded"}</span>
          <Activity className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs text-xs">
        {connected
          ? "Gateway connection OK — report list and trust data are syncing from VerifyStack."
          : "Could not load reports cleanly — check your network or try refreshing."}
      </TooltipContent>
    </Tooltip>
  );
}
