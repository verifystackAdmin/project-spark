import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, Sparkles } from "lucide-react";
import type { ActionItem } from "@/lib/dashboardNarrative";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionCenterProps = {
  items: ActionItem[];
  className?: string;
};

export function ActionCenter({ items, className }: ActionCenterProps) {
  const hasRisk = items.some((i) => i.priority === "high" || i.title.toLowerCase().includes("attention"));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        {hasRisk ? (
          <ClipboardList className="h-4 w-4 text-[hsl(var(--warning-amber))]" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        )}
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {hasRisk ? "Attention required" : "Next steps"}
        </h3>
      </div>
      <ul className="space-y-2" role="list">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "rounded-xl border p-3 transition-colors",
              item.priority === "high"
                ? "border-destructive/35 bg-destructive/5"
                : "border-border/60 bg-muted/30 hover:bg-muted/45",
            )}
          >
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="mt-2">
              {item.external ? (
                <Button variant={item.priority === "high" ? "default" : "secondary"} size="sm" className="h-8" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                    {item.ctaLabel}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </a>
                </Button>
              ) : (
                <Button variant="secondary" size="sm" className="h-8" asChild>
                  <Link to={item.href} className="inline-flex items-center gap-1">
                    {item.ctaLabel}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
