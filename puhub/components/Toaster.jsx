"use client";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

// How long each kind of toast stays on screen (ms). Errors linger a bit longer.
const DURATION = { success: 3500, error: 6500, info: 4000 };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration) => {
      const id = ++idRef.current;
      const ms = duration ?? DURATION[type] ?? 4000;
      setToasts((list) => [...list.slice(-3), { id, message: String(message), type }]); // keep at most 4 visible
      if (ms > 0) setTimeout(() => remove(id), ms);
      return id;
    },
    [remove]
  );

  const value = useMemo(
    () => ({
      show: push,
      success: (m, d) => push(m, "success", d),
      error: (m, d) => push(m, "error", d),
      info: (m, d) => push(m, "info", d),
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
