import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";
import { LogoStrip } from "@/components/logo-strip";
import { StatsBand } from "@/components/stats-band";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <StatsBand />
    </main>
  );
}
