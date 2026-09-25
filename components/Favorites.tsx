"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { addFavorite, deleteFavorite, fetchFavorites, type FavRecord } from "@/lib/api";
import { useToast } from "./Toast";

type Kind = "sport" | "event" | "player";
type Ctx = { liked: (k: Kind, id: string) => boolean; toggle: (k: Kind, id: string, name: string) => Promise<void> };
const FavCtx = createContext<Ctx>({ liked: () => false, toggle: async () => {} });
export const useFavorites = () => useContext(FavCtx);

const key = (k: Kind, id: string) => `${k}:${id}`;
const LS = "sporthub:player-likes"; // players have no API endpoint, so their likes stay in this browser
const recId = (r?: { uuid?: string; id?: string }) => r?.uuid ?? r?.id;

function parseFavorites(records: FavRecord[]) {
  const m: Record<string, string> = {};
  for (const f of records) {
    const favId = recId(f) ?? "";
    const s = f.sportUuid ?? recId(f.sport);
    const e = f.eventUuid ?? recId(f.event);
    if (s) m[key("sport", s)] = favId;
    if (e) m[key("event", e)] = favId;
  }
  return m;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  // key -> favorite record id ("" means saved but its own id isn't known yet, e.g. optimistic add)
  const [map, setMap] = useState<Record<string, string>>({});

  const refresh = useCallback(async () => {
    try {
      const fresh = parseFavorites(await fetchFavorites());
      setMap((prev) => ({ ...Object.fromEntries(Object.entries(prev).filter(([k]) => k.startsWith("player:"))), ...fresh }));
    } catch {
      /* API offline: keep whatever state we already have */
    }
  }, []);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(LS) || "[]");
      setMap((m) => ({ ...m, ...Object.fromEntries(ids.map((id) => [key("player", id), ""])) }));
    } catch {
      /* ignore malformed local data */
    }
    refresh();
  }, [refresh]);

  const toggle = async (kind: Kind, id: string, name: string) => {
    const k = key(kind, id);
    const wasOn = k in map;
    const prevMap = map;

    if (kind === "player") {
      const next = { ...prevMap };
      if (wasOn) delete next[k]; else next[k] = "";
      setMap(next);
      localStorage.setItem(LS, JSON.stringify(Object.keys(next).filter((x) => x.startsWith("player:")).map((x) => x.slice(7))));
      toast(wasOn ? `Removed ${name} from favorites` : `Saved ${name} to favorites`);
      return;
    }

    // Optimistic: flip the heart immediately, before the network call resolves.
    setMap((m) => {
      const next = { ...m };
      if (wasOn) delete next[k]; else next[k] = "";
      return next;
    });

    try {
      if (wasOn) {
        let favId = prevMap[k];
        if (!favId) {
          // We don't have this favorite's own id yet (e.g. it was added in an earlier session
          // before this fix) — try one refetch to find it rather than failing outright.
          await refresh();
          favId = parseFavorites(await fetchFavorites())[k];
        }
        if (!favId) throw new Error("missing favorite id");
        await deleteFavorite(favId);
      } else {
        const favId = await addFavorite(kind, id);
        setMap((m) => ({ ...m, [k]: favId ?? "" }));
      }
      toast(wasOn ? `Removed ${name} from favorites` : `Saved ${name} to favorites`);
    } catch {
      setMap(prevMap); // roll back the optimistic toggle
      toast(`Could not ${wasOn ? "remove" : "save"} ${name}. Try again.`, "err");
    }
  };

  return <FavCtx.Provider value={{ liked: (k, id) => key(k, id) in map, toggle }}>{children}</FavCtx.Provider>;
}

export default function FavButton({ kind, id, name, className = "" }: { kind: Kind; id: string; name: string; className?: string }) {
  const { liked, toggle } = useFavorites();
  const on = liked(kind, id);
  return (
    <button type="button" aria-pressed={on} aria-label={`${on ? "Remove" : "Save"} ${name} ${on ? "from" : "to"} favorites`}
      onClick={(e) => { e.stopPropagation(); toggle(kind, id, name); }}
      className={`grid h-9 w-9 place-items-center rounded-md border border-line bg-panel text-lg transition-colors hover:border-brand ${className}`}>
      <i className={on ? "ri-heart-fill text-brand" : "ri-heart-line"} />
    </button>
  );
}
