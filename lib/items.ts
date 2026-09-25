import { getCategoryImage } from "@/data/sportsAssets";
import { playerAvatarUrl } from "./avatars";
import type { Item, Player, Sport, SportEvent } from "./types";

export const sportItem = (s: Sport): Item => ({
  kind: "sport", id: s.uuid, name: s.name, description: s.description, category: s.categoryName,
  image: s.imageUrls?.[0] ?? getCategoryImage(s.categoryName),
  meta: [["Category", s.categoryName]],
});
export const eventItem = (e: SportEvent): Item => {
  const geo = e.latitude != null && e.longitude != null;
  const meta: [string, string][] = [["Category", e.categoryName], ["Venue", e.locationName]];
  if (geo) meta.push(["Coordinates", `${e.latitude!.toFixed(4)}, ${e.longitude!.toFixed(4)}`]);
  return {
    kind: "event", id: e.uuid, name: e.name, description: e.description, category: e.categoryName,
    image: e.imageUrls?.[0] ?? getCategoryImage(e.categoryName),
    place: e.locationName, href: `/events/${e.uuid}`, meta,
    mapHref: geo ? `https://www.openstreetmap.org/?mlat=${e.latitude}&mlon=${e.longitude}#map=16/${e.latitude}/${e.longitude}` : undefined,
  };
};
export const playerItem = (p: Player): Item => ({
  kind: "player", id: p.id, name: p.name, description: p.bio, category: p.team, image: playerAvatarUrl(p.name),
  meta: [["Team", p.team], ["Position", p.pos], ...Object.entries(p.stats)],
});
