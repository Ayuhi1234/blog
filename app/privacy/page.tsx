import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="container-prose py-16 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="prose-premium mt-10">
        <p>
          This is a personal blog. This policy explains, in plain language, what
          information is collected when you visit {siteConfig.name} and how it&apos;s
          used.
        </p>

        <h2>What I collect</h2>
        <p>
          If you subscribe to the newsletter, I collect your email address for the
          sole purpose of sending you new posts. If you use the contact form, I
          collect whatever you choose to include — name, email, and message.
        </p>
        <p>
          Like most websites, basic, aggregated analytics (pages visited, rough
          location, device type) may be collected to understand what&apos;s worth
          writing more of. This data isn&apos;t tied to your identity.
        </p>

        <h2>What I don&apos;t do</h2>
        <ul>
          <li>I don&apos;t sell your data to anyone, ever.</li>
          <li>I don&apos;t share your email with third parties.</li>
          <li>I don&apos;t run targeted advertising on this site.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          This site may use minimal, functional cookies (such as remembering your
          theme preference). No third-party tracking cookies are used.
        </p>

        <h2>Your rights</h2>
        <p>
          You can unsubscribe from the newsletter at any time via the link in any
          email. You can request that any data I hold about you be deleted by
          reaching out through the <a href="/contact">contact page</a>.
        </p>

        <h2>Changes</h2>
        <p>
          This policy may be updated occasionally. Material changes will be noted
          on this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach out at{" "}
          <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>.
        </p>
      </div>
    </div>
  );
}
