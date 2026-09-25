import Link from "next/link";
import { getCategoryImage } from "@/data/sportsAssets";
import type { Item } from "@/lib/types";
import FavButton from "./Favorites";

/**
 * Card used by the category browser (and anywhere else a sport/event Item is shown as a
 * grid tile). `item.image` is already backfilled with a category image in lib/items.ts, but
 * the extra fallback here means this component is safe even if it's ever fed raw API data
 * that skipped that step — it should never fall through to bare "no image" text.
 */
export default function EventCard({ item, onOpen }: { item: Item; onOpen: (item: Item) => void }) {
  const image = item.image ?? getCategoryImage(item.category);
  return (
    <article className="box relative flex flex-col transition-colors hover:border-brand/60">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-md border-b border-line bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-md border border-line bg-panel px-2 py-0.5 text-xs">{item.category}</span>
        <FavButton kind={item.kind} id={item.id} name={item.name} className="absolute right-3 top-3 z-10" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xl">
          {/* stretched button: the whole card opens the drawer, footer controls sit above it */}
          <button onClick={() => onOpen(item)} className="text-left uppercase after:absolute after:inset-0">{item.name}</button>
        </h3>
        {item.place && <p className="mt-1 flex items-center gap-1 text-xs text-brand"><i className="ri-map-pin-2-line" />{item.place}</p>}
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-mute">{item.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-mute">
          <span>{item.category}</span>
          {item.href && <Link href={item.href} className="btn-line relative z-10 py-1.5">View event</Link>}
        </div>
      </div>
    </article>
  );
}
