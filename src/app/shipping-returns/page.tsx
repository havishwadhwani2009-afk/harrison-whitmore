export const metadata = { title: "Shipping & Returns — Harrison Whitmore" };

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-10 font-display text-4xl">Shipping &amp; Returns</h1>

      <section className="mb-12">
        <h2 className="mb-3 font-display text-2xl">Shipping</h2>
        <div className="space-y-3 text-fg-muted leading-relaxed">
          <p>We currently ship worldwide from our atelier. Standard delivery timelines are shown at checkout once your address is entered, and typically range from 3–5 business days within the UK and Europe, and 5–10 business days for the rest of the world.</p>
          <p>Shipping is calculated as a flat rate per order, regardless of size. Any customs duties or import taxes applicable to your country are the responsibility of the recipient and are not included at checkout.</p>
          <p>Once your order has shipped, a tracking link will be sent to your email and made available in your account under Order History.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl">Returns &amp; Exchanges</h2>
        <div className="space-y-3 text-fg-muted leading-relaxed">
          <p>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and returned with their original tags attached.</p>
          <p>To begin a return, please contact us via our Contact page with your order number. We will provide a return shipping label and instructions.</p>
          <p>Refunds are issued to the original payment method within 5–10 business days of the return being received and inspected. Exchanges for a different size or colour are handled as a return and a new order, to ensure the fastest possible turnaround.</p>
          <p>Items marked as final sale, and gift cards, are not eligible for return.</p>
        </div>
      </section>
    </div>
  );
}
