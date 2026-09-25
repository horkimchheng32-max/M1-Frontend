import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PersonCard from "@/components/PersonCard";
import { mentors, team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About us",
  description: "Meet the mentors and team members behind Sporty, and get in touch with us.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Sporty", description: "Meet the mentors and team members behind Sporty, and get in touch with us.", url: "/about" },
  twitter: { card: "summary", title: "About Sporty" },
};

const contactInfo = [
  { icon: "ri-map-pin-2-line", label: "Phnom Penh Riverside Sports Complex, Cambodia" },
  { icon: "ri-mail-line", label: "hello@sporty.example" },
  { icon: "ri-phone-line", label: "+855 12 345 678" },
];

export default function About() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h1 className="text-6xl md:text-8xl">About Sporty</h1>
          <p className="mt-6 max-w-2xl text-lg text-mute">We help people find a place to play, follow the scores and get the right gear. Sporty is built by players, for players, with local coaches guiding what we make.</p>
        </div>
      </section>
      <section id="mentors" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-3xl">Mentors</h2>
        <p className="mt-2 max-w-xl text-mute">Instructors and advisors who shape our programs and product.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{mentors.map((p) => <PersonCard key={p.name} p={p} />)}</div>
      </section>
      <section id="team" className="mx-auto max-w-7xl border-t border-line px-4 py-14">
        <h2 className="text-3xl">Team members</h2>
        <p className="mt-2 max-w-xl text-mute">The people who build and run Sporty every day.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{team.map((p) => <PersonCard key={p.name} p={p} />)}</div>
      </section>
      <section id="contact" className="mx-auto max-w-5xl border-t border-line px-4 py-14 scroll-mt-20">
        <h2 className="text-3xl">Contact us</h2>
        <p className="mt-2 max-w-xl text-mute">Questions about an event, a venue, or gear? Send a message and the team will get back to you.</p>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <ul className="flex flex-col gap-4">
            {contactInfo.map((i) => (
              <li key={i.label} className="box flex items-center gap-3 p-4"><i className={`text-xl text-brand ${i.icon}`} />{i.label}</li>
            ))}
            <li className="box flex gap-2 p-4">
              {["facebook", "twitter-x", "instagram", "youtube"].map((s) => (
                <a key={s} href="#" aria-label={s} className="grid h-9 w-9 place-items-center rounded-md border border-line text-lg hover:border-brand hover:text-brand"><i className={`ri-${s}-line`} /></a>
              ))}
            </li>
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
