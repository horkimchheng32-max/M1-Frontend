import Link from "next/link";
import TeamLogo from "./TeamLogo";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 border border-brand/40 px-3 py-1 text-sm text-brand">
            <span className="h-2 w-2 bg-brand" /> Series final
          </p>
          <h1 className="text-[22vw] leading-[0.85] md:text-[9.5rem]">
            95<span className="text-brand">–</span>93
          </h1>
          <p className="mt-6 max-w-lg font-display text-3xl leading-tight md:text-4xl">Cavaliers win the series on a last-second stop</p>
          <p className="mt-3 max-w-md text-mute">Full recap, box score and reaction from the arena, plus the courts and gear to get you playing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#scores" className="btn-red"><i className="ri-play-fill" /> Watch highlights</Link>
            <Link href="/sports" className="btn-line">Browse events</Link>
          </div>
        </div>
        <div className="box hidden self-end p-6 md:block">
          <p className="mb-4 font-display text-lg uppercase text-mute">Final box</p>
          {[["Cavaliers", "22 26 24 23", 95], ["Celtics", "25 21 22 25", 93]].map(([t, q, s]) => (
            <div key={t as string} className="flex items-center gap-4 border-t border-line py-4 first:border-0">
              <TeamLogo team={t as string} className="h-10 w-10 shrink-0" />
              <div className="flex-1"><p className="font-display text-2xl uppercase">{t}</p><p className="text-sm text-mute">{q}</p></div>
              <p className="font-display text-5xl">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
