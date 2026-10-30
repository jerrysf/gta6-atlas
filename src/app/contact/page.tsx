import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the GTA6 Atlas team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Contact"
        description="Corrections, tips, feedback or partnership inquiries — send us a message."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <ContactForm />
    </div>
  );
}
