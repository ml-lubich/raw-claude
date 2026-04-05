import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentLoop from "@/components/AgentLoop";
import ArchExplorer from "@/components/ArchExplorer";
import ToolSystem from "@/components/ToolSystem";
import CommandCatalog from "@/components/CommandCatalog";
import HiddenFeatures from "@/components/HiddenFeatures";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AgentLoop />
      <ArchExplorer />
      <ToolSystem />
      <CommandCatalog />
      <HiddenFeatures />
      <Footer />
    </main>
  );
}
