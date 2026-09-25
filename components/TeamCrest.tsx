// Original badge — not a reproduction of any real franchise's logo — used as TeamLogo's
// fallback when the generated logo image fails to load or is missing. Renders the team's
// initials on a team-colored tile, so the "fallback to team initials" behavior is literal.
const COLOR: Record<string, string> = {
  Cavaliers: "#8B2E2E",
  Celtics: "#2E6B4F",
  Nuggets: "#B5722A",
  Suns: "#C9781E",
  Bucks: "#3C6E4A",
  Heat: "#B23A2E",
  Knicks: "#3A5A9C",
};

const initialsOf = (team: string) => team.trim().slice(0, 3).toUpperCase();

export default function TeamCrest({ team, className = "h-16 w-16" }: { team: string; className?: string }) {
  const color = COLOR[team] ?? "#5C5C68";
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={`${team} (logo unavailable, showing initials)`}>
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="6" fill={color} stroke="rgb(var(--line))" strokeWidth="1.5" />
      <text x="20" y="24.5" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="white" letterSpacing="0.5" fontFamily="var(--font-display), Impact, sans-serif">
        {initialsOf(team)}
      </text>
    </svg>
  );
}
