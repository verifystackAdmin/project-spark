import { motion } from "framer-motion";

const AIScanAnimation = () => {
  const dataPoints = [
    { label: "Name", value: "Rajesh Kumar", delay: 1.2 },
    { label: "Age", value: "34", delay: 1.6 },
    { label: "Address", value: "Mumbai, MH", delay: 2.0 },
    { label: "ID Match", value: "Verified ✓", delay: 2.4 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      {/* Blurred ID Card */}
      <div className="absolute inset-0 rounded-2xl bg-secondary/80 border border-border/50 overflow-hidden backdrop-blur-sm">
        {/* Card content (blurred) */}
        <div className="p-6 filter blur-[2px]">
          <div className="flex items-start gap-4">
            <div className="w-20 h-24 rounded-lg bg-muted/60" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
              <div className="h-3 w-1/2 rounded bg-muted-foreground/15" />
              <div className="h-3 w-2/3 rounded bg-muted-foreground/15" />
              <div className="h-3 w-1/3 rounded bg-muted-foreground/10" />
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
            <div className="h-2.5 w-5/6 rounded bg-muted-foreground/10" />
            <div className="h-2.5 w-2/3 rounded bg-muted-foreground/10" />
          </div>
        </div>

        {/* AI Scanning Line */}
        <motion.div
          className="absolute left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(185 100% 50%) 20%, hsl(185 100% 50%) 80%, transparent 100%)",
            boxShadow: "0 0 20px hsl(185 100% 50% / 0.6), 0 0 60px hsl(185 100% 50% / 0.3)",
          }}
          animate={{
            top: ["10%", "90%", "10%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Scan glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 10%, hsl(185 100% 50% / 0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 90%, hsl(185 100% 50% / 0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse at 50% 10%, hsl(185 100% 50% / 0.05) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Extracted Data Points - floating out from card */}
      <div className="absolute -right-4 top-4 bottom-4 flex flex-col justify-center gap-3">
        {dataPoints.map((point, i) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: point.delay,
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 4,
              repeatType: "loop",
            }}
            className="glass-card rounded-lg px-3 py-1.5 text-xs whitespace-nowrap"
          >
            <span className="text-muted-foreground">{point.label}: </span>
            <span className="text-accent font-mono font-semibold">{point.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Trust Score - appears at end */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 3,
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 3.4,
          repeatType: "loop",
        }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-xl px-5 py-3 border-trust/30"
        style={{
          borderColor: "hsl(152 82% 42% / 0.3)",
          boxShadow: "0 0 30px hsl(152 82% 42% / 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(152 82% 42%), hsl(185 100% 50%))",
              color: "hsl(222 47% 5%)",
            }}
          >
            87
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Trust Score</div>
            <div className="text-sm font-semibold" style={{ color: "hsl(152 82% 42%)" }}>
              87/100
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIScanAnimation;
