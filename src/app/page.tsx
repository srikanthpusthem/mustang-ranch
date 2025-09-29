import { Hero } from "@/components/Hero";
import { PillarsSection } from "@/components/PillarCard";
import { Testimonial } from "@/components/Testimonial";
import { Stat } from "@/components/Stat";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PillarsSection />
      <Testimonial />
      <Stat />
    </div>
  );
}
