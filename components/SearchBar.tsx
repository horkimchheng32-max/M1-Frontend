"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getEvents, getSports } from "@/lib/api";
import { players, standings } from "@/lib/mock";
import type { Sport, SportEvent } from "@/lib/types";

type Group = "Events" | "Sports gear" | "Teams" | "Players";
type Result = { key: string; href: string; title: string; subtitle: string; group: Group };
const GROUPS: Group[] = ["Events", "Sports gear", "Teams", "Players"];

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load the searchable data once, the first time the panel is opened, rather than on every
  // page load — this is a client component so it can't await the server-fetched data in layout.tsx.
  useEffect(() => {
    if (!open || loaded) return;
    Promise.all([getEvents(), getSports()]).then(([e, s]) => { setEvents(e); setSports(s); setLoaded(true); });
  }, [open, loaded]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const hit = (s?: string) => (s ?? "").toLowerCase().includes(query);

    const eventResults: Result[] = events
      .filter((e) => hit(e.name) || hit(e.description) || hit(e.categoryName) || hit(e.locationName))
      .slice(0, 5)
      .map((e) => ({ key: `e:${e.uuid}`, href: `/events/${e.uuid}`, title: e.name, subtitle: `${e.categoryName} · ${e.locationName}`, group: "Events" }));

    const sportResults: Result[] = sports
      .filter((s) => hit(s.name) || hit(s.description) || hit(s.categoryName))
      .slice(0, 5)
      .map((s) => ({ key: `s:${s.uuid}`, href: `/sports?cat=${encodeURIComponent(s.categoryName)}`, title: s.name, subtitle: s.categoryName, group: "Sports gear" }));

    const teamResults: Result[] = standings
      .filter(([name]) => hit(name))
      .map(([name]) => ({ key: `t:${name}`, href: "/#scores", title: name, subtitle: "Team · league table", group: "Teams" as Group }));

    const playerResults: Result[] = players
      .filter((p) => hit(p.name) || hit(p.team) || hit(p.pos))
      .map((p) => ({ key: `p:${p.id}`, href: "/#standings", title: p.name, subtitle: `${p.team} · ${p.pos}`, group: "Players" as Group }));

    return [...eventResults, ...sportResults, ...teamResults, ...playerResults];
  }, [q, events, sports]);

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close search" : "Search"} aria-expanded={open}
        className="grid h-9 w-9 place-items-center border border-line text-lg hover:border-brand hover:text-brand">
        <i className={open ? "ri-close-line" : "ri-search-line"} />
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-30 border-b border-line bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="box flex items-center gap-2 px-3 py-2">
              <i className="ri-search-line text-mute" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search events, teams, players, gear…"
                aria-label="Search events, teams, players and gear"
                className="flex-1 bg-transparent py-1 outline-none placeholder:text-mute"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear search" className="text-mute hover:text-brand">
                  <i className="ri-close-circle-line" />
                </button>
              )}
            </div>
            {q.trim() && (
              <div className="mt-3 max-h-[65vh] overflow-y-auto rounded-md border border-line bg-panel">
                {results.length === 0 ? (
                  <p className="p-4 text-sm text-mute">{loaded ? `No matches for "${q}".` : "Loading…"}</p>
                ) : (
                  GROUPS.map((g) => {
                    const items = results.filter((r) => r.group === g);
                    if (items.length === 0) return null;
                    return (
                      <div key={g} className="border-b border-line last:border-0">
                        <p className="px-4 pt-3 text-xs uppercase tracking-wide text-mute">{g}</p>
                        {items.map((r) => (
                          <Link key={r.key} href={r.href} onClick={() => setOpen(false)}
                            className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-line hover:text-brand">
                            <span>{r.title}</span>
                            <span className="text-xs text-mute">{r.subtitle}</span>
                          </Link>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
