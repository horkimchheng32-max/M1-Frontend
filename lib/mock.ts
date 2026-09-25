import type { Category, Player, Sport, SportEvent } from "./types";

// Fallbacks used only when the API is unreachable, so the UI never renders empty.
export const mockCategories: Category[] = ["Football", "Basketball", "Tennis", "Cricket"].map((name, i) => ({ uuid: `c${i}`, name }));
export const mockSports: Sport[] = [
  ["Premier League Ball", "High-quality match ball used in professional games. Durable in all weather.", "Football"],
  ["Adidas Training Cones", "Flexible cones for football drills and agility training.", "Football"],
  ["Indoor Game Basketball", "Grippy composite leather ball for indoor courts.", "Basketball"],
  ["Pro Tennis Racket", "Lightweight graphite frame with balanced swing weight.", "Tennis"],
  ["Goalkeeper Gloves", "Latex palm gloves with a secure wrist closure.", "Football"],
  ["Court Sneakers", "Lateral support and cushioning for hard courts.", "Basketball"],
  ["Tennis Balls (3-pack)", "Pressurised felt balls for club play.", "Tennis"],
  ["Shin Guards", "Impact-absorbing guards with ankle protection.", "Equipment"],
].map(([name, description, categoryName], i) => ({ uuid: `s${i}`, name, description, categoryName, imageUrls: [] }));
export const mockEvents: SportEvent[] = [
  { uuid: "e1", name: "City Riverside Footer Court", description: "Open-air court along the riverside with night lighting and shaded seating.", locationName: "Phnom Penh Riverside Sports Complex", latitude: 11.572356, longitude: 104.923874, categoryName: "Football", imageUrls: [] },
  { uuid: "e2", name: "Football Training Ground", description: "Floodlit synthetic-turf ground with changing rooms for day and night matches.", locationName: "Phnom Penh National Stadium", latitude: 11.567089, longitude: 104.91, categoryName: "Football", imageUrls: [] },
];

// The API has no fixtures/standings endpoints yet, so these sections use static data.
export const standings = [
  ["Cavaliers", 24, 19, 5, 1932], ["Celtics", 24, 18, 6, 1921], ["Nuggets", 24, 16, 8, 1890], ["Bucks", 24, 15, 9, 1874],
  ["Suns", 24, 14, 10, 1861], ["Knicks", 24, 12, 12, 1802], ["Heat", 24, 10, 14, 1755],
] as const;
export const results = [
  ["Cavaliers", 95, "Celtics", 93, "Final"], ["Nuggets", 108, "Suns", 101, "Final"],
  ["Bucks", 99, "Heat", 104, "Final"], ["Knicks", 87, "Bucks", 90, "Final"],
] as const;

// Fictional players: the API has no player endpoint yet, and these are invented rosters (not
// real athletes) — see data/sportsAssets.ts for why the photos are generic stock action shots
// rather than any real person's likeness.
export const players: Player[] = [
  { id: "p1", name: "Marcus Vale", team: "Cavaliers", pos: "Guard", bio: "Fast-break playmaker who scored the series-clinching basket.", stats: { PPG: "28.4", APG: "6.1", RPG: "4.5", "FG%": "47.2" } },
  { id: "p2", name: "Elias Brandt", team: "Celtics", pos: "Forward", bio: "Two-way wing known for late-game defensive stops.", stats: { PPG: "24.0", APG: "3.8", RPG: "7.9", "FG%": "49.5" } },
  { id: "p3", name: "Tomas Reyes", team: "Nuggets", pos: "Center", bio: "Interior anchor leading the league in rebounds.", stats: { PPG: "21.7", APG: "5.2", RPG: "12.3", "FG%": "55.1" } },
  { id: "p4", name: "Kai Nakamura", team: "Suns", pos: "Guard", bio: "Sharpshooter with a deep range and quick release.", stats: { PPG: "26.2", APG: "4.4", RPG: "3.6", "FG%": "45.8" } },
];
