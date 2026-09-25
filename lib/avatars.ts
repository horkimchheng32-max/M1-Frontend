// Player portraits now live in the shared asset map so every component (PlayerAvatar, the
// Players list, and event/item cards) sources the same image for a given name. Kept as a
// thin re-export so existing imports of `playerAvatarUrl` keep working.
import { getPlayerPhoto } from "@/data/sportsAssets";

export const playerAvatarUrl = (seed: string) => getPlayerPhoto(seed);
