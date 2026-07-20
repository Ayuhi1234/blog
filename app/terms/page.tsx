import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="container-prose py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="prose-premium mt-10">
        <p>
          By reading {siteConfig.name}, you agree to the following, mostly
          common-sense terms.
        </p>

        <h2>Content ownership</h2>
        <p>
          Everything published on this site — essays, book notes, project write-ups
          — is my own work unless otherwise credited, and remains my intellectual
          property.
        </p>

        <h2>Using this content</h2>
        <p>
          You&apos;re welcome to quote short excerpts with attribution and a link
          back to the original post. Republishing full posts elsewhere requires
          permission — ask via the <a href="/contact">contact page</a> first.
        </p>

        <h2>No professional advice</h2>
        <p>
          Nothing on this site — including posts on career, startups, or
          productivity — constitutes professional, legal, financial, or medical
          advice. It&apos;s one person&apos;s notes and opinions, offered in good
          faith, not a substitute for professional guidance.
        </p>

        <h2>External links</h2>
        <p>
          Posts occasionally link to external sites and resources. I don&apos;t
          control and am not responsible for the content or availability of those
          sites.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          This site is provided as-is. I make a good-faith effort to keep things
          accurate and up to date, but I can&apos;t guarantee completeness or
          accuracy, and I&apos;m not liable for decisions made based on anything
          published here.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may be updated occasionally as the site evolves. Continued
          use of the site after changes means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach out at{" "}
          <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>.
        </p>
      </div>
    </div>
  );
}
