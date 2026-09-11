"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <h1 className="mb-4 font-display text-4xl">Contact</h1>
          <p className="mb-10 text-fg-muted">
            For order enquiries, styling advice, or anything else, our client services team is
            glad to help.
          </p>

          <div className="space-y-6 text-sm">
            <div>
              <h2 className="mb-1 text-fg-muted">Email</h2>
              <p>client-services@harrisonwhitmore.com</p>
            </div>
            <div>
              <h2 className="mb-1 text-fg-muted">Telephone</h2>
              <p>+44 (0)20 7946 0958</p>
              <p className="text-fg-muted">Monday–Friday, 9am–6pm GMT</p>
            </div>
            <div>
              <h2 className="mb-1 text-fg-muted">Atelier</h2>
              <p>14 Belgrave Mews, London SW1X 8QH</p>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <p className="text-fg-muted">
              Thank you for writing. A member of our team will be in touch within one business day.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Full name"
                className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <input
                placeholder="Order number (optional)"
                className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <textarea
                required
                rows={5}
                placeholder="How can we help?"
                className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="w-full bg-accent py-3.5 text-sm tracking-wide text-on-accent hover:opacity-90 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
