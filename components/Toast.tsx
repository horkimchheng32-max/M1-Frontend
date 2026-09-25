"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type T = { id: number; msg: string; kind: "ok" | "err" };
const Ctx = createContext<(msg: string, kind?: T["kind"]) => void>(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<T[]>([]);
  const push = useCallback((msg: string, kind: T["kind"] = "ok") => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, msg, kind }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {items.map((t) => (
          <div key={t.id} className={`flex items-center gap-2 border bg-panel px-4 py-3 text-sm ${t.kind === "ok" ? "border-brand" : "border-line"}`}>
            <i className={t.kind === "ok" ? "ri-checkbox-circle-line text-brand" : "ri-error-warning-line text-mute"} />
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
