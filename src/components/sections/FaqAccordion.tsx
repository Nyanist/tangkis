"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ponytail: placeholder copy pulled from Aceternity's "Simple FAQs With Background"
// template (matches the header/subheader text given) — swap for real TANGKIS FAQs later.
const FAQS = [
  { q: "What is the purpose of this website?", a: "This website showcases TANGKIS, a fuel-quality monitoring system for backup generators — placeholder copy, to be replaced with real product FAQs." },
  { q: "How do I contact support?", a: "Email support@example.com and our team will get back to you as soon as possible." },
  { q: "How do I find the best products?", a: "Browse the Fitur Utama section on the homepage, or reach out to our team for a personalized recommendation." },
  { q: "Can I return a product?", a: "Returns are accepted within 30 days of delivery, provided the item is unused and in its original packaging." },
  { q: "Do you offer international shipping?", a: "Yes, we ship to most countries. Shipping cost and delivery time vary by destination." },
  { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking link by email." },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={item.q}
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            className="block w-full px-5 py-5 text-left md:px-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-brand-950">{item.q}</h3>
              <ChevronDown
                className={cn("h-5 w-5 flex-none text-brand-700 transition-transform duration-300", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </div>
            <div className="accordion-content" data-open={isOpen}>
              <div className="overflow-hidden">
                <p className="pt-3 font-description text-sm text-[#5A6B7B]">{item.a}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
