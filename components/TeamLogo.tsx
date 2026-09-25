"use client";
import { useState } from "react";
import { getTeamLogo } from "@/data/sportsAssets";
import TeamCrest from "./TeamCrest";

export default function TeamLogo({ team, className = "h-16 w-16" }: { team: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <TeamCrest team={team} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getTeamLogo(team)}
      alt={`${team} logo`}
      onError={() => setFailed(true)}
      className={`rounded-md border border-line bg-panel object-contain ${className}`}
    />
  );
}
