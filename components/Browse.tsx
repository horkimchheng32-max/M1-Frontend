"use client";
import { useMemo, useState } from "react";
import { eventItem } from "@/lib/items";
import type { Category, Item, SportEvent } from "@/lib/types";
import Drawer from "./Drawer";
import EventCard from "./EventCard";

const PER_PAGE = 6;

// Normalize before comparing so "Football" / "football" / " Football " all match, and so
// "All" matches regardless of case. This is the fix for the filter buttons not rendering any
// items: the previous strict `===` compare silently returned zero results on any casing or
// whitespace mismatch between a tab's label and an item's categoryName.
const norm = (s?: string) => (s ?? "").trim().toLowerCase();
const isAll = (cat: string) => norm(cat) === "all";

export default function Browse({ events, categories, initialCat = "All" }: { events: SportEvent[]; categories: Category[]; initialCat?: string }) {
  const [cat, setCat] = useState(initialCat);
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState<Item | null>(null);

  const cards = useMemo<Item[]>(() => events.map(eventItem), [events]);
  const shown = useMemo(
    () => (isAll(cat) ? cards : cards.filter((c) => norm(c.category) === norm(cat))),
    [cards, cat]
  );
  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE));
  const slice = shown.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const tabs = ["All", ...categories.map((c) => c.name)];

  return (
    <section id="browse" className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="text-3xl">Sports categories</h2>
      <p className="mt-2 max-w-xl text-mute">Filter events and news by sport, or browse everything at once.</p>
      <div className="mt-5 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={norm(cat) === norm(t)} onClick={() => { setCat(t); setPage(1); }}
            className={`rounded-md border px-4 py-2 font-display text-sm uppercase transition-colors ${norm(cat) === norm(t) ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{t}</button>
        ))}
      </div>
      {slice.length === 0 ? (
        <p className="box mt-8 p-8 text-mute">Nothing in {cat} yet. Pick another category.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((c) => <EventCard key={c.id} item={c} onOpen={setSel} />)}
        </div>
      )}
      <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
        <button className="btn-line disabled:opacity-40" disabled={page === 1} onClick={() => setPage(page - 1)}><i className="ri-arrow-left-s-line" />Previous</button>
        <p className="text-sm text-mute">Page {page} of {pages}</p>
        <button className="btn-red disabled:opacity-40" disabled={page === pages} onClick={() => setPage(page + 1)}>Next<i className="ri-arrow-right-s-line" /></button>
      </div>
      <Drawer item={sel} onClose={() => setSel(null)} />
    </section>
  );
}
