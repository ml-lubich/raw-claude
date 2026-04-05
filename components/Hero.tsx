"use client";

import { useEffect, useState } from "react";

const STATS = [
  { value: "1,900+", label: "Files" },
  { value: "519K+", label: "Lines of Code" },
  { value: "53+", label: "Tools" },
  { value: "95+", label: "Commands" },
];

const TERMINAL_LINES = [
  { text: "$ claude-code --analyze", delay: 0 },
  { text: "> Parsing 1,900 source files...", delay: 600 },
  { text: "> Building agent loop graph...", delay: 1200 },
  { text: "> Mapping 53 tool definitions...", delay: 1800 },
  { text: "> Extracting hidden features...", delay: 2400 },
  { text: "> Analysis complete.", delay: 3000, accent: true },
];

function TerminalLine({ text, delay, accent }: { text: string; delay: number; accent?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;
  return (
    <div className={`font-mono text-sm leading-relaxed animate-fade-in ${accent ? "text-accent" : "text-muted-foreground"}`}>
      {text}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-16">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl" />
        <div className="orb-2 absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-400 opacity-5 blur-3xl" />
        <div className="orb-3 absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-cyan-400 opacity-3 blur-3xl" />
      </div>

      {/* Top badge */}
      <div className={`mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent-dim text-accent text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          Featured on Hacker News
        </div>
      </div>

      {/* Headline */}
      <div className={`text-center max-w-4xl px-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-balance mb-6">
          <span className="text-foreground">Claude Code</span>
          <br />
          <span className="text-accent glow-text">Unpacked</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          What actually happens when you type a message into Claude Code? The agent loop, 50+ tools, multi-agent orchestration, and unreleased features — mapped straight from the source.
        </p>
      </div>

      {/* CTA buttons */}
      <div className={`flex flex-wrap items-center justify-center gap-4 mt-10 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <a
          href="#agent-loop"
          className="px-6 py-3 rounded-xl bg-accent text-background font-semibold text-sm hover:bg-accent/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
        >
          Start Exploring
        </a>
        <a
          href="#tools"
          className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-accent hover:text-accent transition-all duration-200 hover:scale-105 active:scale-95"
        >
          View Tools
        </a>
      </div>

      {/* Stats row */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-3xl px-6 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 p-4 rounded-xl border border-border bg-surface hover:border-accent/50 transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl md:text-3xl font-bold text-accent font-mono">{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Terminal preview */}
      <div className={`mt-16 w-full max-w-xl px-6 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">claude-code — analysis</span>
          </div>
          <div className="p-4 space-y-1 min-h-36">
            {TERMINAL_LINES.map((line, i) => (
              <TerminalLine key={i} {...line} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
