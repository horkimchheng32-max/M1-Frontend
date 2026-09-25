"use client";
import Image from "next/image";
import { useState } from "react";
import { getPlayerPhoto } from "@/data/sportsAssets";

export default function PlayerAvatar({ name, size = 48, className = "" }: { name: string; size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("");

  if (failed) {
    return (
      <span style={{ width: size, height: size }} className={`grid shrink-0 place-items-center rounded-md border border-brand font-display text-lg ${className}`}>
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={getPlayerPhoto(name)}
      alt={`${name} portrait`}
      width={size}
      height={size}
      unoptimized
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-md border border-line object-cover ${className}`}
    />
  );
}
