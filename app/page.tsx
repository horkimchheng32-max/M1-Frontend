import Link from "next/link";
import Hero from "@/components/Hero";
import MatchCenter from "@/components/MatchCenter";
import Standings from "@/components/Standings";
import { getEvents } from "@/lib/api";

export default async function Home() {
  const events = await getEvents();
  return (
    <>
      <Hero />
      <MatchCenter venue={events[0]?.locationName ?? "Phnom Penh National Stadium"} />
      <Standings />
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl">Sports categories</h2>
            <p className="mt-2 max-w-md text-mute">Browse fixtures, venues and news by sport, or catch up on every recent event.</p>
          </div>
          <Link href="/sports" className="btn-red shrink-0">Explore categories</Link>
        </div>
      </section>
    </>
  );
}
