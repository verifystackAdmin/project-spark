import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type DashboardDropZoneProps = {
  className?: string;
};

export function DashboardDropZone({ className }: DashboardDropZoneProps) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onNavigate = useCallback(() => {
    toast({
      title: "New check",
      description: "Attach documents and subject details on the next step.",
    });
    navigate("/run-check");
  }, [navigate, toast]);

  return (
    <button
      type="button"
      onDragEnter={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        if (e.dataTransfer?.files?.length) {
          toast({
            title: "Files received",
            description: `${e.dataTransfer.files.length} file(s) — continue on New Check to use them.`,
          });
        }
        onNavigate();
      }}
      onClick={onNavigate}
      className={cn(
        "group relative flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-5 text-center transition-all",
        active
          ? "border-primary bg-primary/10 shadow-[0_0_24px_hsl(var(--primary)/0.25)]"
          : "border-primary/35 bg-background/40 hover:border-primary/60 hover:bg-primary/5",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform group-hover:scale-105">
        <Upload className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Drop files to start a check</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Resume, ID scan, or CSV — opens New Check</p>
      </div>
    </button>
  );
}
