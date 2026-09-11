import { AccordionItem } from "@/components/accordion";

export const metadata = { title: "FAQ — Harrison Whitmore" };

const faqs: { question: string; answer: string }[] = [
  {
    question: "Where do you ship?",
    answer: "We currently ship worldwide. Delivery estimates and any applicable duties are shown at checkout before you complete your order.",
  },
  {
    question: "What is your returns policy?",
    answer: "Items may be returned within 30 days of delivery, provided they are unworn and in their original condition with tags attached. See our Shipping & Returns page for full instructions.",
  },
  {
    question: "How do I find my size?",
    answer: "Our Size Guide provides detailed measurements for every category. If you remain between sizes, we generally recommend sizing up for our tailored fits.",
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes. Gift cards can be purchased in any amount from our Gift Cards page and redeemed against any order at checkout.",
  },
  {
    question: "How should I care for wool and cashmere pieces?",
    answer: "We recommend dry cleaning or a gentle hand wash where noted, and storing folded rather than hung, with a cedar block to protect against moths between wears.",
  },
  {
    question: "Can I amend or cancel an order after placing it?",
    answer: "Please contact us as soon as possible after ordering. We are able to amend most orders within a few hours of placement, before they are prepared for dispatch.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-2 font-display text-4xl">Frequently Asked Questions</h1>
      <p className="mb-10 text-fg-muted">Answers to the questions we hear most often.</p>
      <div>
        {faqs.map((f) => (
          <AccordionItem key={f.question} title={f.question}>
            <p>{f.answer}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}
