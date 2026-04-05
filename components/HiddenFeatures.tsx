"use client";

import { useState } from "react";

const FEATURES = [
  {
    id: "buddy",
    name: "Buddy",
    tagline: "A virtual pet that lives in your terminal",
    desc: "Species and rarity are derived from your account ID. Buddy exists as ambient companionship during long coding sessions — a small creature that reacts to what you're building.",
    source: "src/entrypoints/buddy/",
    status: "Feature-flagged",
    color: "from-pink-500 to-rose-400",
    icon: "B",
  },
  {
    id: "kairos",
    name: "Kairos",
    tagline: "Persistent mode with memory consolidation",
    desc: "Between sessions, Kairos consolidates memory and takes autonomous background actions. It bridges sessions with continuity — Claude Code that remembers what it was working on.",
    source: "src/entrypoints/kairos/",
    status: "Env-gated",
    color: "from-amber-500 to-yellow-400",
    icon: "K",
  },
  {
    id: "ultraplan",
    name: "UltraPlan",
    tagline: "Long planning sessions on Opus-class models",
    desc: "Up to 30-minute execution windows on the most capable models. UltraPlan is designed for large-scale refactors, architecture decisions, and complex multi-repository tasks.",
    source: "src/commands/ultraplan/",
    status: "Env-gated",
    color: "from-violet-500 to-purple-400",
    icon: "U",
  },
  {
    id: "coordinator",
    name: "Coordinator Mode",
    tagline: "Parallel agents in isolated git worktrees",
    desc: "A lead agent breaks tasks apart and spawns parallel workers in isolated git worktrees. Results are collected and merged. True multi-agent parallelism for massive codebases.",
    source: "src/tools/TaskCreate/",
    status: "Feature-flagged",
    color: "from-blue-500 to-cyan-400",
    icon: "C",
  },
  {
    id: "bridge",
    name: "Bridge",
    tagline: "Control Claude Code from your phone or browser",
    desc: "Full remote session with permission approvals on mobile. The bridge uses WebSockets and a relay server to forward all terminal I/O to a web interface in real time.",
    source: "src/bridge/",
    status: "Feature-flagged",
    color: "from-teal-500 to-green-400",
    icon: "B",
  },
  {
    id: "daemon",
    name: "Daemon Mode",
    tagline: "Run sessions in the background with --bg",
    desc: "Uses tmux under the hood. Sessions survive terminal closures and communicate with each other through the UDS inbox. Background AI work that doesn't block your shell.",
    source: "src/entrypoints/",
    status: "Feature-flagged",
    color: "from-slate-500 to-gray-400",
    icon: "D",
  },
  {
    id: "uds",
    name: "UDS Inbox",
    tagline: "Sessions talk over Unix domain sockets",
    desc: "Inter-agent communication layer. Sessions can send messages, share context, and coordinate work through a local Unix domain socket inbox. The backbone of multi-agent Claude Code.",
    source: "src/bridge/uds.ts",
    status: "Commented out",
    color: "from-orange-500 to-amber-400",
    icon: "U",
  },
  {
    id: "dream",
    name: "Auto-Dream",
    tagline: "Between sessions, the AI organizes what it learned",
    desc: "After a session ends, Claude reviews what happened and consolidates learnings into persistent memory. Think of it as sleep-time memory consolidation for your AI coding assistant.",
    source: "src/entrypoints/kairos/dream.ts",
    status: "Feature-flagged",
    color: "from-indigo-500 to-blue-400",
    icon: "A",
  },
];

export default function HiddenFeatures() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const reveal = (id: string) => {
    setRevealed((prev) => new Set([...prev, id]));
    setSelected(id);
  };

  const selectedFeature = FEATURES.find((f) => f.id === selected);

  return (
    <section id="hidden" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted-foreground text-xs font-mono uppercase tracking-widest mb-4">
            05 / Hidden Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Stuff in the code but not shipped yet
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Feature-flagged, env-gated, or just commented out. Click to reveal each hidden feature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => {
            const isRevealed = revealed.has(feature.id);
            const isSelected = selected === feature.id;

            return (
              <button
                key={feature.id}
                onClick={() => reveal(feature.id)}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 text-left ${
                  isSelected
                    ? "border-accent/50 bg-surface scale-[1.02]"
                    : isRevealed
                    ? "border-border bg-surface hover:border-accent/30"
                    : "border-border bg-surface hover:border-accent/30 hover:scale-[1.01]"
                }`}
              >
                {/* Gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${feature.color}`} />

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{feature.name}</div>
                      <div className="text-xs text-muted-foreground">{feature.status}</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.tagline}
                  </p>

                  {isRevealed ? (
                    <div className="space-y-3 animate-fade-in">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                      <div className="font-mono text-xs text-accent bg-accent-dim rounded-lg px-3 py-2 border border-accent/20 break-all">
                        {feature.source}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-accent font-medium">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Click to reveal
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Reveal counter */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-surface">
            <div className="flex items-center gap-1">
              {FEATURES.map((f) => (
                <div
                  key={f.id}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    revealed.has(f.id) ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {revealed.size} / {FEATURES.length} revealed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
