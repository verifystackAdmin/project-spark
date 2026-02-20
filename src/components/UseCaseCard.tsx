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
        "group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 card-hover overflow-hidden animate-scale-in",
        className
      )}
    >
      {/* Gradient Background on Hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br from-primary/5 to-accent/5"
      )} />

      {/* Animated Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Icon */}
      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default UseCaseCard;
