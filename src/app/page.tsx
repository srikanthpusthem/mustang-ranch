import { Hero } from "@/components/Hero";
import { PillarsSection } from "@/components/PillarCard";
import { Testimonial } from "@/components/Testimonial";
import { Stat } from "@/components/Stat";
import { AgentTestButton } from "@/components/AgentTestButton";
import { PageContainer } from "@/components/PageContainer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PillarsSection />
      <Testimonial />
      <Stat />
      {/* Test component to demonstrate AgentProvider accessibility */}
      <PageContainer className="py-8">
        <AgentTestButton />
      </PageContainer>
    </div>
  );
}
