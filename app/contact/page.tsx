import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — questions, corrections, or just to say hi.",
};

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.links.twitter, label: "X", icon: XIcon },
  { href: siteConfig.links.instagram, label: "Instagram", icon: InstagramIcon },
];

const faqs = [
  {
    q: "Do you take guest posts or collaborations?",
    a: "Occasionally, if it's a genuinely good fit for the categories I write in. Send a short pitch through the form rather than a full draft.",
  },
  {
    q: "Can I republish or quote one of your posts?",
    a: "Short quotes with attribution and a link back are always fine. For full republishing, ask first — usually a yes, just want to know where it's going.",
  },
  {
    q: "Do you offer consulting or advisory work?",
    a: "Selectively, mostly around early-stage product and engineering decisions. Mention what you're working on in the form.",
  },
  {
    q: "How fast do you reply?",
    a: "Usually within a few days. If it's urgent, say so in the subject line.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-14 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Questions, corrections, collaboration ideas, or just want to say hi — the
          form below reaches me directly.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold">Contact Details</h2>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0" />
                  {siteConfig.author.email}
                </a>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {siteConfig.author.location}
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Clock className="size-4 shrink-0" />
                  Usually replies within a few days
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="mb-3 font-semibold">FAQ</h2>
              <Accordion>
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
