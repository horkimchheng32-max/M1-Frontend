export type Category = { uuid: string; name: string; description?: string };
export type Sport = { uuid: string; name: string; description: string; imageUrls?: string[]; categoryName: string };
export type SportEvent = {
  uuid: string; name: string; description: string; imageUrls?: string[];
  locationName: string; latitude?: number; longitude?: number; categoryName: string;
};
export type CommentItem = { uuid?: string; eventUuid?: string; comment: string; createdAt?: string; username?: string };
export type Player = { id: string; name: string; team: string; pos: string; bio: string; stats: Record<string, string> };
/** One shape for everything that can open the detail drawer or be favorited. */
export type Item = {
  kind: "sport" | "event" | "player"; id: string; name: string; description: string; category: string;
  image?: string; place?: string; href?: string; mapHref?: string; meta: [string, string][];
};
