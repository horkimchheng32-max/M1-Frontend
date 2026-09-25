import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";
import { getEvent } from "@/lib/api";

type P = { params: Promise<{ uuid: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const e = await getEvent((await params).uuid);
  if (!e) return { title: "Event not found" };
  const img = e.imageUrls?.[0];
  return {
    title: e.name,
    description: e.description,
    alternates: { canonical: `/events/${e.uuid}` },
    openGraph: { title: e.name, description: e.description, url: `/events/${e.uuid}`, images: img ? [img] : undefined },
    twitter: { card: "summary_large_image", title: e.name, description: e.description, images: img ? [img] : undefined },
  };
}

export default async function EventPage({ params }: P) {
  const e = await getEvent((await params).uuid);
  if (!e) notFound();
  const img = e.imageUrls?.[0];
  const map = e.latitude && e.longitude ? `https://www.openstreetmap.org/?mlat=${e.latitude}&mlon=${e.longitude}#map=16/${e.latitude}/${e.longitude}` : null;
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/sports" className="text-sm text-mute hover:text-brand"><i className="ri-arrow-left-s-line" />All events</Link>
      <div className="box mt-4 aspect-[16/9] overflow-hidden">
        {img ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={img} alt={e.name} className="h-full w-full object-cover" />
          : <div className="grid h-full place-items-center text-6xl text-line"><i className="ri-map-pin-line" /></div>}
      </div>
      <p className="mt-6 text-sm text-brand">{e.categoryName}</p>
      <h1 className="text-4xl md:text-6xl">{e.name}</h1>
      <p className="mt-4 max-w-2xl text-mute">{e.description}</p>
      <p className="mt-5 flex items-center gap-2"><i className="ri-map-pin-2-line text-brand" />{e.locationName}</p>
      {map && <a href={map} target="_blank" rel="noreferrer" className="btn-line mt-4">Open map</a>}
      <Comments eventUuid={e.uuid} />
    </article>
  );
}
