"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Item } from "@/lib/types";
import FavButton from "./Favorites";
import TeamLogo from "./TeamLogo";

export default function Drawer({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const last = useRef<Item | null>(null);   // keeps content mounted while the panel slides out
  if (item) last.current = item;
  const it = item ?? last.current;
  const open = !!item;
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!it) return null;
  return (
    <div className={`fixed inset-0 z-50 bg-black/60 transition-[opacity,visibility] duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`} onClick={onClose}>
      <aside role="dialog" aria-modal="true" aria-label={it.name} onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto rounded-l-2xl border-l border-line bg-panel shadow-none transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="flex items-center gap-2 rounded-full border border-brand/50 px-3 py-1 text-xs font-medium leading-none text-brand">
            {it.kind === "player" && <TeamLogo team={it.category} className="h-4 w-4" />}
            {it.category}
          </span>
          <button ref={closeBtn} onClick={onClose} aria-label="Close details" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-lg hover:border-brand hover:text-brand"><i className="ri-close-line" /></button>
        </div>
        <div className="aspect-[16/10] overflow-hidden border-b border-line bg-ink">
          {it.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
            : <div className="grid h-full place-items-center text-5xl text-line"><i className={it.kind === "event" ? "ri-map-pin-line" : it.kind === "player" ? "ri-user-line" : "ri-basketball-line"} /></div>}
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="flex-1 text-3xl leading-tight tracking-tight">{it.name}</h2>
            <FavButton kind={it.kind} id={it.id} name={it.name} className="mt-1 shrink-0 rounded-lg" />
          </div>
          <p className="mt-2 text-sm leading-none text-mute">{it.kind === "event" ? "Event" : it.kind === "player" ? "Player" : "Sport"}</p>
          <p className="mt-4 leading-relaxed text-mute">{it.description}</p>
          <dl className="mt-6 overflow-hidden rounded-lg border border-line">
            {it.meta.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 text-sm last:border-0"><dt className="text-mute">{k}</dt><dd className="text-right font-medium leading-none">{v}</dd></div>
            ))}
          </dl>
        </div>
        {(it.href || it.mapHref) && (
          <div className="flex flex-wrap gap-3 border-t border-line p-6">
            {it.href && <Link href={it.href} onClick={onClose} className="btn-red rounded-lg">Event page and comments</Link>}
            {it.mapHref && <a href={it.mapHref} target="_blank" rel="noreferrer" className="btn-line rounded-lg">Open map</a>}
          </div>
        )}
      </aside>
    </div>
  );
}
