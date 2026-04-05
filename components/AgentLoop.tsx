"use client";

import { useState } from "react";

const STEPS = [
  {
    id: 1,
    label: "User Input",
    file: "src/components/TextInput.tsx",
    desc: "User types a message or pipes input through stdin. Keyboard input comes from Ink's TextInput component. In non-interactive mode, it reads from piped stdin instead.",
    color: "from-blue-500 to-cyan-400",
    icon: "⌨",
  },
  {
    id: 2,
    label: "Message",
    file: "src/message/format.ts",
    desc: "The raw text is wrapped into a structured message object with role, content, and metadata. Attachments and context files are embedded here.",
    color: "from-cyan-400 to-teal-400",
    icon: "✉",
  },
  {
    id: 3,
    label: "History",
    file: "src/conversation/history.ts",
    desc: "The new message is appended to the conversation history. Compaction strategies trim old context when the token budget is approached.",
    color: "from-teal-400 to-green-400",
    icon: "📋",
  },
  {
    id: 4,
    label: "System Prompt",
    file: "src/prompts/system.ts",
    desc: "A system prompt is assembled from configured memory files, tool descriptions, permissions, and current environment context.",
    color: "from-green-400 to-yellow-400",
    icon: "⚙",
  },
  {
    id: 5,
    label: "API Call",
    file: "src/api/anthropic.ts",
    desc: "The full conversation plus system prompt is sent to Anthropic's API. Streaming mode is used by default for real-time token delivery.",
    color: "from-yellow-400 to-orange-400",
    icon: "↗",
  },
  {
    id: 6,
    label: "Tokens",
    file: "src/api/stream.ts",
    desc: "Streamed tokens arrive and are buffered. The renderer updates the UI incrementally as each chunk arrives from the API.",
    color: "from-orange-400 to-red-400",
    icon: "~",
  },
  {
    id: 7,
    label: "Tool Calls?",
    file: "src/tools/dispatcher.ts",
    desc: "If the model emits tool_use blocks, the dispatcher routes each call to the appropriate tool handler. Multiple tools can run in parallel.",
    color: "from-red-400 to-pink-400",
    icon: "⚡",
  },
  {
    id: 8,
    label: "Loop",
    file: "src/agent/loop.ts",
    desc: "Tool results are appended back to history and another API call is made. This continues until the model emits a stop token with no pending tool calls.",
    color: "from-pink-400 to-purple-400",
    icon: "↺",
  },
  {
    id: 9,
    label: "Render",
    file: "src/components/Response.tsx",
    desc: "The final response is rendered using Ink — React for the terminal. Markdown is parsed and syntax-highlighted code blocks are formatted.",
    color: "from-purple-400 to-blue-500",
    icon: "▶",
  },
  {
    id: 10,
    label: "Hooks",
    file: "src/hooks/postResponse.ts",
    desc: "After each response, lifecycle hooks fire — including memory consolidation, session logging, and any registered user hooks.",
    color: "from-blue-500 to-indigo-400",
    icon: "⚓",
  },
  {
    id: 11,
    label: "Await Input",
    file: "src/components/TextInput.tsx",
    desc: "Control returns to the input component, awaiting the next user message. The loop is ready to begin again.",
    color: "from-indigo-400 to-blue-500",
    icon: "…",
  },
];

export default function AgentLoop() {
  const [active, setActive] = useState(0);

  return (
    <section id="agent-loop" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-muted-foreground text-xs font-mono uppercase tracking-widest mb-4">
            01 / Agent Loop
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            From keypress to rendered response
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Step by step through the source — every phase of the Claude Code agent loop.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Step list */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border ${
                  active === i
                    ? "border-accent bg-accent-dim"
                    : "border-transparent hover:border-border hover:bg-surface"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-background font-bold text-xs flex-shrink-0 shadow-lg`}
                >
                  {step.id}
                </div>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold truncate ${active === i ? "text-accent" : "text-foreground"}`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate font-mono">{step.file}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className="flex-[2] sticky top-24">
            <div className="relative rounded-2xl border border-border bg-surface overflow-hidden">
              {/* Gradient bar at top */}
              <div className={`h-1 w-full bg-gradient-to-r ${STEPS[active].color}`} />

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${STEPS[active].color} flex items-center justify-center text-2xl shadow-xl float-anim`}
                  >
                    {STEPS[active].icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      Step {STEPS[active].id} / {STEPS.length}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{STEPS[active].label}</h3>
                  </div>
                </div>

                <div className="font-mono text-xs text-accent bg-accent-dim rounded-lg px-3 py-2 mb-6 border border-accent/20">
                  {STEPS[active].file}
                </div>

                <p className="text-muted-foreground leading-relaxed text-base">
                  {STEPS[active].desc}
                </p>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-8 flex-wrap">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`transition-all duration-200 rounded-full ${
                        i === active
                          ? "w-6 h-2 bg-accent"
                          : "w-2 h-2 bg-border hover:bg-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setActive((p) => Math.max(0, p - 1))}
                    disabled={active === 0}
                    className="px-4 py-2 text-sm rounded-lg border border-border hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActive((p) => Math.min(STEPS.length - 1, p + 1))}
                    disabled={active === STEPS.length - 1}
                    className="px-4 py-2 text-sm rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Flow visualization */}
            <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-1 flex-wrap">
                {STEPS.map((step, i) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setActive(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                        i === active
                          ? "bg-accent text-background font-bold"
                          : i < active
                          ? "bg-accent/20 text-accent"
                          : "bg-surface-2 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {step.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className={`mx-1 text-muted-foreground text-xs transition-colors duration-200 ${i < active ? "text-accent" : ""}`}>
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
