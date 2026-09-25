import type { Metadata } from "next";
import Browse from "@/components/Browse";
import { getCategories, getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Sports Categories & Events",
  description: "Browse sports events and news by category: football, basketball, tennis and more.",
  alternates: { canonical: "/sports" },
  openGraph: { title: "Sports Categories & Events", description: "Browse events and news by sport.", url: "/sports" },
};

export default async function SportsPage({ searchParams }: { searchParams: Promise<{ cat?: string; q?: string }> }) {
  const { cat, q } = await searchParams;
  const [events, categories] = await Promise.all([getEvents(), getCategories()]);
  const filtered = q ? events.filter((e) => e.name.toLowerCase().includes(q.toLowerCase())) : events;
  return <Browse key={`${cat}|${q}`} events={filtered} categories={categories} initialCat={cat ?? "All"} />;
}
