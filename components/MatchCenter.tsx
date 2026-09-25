"use client";
import { useEffect, useState } from "react";
import { results } from "@/lib/mock";
import TeamLogo from "./TeamLogo";

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = Date.now() + 2 * 86400000 + 5 * 3600000; // demo kickoff: 2d 5h from load
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export default function MatchCenter({ venue }: { venue: string }) {
  const left = useCountdown();
  const parts = left === null ? ["--", "--", "--", "--"] : [86400000, 3600000, 60000, 1000].map((u, i) => String(Math.floor(left / u) % (i ? (i === 1 ? 24 : 60) : 1e9)).padStart(2, "0"));
  return (
    <section id="scores" className="mx-auto grid max-w-7xl gap-6 px-4 py-14 lg:grid-cols-[1.4fr_1fr]">
      <div className="box p-6">
        <h2 className="text-2xl">Next match</h2>
        <div className="mt-6 flex items-center justify-around gap-4">
          <div className="text-center"><TeamLogo team="Cavaliers" className="mx-auto h-16 w-16" /><p className="mt-2 font-display uppercase">Cavaliers</p></div>
          <span className="font-display text-3xl text-brand">VS</span>
          <div className="text-center"><TeamLogo team="Nuggets" className="mx-auto h-16 w-16" /><p className="mt-2 font-display uppercase">Nuggets</p></div>
        </div>
        <div className="mt-6 grid grid-cols-4 border border-line text-center">
          {["Days", "Hours", "Min", "Sec"].map((l, i) => (
            <div key={l} className="border-r border-line py-3 last:border-0"><p className="font-display text-3xl tabular-nums">{parts[i]}</p><p className="text-xs text-mute">{l}</p></div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-mute"><i className="ri-map-pin-2-line text-brand" />{venue}</p>
      </div>
      <div className="box p-6">
        <h2 className="text-2xl">Latest results</h2>
        <ul className="mt-4">
          {results.map(([a, as, b, bs, st]) => (
            <li key={a + b} className="flex items-center gap-3 border-t border-line py-3 first:border-0">
              <div className="flex gap-1"><TeamLogo team={a} className="h-6 w-6" /><TeamLogo team={b} className="h-6 w-6" /></div>
              <div className="flex-1 font-display uppercase">
                <p className={as > bs ? "" : "text-mute"}>{a}</p><p className={bs > as ? "" : "text-mute"}>{b}</p>
              </div>
              <div className="text-right font-display text-xl"><p>{as}</p><p>{bs}</p></div>
              <span className="text-xs text-mute">{st}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
