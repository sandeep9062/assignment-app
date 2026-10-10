"use client";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastApi {
  show: (message: string, type?: ToastType, duration?: number) => number;
  success: (message: string, duration?: number) => number;
  error: (message: string, duration?: number) => number;
  info: (message: string, duration?: number) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

// How long each kind of toast stays on screen (ms). Errors linger a bit longer.
const DURATION: Record<ToastType, number> = { success: 3500, error: 6500, info: 4000 };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      const id = ++idRef.current;
      const ms = duration ?? DURATION[type] ?? 4000;
      setToasts((list) => [...list.slice(-3), { id, message: String(message), type }]); // keep at most 4 visible
      if (ms > 0) setTimeout(() => remove(id), ms);
      return id;
    },
    [remove]
  );

  const value = useMemo<ToastApi>(
    () => ({
      show: push,
      success: (m: string, d?: number) => push(m, "success", d),
      error: (m: string, d?: number) => push(m, "error", d),
      info: (m: string, d?: number) => push(m, "info", d),
      dismiss: remove,
    }),
    [push, remove]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-dot" aria-hidden="true" />
            <span className="toast-msg">{t.message}</span>
            <button type="button" className="toast-x" onClick={() => remove(t.id)} aria-label="Dismiss notification">
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Use inside any client component: const toast = useToast(); toast.success("Saved");
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>.");
  return ctx;
}
