import Link from "next/link";

export const metadata = { title: "Returns Policy — Harrison Whitmore" };

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-6 font-display text-4xl">Returns Policy</h1>
      <div className="space-y-4 text-fg-muted leading-relaxed">
        <p>
          Harrison Whitmore accepts returns of eligible items within 30 days of the delivery date.
          To qualify for a return, items must be unworn, unwashed, undamaged, and returned with all
          original tags attached in their original packaging where possible.
        </p>
        <p>
          Final sale items, gift cards, and made-to-order pieces are not eligible for return or
          exchange unless faulty on arrival.
        </p>
        <p>
          Once your return is received and inspected, we will notify you of the approval or
          rejection of your refund. Approved refunds are processed to your original payment method
          within 5–10 business days.
        </p>
        <p>
          For full instructions on initiating a return, please see our{" "}
          <Link href="/shipping-returns" className="underline underline-offset-4">
            Shipping &amp; Returns
          </Link>{" "}
          page, or contact our client services team directly.
        </p>
      </div>
    </div>
  );
}
