import { mockCategories, mockEvents, mockSports } from "./mock";
import type { Category, CommentItem, Sport, SportEvent } from "./types";

export const API = process.env.NEXT_PUBLIC_API_URL ?? "https://sport-api.eunglyzhia.com/api/v1/";

// The collection doesn't document the envelope, so accept a bare array or { data | content | items }.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const list = (j: any) => (Array.isArray(j) ? j : j?.data ?? j?.content ?? j?.items ?? []);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const one = (j: any) => j?.data ?? j;

async function load<T>(path: string, pick: (j: unknown) => T, fallback: T): Promise<T> {
  try {
    const r = await fetch(API + path, { next: { revalidate: 60 } });
    if (!r.ok) throw new Error(String(r.status));
    const v = pick(await r.json());
    return (Array.isArray(v) && v.length === 0 ? fallback : v) as T;
  } catch {
    return fallback;
  }
}

export const getSports = () => load<Sport[]>("sports", list, mockSports);
export const getCategories = () => load<Category[]>("sport_categories", list, mockCategories);
export const getEvents = () => load<SportEvent[]>("events", list, mockEvents);
export const getEvent = (uuid: string) =>
  load<SportEvent | null>(`events/${uuid}`, one, mockEvents.find((e) => e.uuid === uuid) ?? null);

// Client-side calls
export const fetchComments = async (eventUuid: string): Promise<CommentItem[]> => {
  const r = await fetch(`${API}comments/events/${eventUuid}`);
  if (!r.ok) throw new Error("Could not load comments");
  return list(await r.json());
};
export const postComment = async (eventUuid: string, comment: string) => {
  const r = await fetch(`${API}comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventUuid, comment }) });
  if (!r.ok) throw new Error("Could not post comment");
};
export type FavRecord = {
  uuid?: string; id?: string;
  sportUuid?: string; eventUuid?: string;
  sport?: { uuid?: string; id?: string }; event?: { uuid?: string; id?: string };
};
export const fetchFavorites = async (): Promise<FavRecord[]> => {
  const r = await fetch(`${API}favorites`);
  if (!r.ok) throw new Error("Could not load favorites");
  return list(await r.json());
};
// Bug fix: the old payload sent BOTH keys, e.g. { sportUuid: id, eventUuid: "" } — many backends
// reject an empty string where a UUID is expected, which is what surfaced as "Could not update
// favorites". Send only the key that actually applies.
export const addFavorite = async (kind: "sport" | "event", id: string): Promise<string | null> => {
  const body = kind === "sport" ? { sportUuid: id } : { eventUuid: id };
  const r = await fetch(`${API}favorites`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Could not save favorite (${r.status})`);
  // Capture the new favorite's own id straight from the response so a later "unlike" doesn't
  // depend on re-fetching and re-matching the whole list (that mismatch was the other half of the bug).
  try {
    const rec: FavRecord = one(await r.json());
    return rec?.uuid ?? rec?.id ?? null;
  } catch {
    return null;
  }
};
// The collection's delete route is /favorite/{uuid} (singular); change here if your server differs.
export const deleteFavorite = async (favoriteUuid: string) => {
  const r = await fetch(`${API}favorite/${favoriteUuid}`, { method: "DELETE" });
  if (!r.ok) throw new Error(`Could not remove favorite (${r.status})`);
};
export const uploadImage = async (file: File): Promise<unknown> => {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch(`${API}upload`, { method: "POST", body: fd });
  if (!r.ok) throw new Error("Upload failed");
  return r.json();
};
