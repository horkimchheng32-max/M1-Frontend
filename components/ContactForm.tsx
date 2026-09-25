"use client";
import { useState } from "react";
import { useToast } from "./Toast";

export default function ContactForm() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="box flex flex-col gap-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setTimeout(() => { setBusy(false); toast("Message sent — we'll reply soon"); e.currentTarget.reset(); }, 400);
      }}
    >
      <div>
        <label htmlFor="name" className="text-sm text-mute">Name</label>
        <input id="name" required className="mt-1 w-full rounded-md border border-line bg-ink px-3 py-2 outline-none focus:border-brand" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-mute">Email</label>
        <input id="email" type="email" required className="mt-1 w-full rounded-md border border-line bg-ink px-3 py-2 outline-none focus:border-brand" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-mute">Message</label>
        <textarea id="message" rows={4} required className="mt-1 w-full rounded-md border border-line bg-ink px-3 py-2 outline-none focus:border-brand" />
      </div>
      <button type="submit" disabled={busy} className="btn-red self-start disabled:opacity-50">{busy ? "Sending" : "Send message"}</button>
    </form>
  );
}
