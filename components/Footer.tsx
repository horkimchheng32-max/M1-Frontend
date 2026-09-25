"use client";
import Link from "next/link";
import { useToast } from "./Toast";

export default function Footer() {
  const toast = useToast();
  return (
    <footer id="newsletter" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl uppercase"><span className="grid h-8 w-8 place-items-center bg-brand text-white"><i className="ri-fire-fill" /></span>Sporty</p>
          <p className="mt-3 max-w-sm text-sm text-mute">Live scores, local courts and match-day gear for players and fans in Phnom Penh and beyond.</p>
          <div className="mt-4 flex gap-4 text-xl">{["facebook", "twitter-x", "instagram", "youtube"].map((s) => <a key={s} href="https://www.istad.co/" aria-label={s} className="hover:text-brand"><i className={`ri-${s}-line`} /></a>)}</div>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {[["Home", "/"], ["Sports Categories", "/sports"], ["About Us", "/about"], ["Contact", "/about#contact"]].map(([l, h]) => <Link key={l} href={h} className="hover:text-brand">{l}</Link>)}
        </nav>
        <form onSubmit={(e) => { e.preventDefault(); toast("Subscribed to the newsletter"); e.currentTarget.reset(); }}>
          <p className="font-display text-lg uppercase">Match-day newsletter</p>
          <div className="mt-3 flex">
            <input type="email" required placeholder="you@email.com" aria-label="Email" className="box min-w-0 flex-1 px-3 outline-none focus:border-brand" />
            <button className="btn-red">Subscribe</button>
          </div>
        </form>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-mute">© {new Date().getFullYear()} Sporty. All rights reserved.</p>
    </footer>
  );
}
