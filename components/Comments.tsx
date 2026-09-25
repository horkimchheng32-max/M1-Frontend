"use client";
import { useEffect, useState } from "react";
import { fetchComments, postComment } from "@/lib/api";
import type { CommentItem } from "@/lib/types";
import { useToast } from "./Toast";

export default function Comments({ eventUuid }: { eventUuid: string }) {
  const toast = useToast();
  const [items, setItems] = useState<CommentItem[] | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => fetchComments(eventUuid).then(setItems).catch(() => { setItems([]); });
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [eventUuid]);

  async function submit() {
    if (!text.trim()) return toast("Write a comment first", "err");
    setBusy(true);
    try { await postComment(eventUuid, text.trim()); setText(""); toast("Comment posted"); await load(); }
    catch { toast("Could not post comment. Try again.", "err"); }
    finally { setBusy(false); }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl">Community {items && <span className="text-mute">({items.length})</span>}</h2>
      <div className="mt-4 flex flex-col gap-3">
        <label htmlFor="c" className="sr-only">Your comment</label>
        <textarea id="c" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Share what you thought of this venue or match"
          className="box w-full p-3 outline-none focus:border-brand" />
        <button onClick={submit} disabled={busy} className="btn-red self-start disabled:opacity-50">{busy ? "Posting" : "Post comment"}</button>
      </div>
      <ul className="mt-6">
        {items === null && [0, 1, 2].map((i) => <li key={i} className="skel mb-3 h-16" />)}
        {items?.length === 0 && <li className="text-mute">No comments yet. Be the first to post.</li>}
        {items?.map((c, i) => (
          <li key={c.uuid ?? i} className="border-t border-line py-4 first:border-0">
            <p className="text-sm text-mute">{c.username ?? "Fan"}{c.createdAt && ` · ${new Date(c.createdAt).toLocaleDateString()}`}</p>
            <p className="mt-1">{c.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
