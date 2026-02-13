import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";

async function getFAQs() {
  const faqs = await client.fetch(`
    *[_type == "faq" && active == true] | order(coalesce(order, 999) asc) {
      _id,
      question,
      answer,
      category
    }
  `);
  return faqs;
}

export default async function FAQ() {
  const faqs = await getFAQs();
  return (
    <section className="section-padding bg-secondary/30 border-y border-border/50">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">FAQ</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers. Here are some of the most common things our clients ask.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq: any, index: number) => (
              <AccordionItem 
                key={faq._id} 
                value={`item-${index}`}
                className="glass-card px-6 border-none rounded-xl"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
