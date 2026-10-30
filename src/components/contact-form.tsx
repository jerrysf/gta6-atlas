"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactValues) => {
    const body = encodeURIComponent(
      `From: ${values.name} <${values.email}>\n\n${values.message}`,
    );
    const a = document.createElement("a");
    a.href = `mailto:hello@gta6atlas.com?subject=${encodeURIComponent(
      values.subject,
    )}&body=${body}`;
    a.click();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" autoComplete="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" {...register("subject")} />
            {errors.subject && (
              <p className="text-xs text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button type="submit">Send message</Button>
          <p className="text-xs text-muted-foreground">
            This opens your email client — no data is stored on our servers.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
