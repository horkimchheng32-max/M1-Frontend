/**
 * Central image mapping so the UI never renders a broken image or bare placeholder text.
 *
 * IMPORTANT — what this file deliberately does NOT contain:
 * We were given a folder of real official NBA team logos (Cavaliers.png, Celtics.png, etc.) and
 * real photos of real, famous, named athletes (Michael Jordan, Lionel Messi, Pelé, Michael
 * Phelps) to wire up here. We didn't use them:
 *   - The team logo files are trademarked league/franchise marks — redistributing them inside
 *     this app isn't something we have rights to do.
 *   - The athlete photos are copyrighted photography of real, identifiable people. Mapping a
 *     real celebrity's face into a demo app's "Player Spotlight" also risks implying they
 *     endorse or are affiliated with "Sporty", which they aren't.
 * Instead: team logos below are original artwork we drew for this project (see
 * /public/team-logos), and player photos are free-license (Unsplash License), non-identifying
 * sports action photography — not tied to any real athlete's identity. Swap either set for your
 * own licensed assets whenever you have them.
 */

// ---- Team logos --------------------------------------------------------

// Canonical logo, keyed by full team name. Original SVG crests — not reproductions of any real
// franchise's trademarked logo.
const TEAM_LOGO_BY_NAME: Record<string, string> = {
  Cavaliers: "/team-logos/cavaliers.png",
  Celtics: "/team-logos/celtics.png",
  Nuggets: "/team-logos/nuggets.png",
  Suns: "/team-logos/suns.png",
  Bucks: "/team-logos/bucks.png",
  Heat: "/team-logos/heat.png",
  Knicks: "/team-logos/knicks.png",
};

// Common abbreviations -> full team name, so lookups work either way.
const TEAM_ABBREVIATION: Record<string, keyof typeof TEAM_LOGO_BY_NAME> = {
  CAV: "Cavaliers", CAVS: "Cavaliers",
  CEL: "Celtics", BOS: "Celtics",
  NUG: "Nuggets", DEN: "Nuggets",
  PHX: "Suns", SUN: "Suns",
  MIL: "Bucks", BUCK: "Bucks",
  MIA: "Heat", HEAT: "Heat",
  NYK: "Knicks", NY: "Knicks",
};

const DEFAULT_TEAM_LOGO = "/team-logos/cavaliers.svg";

/** Look up a team logo by full name or abbreviation (case-insensitive). Never returns empty. */
export function getTeamLogo(teamNameOrAbbreviation: string): string {
  const key = teamNameOrAbbreviation.trim();
  const byName = TEAM_LOGO_BY_NAME[key];
  if (byName) return byName;
  const full = TEAM_ABBREVIATION[key.toUpperCase()];
  if (full) return TEAM_LOGO_BY_NAME[full];
  return DEFAULT_TEAM_LOGO;
}

export const TEAM_LOGOS = TEAM_LOGO_BY_NAME;

// ---- Player photos ------------------------------------------------------

// Free-license (Unsplash License — https://unsplash.com/license) action photography of
// anonymous, non-identifiable players. Keyed to this app's invented roster names.
const PLAYER_PHOTO_BY_NAME: Record<string, string> = {
  "Marcus Vale": "https://images.unsplash.com/photo-1766136809046-efa58a4ec469?auto=format&fit=crop&w=400&h=400&q=80",
  "Elias Brandt": "https://images.unsplash.com/photo-1755418486176-690f9cbc1164?auto=format&fit=crop&w=400&h=400&q=80",
  "Tomas Reyes": "https://images.unsplash.com/photo-1728162664868-58320acb898f?auto=format&fit=crop&w=400&h=400&q=80",
  "Kai Nakamura": "https://images.unsplash.com/photo-1689894755862-730f4be37a6d?auto=format&fit=crop&w=400&h=400&q=80",
};

const DEFAULT_PLAYER_PHOTO = "https://images.unsplash.com/photo-1766136809046-efa58a4ec469?auto=format&fit=crop&w=400&h=400&q=80";

/** Photo for a known player name; falls back to a generic action shot for any other name. */
export function getPlayerPhoto(name: string): string {
  return PLAYER_PHOTO_BY_NAME[name] ?? DEFAULT_PLAYER_PHOTO;
}

export const PLAYER_PHOTOS = PLAYER_PHOTO_BY_NAME;

// ---- Category imagery (used when an event/sport has no imageUrls) -------

const CATEGORY_IMAGE: Record<string, string> = {
  Football: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=1200&q=80&auto=format&fit=crop",
  Basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80&auto=format&fit=crop",
  Tennis: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80&auto=format&fit=crop",
  Cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80&auto=format&fit=crop",
  Equipment: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80&auto=format&fit=crop",
};

const DEFAULT_CATEGORY_IMAGE = "https://images.unsplash.com/photo-1775647545965-35ff62884890?w=1200&q=80&auto=format&fit=crop";

/** Fallback image for an event/sport card when the API sends no imageUrls. */
export function getCategoryImage(categoryName: string): string {
  return CATEGORY_IMAGE[categoryName] ?? DEFAULT_CATEGORY_IMAGE;
}

export const CATEGORY_IMAGES = CATEGORY_IMAGE;
