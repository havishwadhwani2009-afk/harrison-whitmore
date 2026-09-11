export const metadata = { title: "Terms of Service — Harrison Whitmore" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-6 font-display text-4xl">Terms of Service</h1>
      <div className="space-y-4 text-fg-muted leading-relaxed">
        <p>
          By accessing or using the Harrison Whitmore website, you agree to be bound by these
          terms. Please read them carefully before placing an order.
        </p>
        <p>
          <strong className="text-fg">Orders.</strong> All orders are subject to acceptance and
          availability. We reserve the right to refuse or cancel any order at our discretion,
          including in cases of suspected fraud or pricing errors.
        </p>
        <p>
          <strong className="text-fg">Pricing.</strong> Prices are listed in GBP or EUR as
          selected and are subject to change without notice. Prices at the time of order
          confirmation will be honoured.
        </p>
        <p>
          <strong className="text-fg">Intellectual property.</strong> All content on this site,
          including images, text, and the Harrison Whitmore name and marks, is the property of
          Harrison Whitmore and may not be reproduced without permission.
        </p>
        <p>
          <strong className="text-fg">Limitation of liability.</strong> Harrison Whitmore is not
          liable for any indirect or consequential loss arising from use of this site or its
          products, to the fullest extent permitted by law.
        </p>
        <p>These terms are governed by the laws of England and Wales.</p>
      </div>
    </div>
  );
}
