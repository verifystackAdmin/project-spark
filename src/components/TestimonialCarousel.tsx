import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "HR Manager, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "VerifyStack has transformed our hiring process. We verify candidates' backgrounds in minutes instead of days. The AI accuracy is remarkable.",
  },
  {
    name: "Rajesh Kumar",
    role: "Property Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I screen every tenant before renting. It's given me peace of mind knowing I'm renting to verified individuals with clean records.",
  },
  {
    name: "Anita Desai",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The relationship analysis helped me understand my business partner before signing. Invaluable for making informed decisions.",
  },
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute top-6 right-6 opacity-5">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < testimonials[activeIndex].rating
                        ? "text-warning fill-warning"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>

              <p className="text-lg text-foreground leading-relaxed mb-8 min-h-[80px]">
                "{testimonials[activeIndex].text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => { setIsAutoPlaying(false); setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); }}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setActiveIndex(i); }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => { setIsAutoPlaying(false); setActiveIndex((prev) => (prev + 1) % testimonials.length); }}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
