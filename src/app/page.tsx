import { ArrowRight, Database, Github, Globe, Layout, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span>Supabase<span className="text-purple-500">App</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
          <button className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-purple-500/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            TypeScript + Next.js + Supabase Ready
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Build Faster with <br /> Modern Stack
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed">
            The ultimate starter for your next breakthrough SaaS.
            Deployed on Vercel, powered by Supabase, and written in TypeScript.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_40px_rgba(168,85,247,0.2)]">
              Start Building Now
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Auth & Security", desc: "Built-in authentication with Supabase Auth." },
            { icon: Database, title: "Realtime Database", desc: "PostgreSQL with realtime subscriptions." },
            { icon: Globe, title: "Edge Functions", desc: "Run your server-side logic globally with Vercel." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/10 transition-colors">
                <item.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm">© 2026 SupabaseApp. Modern Web Architecture.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
