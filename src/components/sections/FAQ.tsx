import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";

async function getFAQs() {
  const faqs = await client.fetch(
    `*[_type == "faq" && active == true] | order(coalesce(order, 999) asc) {
      _id,
      question,
      answer,
      category
    }`,
    {},
    {
      next: { revalidate: 86400 } // 24 hours - FAQs rarely change
    }
  );
  return faqs;
}

export default async function FAQ() {
  const faqs = await getFAQs();

  if (!faqs.length) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 border-t border-border" aria-labelledby="faq-title">
      <div className="container-wide grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 lg:gap-16">
        <div>
          <p className="bp-label mb-4">FAQ</p>
          <h2 id="faq-title" className="text-4xl md:text-5xl font-bold">
            Questions clients often ask
          </h2>
          <p className="text-muted-foreground leading-relaxed mt-5 max-w-md">
            Can&apos;t find your answer here? Send a message and I&apos;ll reply within 24 business hours.
          </p>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((faq: any, index: number) => (
            <AccordionItem key={faq._id} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent hover:no-underline py-5 gap-4">
                <span className="flex gap-4">
                  <span className="font-mono text-sm text-accent pt-1">{String(index + 1).padStart(2, "0")}</span>
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pl-10">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
