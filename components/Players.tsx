"use client";
import { useState } from "react";
import { playerItem } from "@/lib/items";
import { players } from "@/lib/mock";
import type { Item } from "@/lib/types";
import Drawer from "./Drawer";
import FavButton from "./Favorites";
import PlayerAvatar from "./PlayerAvatar";

export default function Players() {
  const [sel, setSel] = useState<Item | null>(null);
  return (
    <>
      <ul className="mt-4">
        {players.map((p) => {
          const it = playerItem(p);
          return (
            <li key={p.id} className="relative flex items-center gap-3 border-t border-line py-3 first:border-0 hover:bg-ink/50">
              <button onClick={() => setSel(it)} className="flex flex-1 items-center gap-3 text-left after:absolute after:inset-0">
                <PlayerAvatar name={p.name} size={48} />
                <span><span className="block font-display uppercase">{p.name}</span><span className="block text-xs text-mute">{p.team} · {p.pos} · {p.stats.PPG} PPG</span></span>
              </button>
              <FavButton kind="player" id={p.id} name={p.name} className="relative z-10" />
            </li>
          );
        })}
      </ul>
      <Drawer item={sel} onClose={() => setSel(null)} />
    </>
  );
}
