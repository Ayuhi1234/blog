import { Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="container-premium py-20 sm:py-28">
      <Reveal>
        <div className="bg-aurora relative overflow-hidden rounded-3xl border border-border px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-white">
              <Mail className="size-5" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Join the list
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              One email, only when there&apos;s something worth reading. No growth
              hacking, no seven-part drip sequence — just the essays, as they&apos;re
              published.
            </p>
            <NewsletterForm className="mt-8" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
