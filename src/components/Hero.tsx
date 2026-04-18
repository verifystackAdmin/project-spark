import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Very subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-20 text-center max-w-5xl mx-auto">
        
        {/* Modern Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-sm font-medium rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-zinc-300">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          Enterprise-grade Identity Verification
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
          Verify identities with <br className="hidden md:block" /> absolute certainty
        </h1>
        
        <p className="max-w-2xl mb-10 text-lg md:text-xl text-zinc-400 font-light tracking-wide leading-relaxed">
          Automated background KYC for high-volume hiring and rental identity verification. Secure your assets in seconds, not days.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-20">
          <Link to="/run-check" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto h-12 px-8 text-base bg-white text-black hover:bg-zinc-100 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(255,255,255,0.1)] flex items-center gap-2">
              Verify someone now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto h-12 px-8 text-base bg-white text-black hover:bg-zinc-100 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(255,255,255,0.1)] flex items-center gap-2">
              Request a demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Value Props / Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 w-full pt-10 border-t border-white/5">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">Fraud Prevention</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Detect tampered documents and face mismatches instantly with proprietary AI models.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">Real-time Checks</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Connect directly to government databases for instant, reliable identity confirmation.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">Bank-grade Security</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              End-to-end encryption ensures candidate and tenant data remains completely secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;