"use client";

import { useState, FormEvent } from "react";

export function NewsletterForm({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={`text-sm ${className ?? ""}`}>
        Thank you for joining the circle. Watch your inbox for word from the house.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-stretch gap-0 border-b ${dark ? "border-on-accent/40" : "border-border-strong"} ${className ?? ""}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={`flex-1 bg-transparent py-2 text-sm outline-none placeholder:opacity-60 ${dark ? "placeholder:text-on-accent text-on-accent" : ""}`}
      />
      <button
        type="submit"
        className={`shrink-0 py-2 text-sm tracking-wide underline-offset-4 hover:underline cursor-pointer ${dark ? "text-on-accent" : "text-fg"}`}
      >
        Join
      </button>
    </form>
  );
}
