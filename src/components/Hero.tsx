import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-white">AI-Powered Verification</span>
        </div>
        {/* Main Heading */}
        <h1 className="max-w-4xl mx-auto mb-6 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 leading-tight"> 
          AI-Powered Verification 
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-xl md:text-2xl text-cyan-100 font-light">
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">Trust in Minutes</span> 
        </p>
        <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-300"> 
          Fast, Accurate, and Secure Background Checks Powered by Advanced AI Technology 
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/run-check">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"> 
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="outline" className="border-cyan-400/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold backdrop-blur-sm"> 
              Learn More 
            </Button>
          </Link>
        </div>
        {/* Feature Grid - Images will be added here */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Image Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/500/400" alt="AI Verification Platform" className="w-full h-full object-cover rounded-xl" />
            </div>
            {/* Right - Features */}
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Identity Verification</h3>
                  <p className="text-gray-400">Instant verification of identity documents with AI-powered accuracy</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Face Matching</h3>
                  <p className="text-gray-400">Advanced facial recognition technology for secure verification</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Social Analysis</h3>
                  <p className="text-gray-400">Comprehensive social media verification and credibility analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;