"use client";

import { useState } from "react";

type Command = { name: string; locked?: boolean };
type Category = { label: string; color: string; commands: Command[] };

const COMMAND_CATEGORIES: Category[] = [
  {
    label: "Setup & Config",
    color: "text-blue-400",
    commands: [
      { name: "/init" }, { name: "/login" }, { name: "/logout" },
      { name: "/config" }, { name: "/permissions" }, { name: "/model" },
      { name: "/theme" }, { name: "/terminal-setup" }, { name: "/doctor" },
      { name: "/onboarding" }, { name: "/mcp" }, { name: "/hooks" },
    ],
  },
  {
    label: "Daily Workflow",
    color: "text-green-400",
    commands: [
      { name: "/compact" }, { name: "/memory" }, { name: "/context" },
      { name: "/plan" }, { name: "/resume" }, { name: "/session" },
      { name: "/files" }, { name: "/add-dir" }, { name: "/copy" },
      { name: "/export" }, { name: "/summary" }, { name: "/clear" },
      { name: "/brief" }, { name: "/output-style", locked: true },
      { name: "/color" }, { name: "/vim" }, { name: "/keybindings" },
      { name: "/skills" }, { name: "/tasks" }, { name: "/agents" },
      { name: "/fast" }, { name: "/effort" }, { name: "/extra-usage" },
      { name: "/rate-limit-options" },
    ],
  },
  {
    label: "Code Review & Git",
    color: "text-orange-400",
    commands: [
      { name: "/review" }, { name: "/commit" }, { name: "/commit-push-pr" },
      { name: "/diff" }, { name: "/pr_comments" }, { name: "/branch" },
      { name: "/issue" }, { name: "/security-review" },
      { name: "/autofix-pr", locked: true }, { name: "/share" },
      { name: "/install-github-app", locked: true },
      { name: "/install-slack-app", locked: true }, { name: "/tag" },
    ],
  },
  {
    label: "Debugging",
    color: "text-red-400",
    commands: [
      { name: "/status" }, { name: "/stats" }, { name: "/cost" },
      { name: "/usage" }, { name: "/version" }, { name: "/feedback" },
      { name: "/think-back" }, { name: "/thinkback-play" }, { name: "/rewind" },
      { name: "/ctx_viz" }, { name: "/debug-tool-call" }, { name: "/perf-issue" },
      { name: "/heapdump" }, { name: "/ant-trace" },
      { name: "/backfill-sessions", locked: true }, { name: "/break-cache", locked: true },
      { name: "/bridge-kick", locked: true }, { name: "/mock-limits", locked: true },
      { name: "/oauth-refresh", locked: true }, { name: "/reset-limits", locked: true },
      { name: "/env" }, { name: "/bughunter", locked: true }, { name: "/passes", locked: true },
    ],
  },
  {
    label: "Advanced",
    color: "text-purple-400",
    commands: [
      { name: "/advisor" }, { name: "/ultraplan", locked: true },
      { name: "/remote-control", locked: true }, { name: "/teleport" },
      { name: "/voice", locked: true }, { name: "/desktop", locked: true },
      { name: "/chrome", locked: true }, { name: "/mobile", locked: true },
      { name: "/sandbox" }, { name: "/plugin" }, { name: "/reload-plugins" },
      { name: "/web-setup" }, { name: "/remote-env" }, { name: "/ide" },
      { name: "/stickers" }, { name: "/good-claude" }, { name: "/btw" },
      { name: "/upgrade" }, { name: "/release-notes" },
      { name: "/privacy-settings" }, { name: "/help" }, { name: "/exit" },
      { name: "/rename" },
    ],
  },
];

const COLOR_MAP: Record<string, string> = {
  "text-blue-400": "bg-blue-400/10 border-blue-400/30 text-blue-400",
  "text-green-400": "bg-green-400/10 border-green-400/30 text-green-400",
  "text-orange-400": "bg-orange-400/10 border-orange-400/30 text-orange-400",
  "text-red-400": "bg-red-400/10 border-red-400/30 text-red-400",
  "text-purple-400": "bg-purple-400/10 border-purple-400/30 text-purple-400",
};

export default function CommandCatalog() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");

  const cat = COMMAND_CATEGORIES[activeCategory];
  const filtered = cat.commands.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const catClass = COLOR_MAP[cat.color] || "";

  return (
    <section id="commands" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted-foreground text-xs font-mono uppercase tracking-widest mb-4">
            04 / Command Catalog
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Every slash command available
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            95+ commands sorted by workflow stage. Explore what Claude Code can do beyond just chatting.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {COMMAND_CATEGORIES.map((c, i) => (
            <button
              key={c.label}
              onClick={() => { setActiveCategory(i); setSearch(""); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                activeCategory === i
                  ? `${COLOR_MAP[c.color]}`
                  : "border-border bg-surface text-muted-foreground hover:text-foreground hover:border-border/70"
              }`}
            >
              {c.label}
              <span className="ml-2 text-xs opacity-60">{c.commands.length}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm mx-auto mb-8">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${cat.label.toLowerCase()}...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Command grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((cmd) => (
            <div
              key={cmd.name}
              className={`group relative flex flex-col gap-1 p-3 rounded-xl border transition-all duration-200 hover:scale-105 cursor-default ${
                cmd.locked
                  ? "border-border bg-surface opacity-60"
                  : `border-border bg-surface hover:${catClass}`
              }`}
            >
              {cmd.locked && (
                <div className="absolute top-2 right-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              )}
              <span className={`font-mono text-sm font-semibold group-hover:${cat.color} transition-colors truncate`}>
                {cmd.name}
              </span>
              {cmd.locked && (
                <span className="text-xs text-muted-foreground">locked</span>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground text-sm">
              No commands matching &quot;{search}&quot;
            </div>
          )}
        </div>

        {/* Count */}
        <div className="text-center mt-8 text-sm text-muted-foreground font-mono">
          Showing {filtered.length} of {cat.commands.length} commands in {cat.label}
        </div>
      </div>
    </section>
  );
}
