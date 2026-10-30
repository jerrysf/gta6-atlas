import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";

export function FaqSection({
  faq,
  heading = "Frequently Asked Questions",
  withSchema = false,
}: {
  faq: { question: string; answer: string }[];
  heading?: string;
  withSchema?: boolean;
}) {
  if (!faq.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      {withSchema && <JsonLd data={faqJsonLd(faq)} />}
      <h2 id="faq-heading" className="mb-4 text-2xl font-bold tracking-tight">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faq.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
