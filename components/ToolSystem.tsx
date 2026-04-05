"use client";

import { useState } from "react";

type Tool = {
  name: string;
  locked?: boolean;
};

type Category = {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tools: Tool[];
  desc: string;
};

const TOOL_CATEGORIES: Category[] = [
  {
    label: "File Operations",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    desc: "Read, write, and edit files on disk. The backbone of code modification.",
    tools: [
      { name: "FileRead" },
      { name: "FileEdit" },
      { name: "FileWrite" },
      { name: "Glob" },
      { name: "Grep" },
      { name: "NotebookEdit" },
    ],
  },
  {
    label: "Execution",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    desc: "Run arbitrary code in bash, PowerShell, or a persistent REPL session.",
    tools: [{ name: "Bash" }, { name: "PowerShell" }, { name: "REPL" }],
  },
  {
    label: "Search & Fetch",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    desc: "Browse the web, fetch URLs, search the internet, and query tool docs.",
    tools: [
      { name: "WebBrowser", locked: true },
      { name: "WebFetch" },
      { name: "WebSearch" },
      { name: "ToolSearch" },
    ],
  },
  {
    label: "Agents & Tasks",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/30",
    desc: "Spawn sub-agents, send inter-agent messages, and manage task queues.",
    tools: [
      { name: "Agent" },
      { name: "SendMessage" },
      { name: "TaskCreate" },
      { name: "TaskGet" },
      { name: "TaskList" },
      { name: "TaskUpdate" },
      { name: "TaskStop" },
      { name: "TaskOutput" },
      { name: "TeamCreate" },
      { name: "TeamDelete" },
      { name: "ListPeers", locked: true },
    ],
  },
  {
    label: "Planning",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    desc: "Enter plan mode, work in git worktrees, and verify execution against plans.",
    tools: [
      { name: "EnterPlanMode" },
      { name: "ExitPlanMode" },
      { name: "EnterWorktree" },
      { name: "ExitWorktree" },
      { name: "VerifyPlanExecution", locked: true },
    ],
  },
  {
    label: "MCP",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    desc: "Model Context Protocol — connect to external MCP servers and resources.",
    tools: [
      { name: "mcp" },
      { name: "ListMcpResources" },
      { name: "ReadMcpResource" },
      { name: "McpAuth" },
    ],
  },
  {
    label: "System",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    desc: "Ask questions, manage todos, invoke skills, configure Claude behavior.",
    tools: [
      { name: "AskUserQuestion" },
      { name: "TodoWrite" },
      { name: "Skill" },
      { name: "Config" },
      { name: "RemoteTrigger", locked: true },
      { name: "CronCreate", locked: true },
      { name: "CronDelete", locked: true },
      { name: "CronList", locked: true },
      { name: "Snip", locked: true },
      { name: "Workflow", locked: true },
      { name: "TerminalCapture", locked: true },
    ],
  },
  {
    label: "Experimental",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    desc: "Cutting-edge and unreleased capabilities — feature-flagged or env-gated.",
    tools: [
      { name: "Sleep" },
      { name: "SendUserMessage" },
      { name: "StructuredOutput", locked: true },
      { name: "LSP", locked: true },
      { name: "SendUserFile", locked: true },
      { name: "PushNotification", locked: true },
      { name: "Monitor", locked: true },
      { name: "SubscribePR", locked: true },
    ],
  },
];

export default function ToolSystem() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const cat = TOOL_CATEGORIES[activeCategory];

  return (
    <section id="tools" className="relative py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted-foreground text-xs font-mono uppercase tracking-widest mb-4">
            03 / Tool System
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Every built-in tool Claude Code can call
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            53+ tools sorted by category. Lock icons indicate feature-gated or unreleased tools.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Category tabs */}
          <div className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-visible xl:w-56 flex-shrink-0 pb-2 xl:pb-0">
            {TOOL_CATEGORIES.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActiveCategory(i)}
                className={`flex-shrink-0 xl:flex-shrink text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                  activeCategory === i
                    ? `${c.bgColor} ${c.borderColor} ${c.color}`
                    : "border-transparent bg-surface hover:border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-semibold text-sm whitespace-nowrap">{c.label}</div>
                <div className="text-xs opacity-60 mt-0.5">{c.tools.length} tools</div>
              </button>
            ))}
          </div>

          {/* Tool grid */}
          <div className="flex-1">
            <div className={`rounded-2xl border ${cat.borderColor} ${cat.bgColor} p-6 mb-4`}>
              <div className={`text-xs font-mono uppercase tracking-widest ${cat.color} mb-2`}>
                {cat.label}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cat.tools.map((tool) => (
                <button
                  key={tool.name}
                  onMouseEnter={() => setHoveredTool(tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`group relative p-4 rounded-xl border transition-all duration-200 text-left ${
                    hoveredTool === tool.name
                      ? `${cat.borderColor} ${cat.bgColor}`
                      : "border-border bg-surface hover:border-border/70"
                  }`}
                >
                  {tool.locked && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted-foreground">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  )}
                  <div className={`font-mono text-sm font-semibold ${hoveredTool === tool.name ? cat.color : "text-foreground"} transition-colors`}>
                    {tool.name}
                  </div>
                  {tool.locked && (
                    <div className="text-xs text-muted-foreground mt-1">feature-gated</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
