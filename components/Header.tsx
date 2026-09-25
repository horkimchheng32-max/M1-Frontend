"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import type { Category } from "@/lib/types";

export default function Header({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo / brand — doubles as the Home link */}
        <Link href="/" className="flex items-center gap-2 font-display text-2xl uppercase">
          <span className="grid h-8 w-8 place-items-center bg-brand text-white"><i className="ri-fire-fill" /></span>Sporty
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {/* Categories: dropdown of sport types */}
          <div className="group relative">
            <button className="flex items-center gap-1 py-2 hover:text-brand">Categories <i className="ri-arrow-down-s-line" /></button>
            <ul className="invisible absolute left-0 top-full min-w-44 border border-line bg-panel group-hover:visible group-focus-within:visible">
              {categories.map((c) => (
                <li key={c.uuid}><Link href={`/sports?cat=${encodeURIComponent(c.name)}`} className="block px-4 py-2 hover:bg-line hover:text-brand">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          {/* Sports / Events: quick link to every match/event */}
          <Link href="/sports" className="hover:text-brand">Sports</Link>
          <Link href="/about" className="hover:text-brand">About Us</Link>
        </nav>
        <div className="flex items-center gap-3">
          <SearchBar />
          <ThemeToggle />
          <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <i className={`text-2xl ${open ? "ri-close-line" : "ri-menu-line"}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line px-4 py-3 md:hidden">
          {[...categories.map((c) => [c.name, `/sports?cat=${encodeURIComponent(c.name)}`]), ["Sports", "/sports"], ["About Us", "/about"]].map(([l, h]) => (
            <Link key={l + h} href={h} onClick={() => setOpen(false)} className="block border-b border-line py-3 last:border-0">{l}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
