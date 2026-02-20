import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  className?: string;
}

const UseCaseCard = ({ icon: Icon, title, description, gradient, className }: UseCaseCardProps) => {
  return (
    <div
      className={cn(
        "group relative glass-card-hover rounded-2xl p-6 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500">
        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
      </div>

      <h3 className="relative text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export default UseCaseCard;
