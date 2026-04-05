export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-background font-bold text-sm font-mono">
              C
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-foreground">
                claude-code<span className="text-accent">.unpacked</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Unofficial. Not affiliated with Anthropic.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="font-mono">Analysis date: March 31, 2026</span>
            <span className="hidden md:block text-border">|</span>
            <span>
              Based on{" "}
              <a
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                publicly available source code
              </a>
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>Created by zackautocracy · Analysis assisted by AI</span>
          <div className="flex items-center gap-4">
            <a href="#agent-loop" className="hover:text-foreground transition-colors">Agent Loop</a>
            <a href="#tools" className="hover:text-foreground transition-colors">Tools</a>
            <a href="#commands" className="hover:text-foreground transition-colors">Commands</a>
            <a href="#hidden" className="hover:text-foreground transition-colors">Hidden Features</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
