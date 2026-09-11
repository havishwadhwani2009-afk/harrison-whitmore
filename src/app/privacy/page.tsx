export const metadata = { title: "Privacy Policy — Harrison Whitmore" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-6 font-display text-4xl">Privacy Policy</h1>
      <div className="space-y-4 text-fg-muted leading-relaxed">
        <p>
          Harrison Whitmore respects your privacy. This policy explains what information we
          collect when you use our site, how it is used, and the choices available to you.
        </p>
        <p>
          <strong className="text-fg">Information we collect.</strong> When you create an account,
          place an order, or sign up for our newsletter, we collect information such as your name,
          email address, shipping address, and order history.
        </p>
        <p>
          <strong className="text-fg">How we use it.</strong> We use this information to process
          and fulfil orders, communicate with you about your account or purchases, and, where you
          have opted in, to send you occasional word about new arrivals.
        </p>
        <p>
          <strong className="text-fg">Payment information.</strong> Payment details are processed
          securely by our payment providers and are never stored on our servers.
        </p>
        <p>
          <strong className="text-fg">Your choices.</strong> You may access, correct, or request
          deletion of your personal information at any time by contacting us, and you may
          unsubscribe from marketing communications at any time via the link in any such email.
        </p>
        <p>This policy may be updated from time to time. Continued use of the site constitutes acceptance of the current policy.</p>
      </div>
    </div>
  );
}
