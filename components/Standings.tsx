import { standings } from "@/lib/mock";
import TeamLogo from "./TeamLogo";
import Players from "./Players";

export default function Standings() {
  return (
    <section id="standings" className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 lg:grid-cols-[1.6fr_1fr]">
      <div className="box overflow-x-auto p-6">
        <h2 className="text-2xl">League table</h2>
        <table className="mt-4 w-full min-w-[420px] text-left text-sm">
          <thead className="text-mute"><tr className="border-b border-line">{["#", "Team", "P", "W", "L", "Pts"].map((h) => <th key={h} className="py-2 pr-3 font-normal">{h}</th>)}</tr></thead>
          <tbody>
            {standings.map(([t, p, w, l, pts], i) => (
              <tr key={t} className="border-b border-line last:border-0">
                <td className={`py-3 pr-3 font-display ${i === 0 ? "text-brand" : "text-mute"}`}>{i + 1}</td>
                <td className="py-3 pr-3 font-display uppercase"><span className="flex items-center gap-2"><TeamLogo team={t} className="h-6 w-6" />{t}</span></td><td className="pr-3">{p}</td><td className="pr-3">{w}</td><td className="pr-3">{l}</td><td className="font-display text-lg">{pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="box p-6">
        <h2 className="text-2xl">Player spotlight</h2>
        <Players />
      </div>
    </section>
  );
}
