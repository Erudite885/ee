import { BubbleField } from "@/components/bubble-field";
import { GlassCard } from "@/components/glass-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden p-8">
      <BubbleField />
      <GlassCard className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Scaffold ready</h1>
        <p className="mt-2 text-muted">
          Session 2 complete — glass cards, bubble field, and hover flare are
          live. Real home page content begins in Session 4.
        </p>
      </GlassCard>
    </main>
  );
}
