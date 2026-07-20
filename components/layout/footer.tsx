import Link from "next/link";
import { Mail, MapPin, Rss } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/newsletter-form";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.links.twitter, label: "X (Twitter)", icon: XIcon },
  { href: siteConfig.links.instagram, label: "Instagram", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-premium relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="text-gradient">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <a href={`mailto:${siteConfig.author.email}`} className="hover:text-foreground">
                  {siteConfig.author.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {siteConfig.author.location}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
              <a
                href="/rss.xml"
                aria-label="RSS Feed"
                className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground"
              >
                <Rss className="size-4" />
              </a>
            </div>
          </div>

          {siteConfig.footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-semibold">Get new posts by email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No spam. Just the occasional essay when it&apos;s worth sending.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
