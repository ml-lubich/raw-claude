"use client";

import { useState } from "react";

const ARCH_NODES = [
  {
    id: "utils",
    label: "utils/",
    files: 564,
    color: "bg-blue-400",
    textColor: "text-blue-400",
    borderColor: "border-blue-400/40",
    desc: "Utility functions: string manipulation, file path helpers, token counting, retry logic, and shared constants used across the entire codebase.",
  },
  {
    id: "components",
    label: "components/",
    files: 389,
    color: "bg-cyan-400",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-400/40",
    desc: "All Ink-based UI components — the terminal renderer. Includes the input prompt, response display, progress indicators, and diff views.",
  },
  {
    id: "commands",
    label: "commands/",
    files: 189,
    color: "bg-green-400",
    textColor: "text-green-400",
    borderColor: "border-green-400/40",
    desc: "Implementation of every slash command. Each command is a self-contained module that registers with the command dispatcher.",
  },
  {
    id: "tools",
    label: "tools/",
    files: 184,
    color: "bg-yellow-400",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-400/40",
    desc: "Tool definitions and handlers. Each tool exports a schema (for the API) and an execute function. Tools can be composed and chained.",
  },
  {
    id: "services",
    label: "services/",
    files: 130,
    color: "bg-orange-400",
    textColor: "text-orange-400",
    borderColor: "border-orange-400/40",
    desc: "External service integrations: Anthropic API client, GitHub, LSP server communication, MCP server management, and telemetry.",
  },
  {
    id: "hooks",
    label: "hooks/",
    files: 104,
    color: "bg-red-400",
    textColor: "text-red-400",
    borderColor: "border-red-400/40",
    desc: "React hooks for the Ink UI layer plus lifecycle hooks that fire after each response: memory update, session logging, post-response triggers.",
  },
  {
    id: "ink",
    label: "ink/",
    files: 96,
    color: "bg-pink-400",
    textColor: "text-pink-400",
    borderColor: "border-pink-400/40",
    desc: "The Ink rendering engine integration — React-for-terminals. Manages the virtual DOM, diffing, and terminal output rendering.",
  },
  {
    id: "bridge",
    label: "bridge/",
    files: 31,
    color: "bg-purple-400",
    textColor: "text-purple-400",
    borderColor: "border-purple-400/40",
    desc: "The remote control bridge — lets you operate Claude Code from a phone or browser. Uses WebSockets for bidirectional communication.",
  },
  {
    id: "constants",
    label: "constants/",
    files: 21,
    color: "bg-indigo-400",
    textColor: "text-indigo-400",
    borderColor: "border-indigo-400/40",
    desc: "Shared constants: model names, API endpoints, default configuration values, feature flag names, and error message templates.",
  },
  {
    id: "skills",
    label: "skills/",
    files: 20,
    color: "bg-teal-400",
    textColor: "text-teal-400",
    borderColor: "border-teal-400/40",
    desc: "Pre-built skill packs — reusable behavior bundles that extend Claude Code's capabilities for specific domains like Python, Rust, and web dev.",
  },
];

export default function ArchExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNode = ARCH_NODES.find((n) => n.id === selected);

  return (
    <section id="arch" className="relative py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted-foreground text-xs font-mono uppercase tracking-widest mb-4">
            02 / Architecture Explorer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Click around the source tree
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            1,900+ files across 10 major directories. Click any node to explore what lives inside.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Source tree visualization */}
          <div className="flex-1">
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">src/</span>
              </div>
              <div className="p-4 space-y-2">
                {ARCH_NODES.map((node) => {
                  const isSelected = selected === node.id;
                  const barWidth = Math.round((node.files / 564) * 100);
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelected(isSelected ? null : node.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left group ${
                        isSelected
                          ? `${node.borderColor} bg-surface-2`
                          : "border-transparent hover:border-border hover:bg-surface-2"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${node.color} flex-shrink-0`} />
                      <span className={`font-mono text-sm flex-shrink-0 w-32 ${isSelected ? node.textColor : "text-muted-foreground group-hover:text-foreground"} transition-colors`}>
                        {node.label}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${node.color} transition-all duration-500`}
                          style={{ width: `${barWidth}%`, opacity: isSelected ? 1 : 0.5 }}
                        />
                      </div>
                      <span className={`text-xs font-mono flex-shrink-0 w-16 text-right ${isSelected ? node.textColor : "text-muted-foreground"} transition-colors`}>
                        {node.files} files
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 lg:max-w-sm">
            {selectedNode ? (
              <div className={`rounded-2xl border ${selectedNode.borderColor} bg-surface overflow-hidden`}>
                <div className={`h-1 w-full ${selectedNode.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${selectedNode.color} opacity-20 flex items-center justify-center`}>
                      <div className={`w-4 h-4 rounded-full ${selectedNode.color}`} />
                    </div>
                    <div>
                      <div className={`font-mono font-bold text-lg ${selectedNode.textColor}`}>
                        {selectedNode.label}
                      </div>
                      <div className="text-muted-foreground text-xs">{selectedNode.files} files</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedNode.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col items-center justify-center text-center min-h-48">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                    <path d="M3 3h18v18H3z" rx="2" />
                    <path d="M9 9h6M9 12h6M9 15h4" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">
                  Click a directory to explore what&apos;s inside
                </p>
              </div>
            )}

            {/* Total count */}
            <div className="mt-4 rounded-xl border border-border bg-surface p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-mono">Total source files</span>
              <span className="text-lg font-bold text-accent font-mono">1,900+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
