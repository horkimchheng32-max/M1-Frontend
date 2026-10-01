import type { Person } from "@/lib/team";

export default function PersonCard({ p }: { p: Person }) {
  return (
    <article className="box flex flex-col">
      <div className="aspect-square overflow-hidden rounded-t-md border-b border-line bg-ink">
        {p.photo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
          : <div className="grid h-full place-items-center font-display text-6xl text-line">{p.name.split(" ").map((w) => w[0]).join("")}</div>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl">{p.name}</h3>
        <p className="text-sm text-brand">{p.role}</p>
        <p className="mt-3 flex-1 text-sm text-mute">{p.bio}</p>
        <ul className="mt-4 flex gap-2">
          {p.socials.map((x) => (
            <li key={x.label}><a href={x.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on ${x.label}`} className="grid h-9 w-9 place-items-center border border-line text-lg hover:border-brand hover:text-brand"><i className={x.icon} /></a></li>
          ))}
        </ul>
      </div>
    </article>
  );
}
