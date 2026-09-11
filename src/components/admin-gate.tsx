"use client";

import { useEffect, useState, FormEvent, ReactNode } from "react";

const ADMIN_PASSWORD = "whitmore-house";
const SESSION_KEY = "hw-admin-auth";

export function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // One-time hydration from sessionStorage after mount — avoids an SSR/client
    // hydration mismatch, since sessionStorage isn't available on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthed(window.sessionStorage.getItem(SESSION_KEY) === "true");
    setChecked(true);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!checked) return null;

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-6 py-32">
        <h1 className="mb-1 font-display text-2xl">Admin Access</h1>
        <p className="mb-6 text-sm text-fg-muted">Enter the house password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
          />
          {error && <p className="text-xs text-fg">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full bg-accent py-3 text-sm tracking-wide text-on-accent hover:opacity-90 cursor-pointer"
          >
            Enter
          </button>
        </form>
        <p className="mt-4 text-xs text-fg-muted">Demo password: whitmore-house</p>
      </div>
    );
  }

  return <>{children}</>;
}
