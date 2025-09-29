import { Hero } from "@/components/Hero";
import { PillarsSection } from "@/components/PillarCard";
import { Testimonial } from "@/components/Testimonial";
import { Stat } from "@/components/Stat";
import { AgentTestButton } from "@/components/AgentTestButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PillarsSection />
      <Testimonial />
      <Stat />
      {/* Test component to demonstrate AgentProvider accessibility */}
      <div className="container mx-auto px-4 py-8">
        <AgentTestButton />
      </div>
    </div>
  );
}
