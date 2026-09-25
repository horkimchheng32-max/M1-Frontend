export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14" aria-busy="true">
      <div className="skel h-64 w-full md:w-2/3" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]"><div className="skel h-72" /><div className="skel h-72" /></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="skel h-72" />)}</div>
    </div>
  );
}
