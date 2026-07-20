import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, PenLine, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Timeline } from "@/components/about/timeline";
import { BookCard } from "@/components/books/book-card";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/config/site";
import { getAllBooks } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.author.bio,
};

const skills = [
  { icon: Code2, label: "Software Engineering", description: "Full-stack, with a bias toward simple systems." },
  { icon: Rocket, label: "Startups", description: "Currently building 0waste, full-time." },
  { icon: PenLine, label: "Writing", description: "This site — essays, reviews, and running notes." },
  { icon: BookOpen, label: "Reading", description: "A book or two a month, always with notes." },
];

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: siteConfig.links.twitter, label: "X", icon: XIcon },
  { href: siteConfig.links.instagram, label: "Instagram", icon: InstagramIcon },
];

export default function AboutPage() {
  const nowReading = getAllBooks().find((b) => b.status === "reading");

  return (
    <div className="py-16 sm:py-20">
      <section className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
          <Reveal direction="left">
            <div className="relative mx-auto size-40 overflow-hidden rounded-3xl border border-border shadow-lg lg:mx-0 lg:size-52">
              <Image src={siteConfig.author.avatar} alt={siteConfig.author.name} fill className="object-cover" priority />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.05}>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-purple">
                About Me
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                {siteConfig.author.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{siteConfig.author.role}</p>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                {siteConfig.author.bio}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button render={<Link href="/contact" />} className="h-11 rounded-full px-6">
                  Get in Touch
                  <ArrowRight className="size-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                    >
                      <s.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-premium mt-20 sm:mt-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What I do</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <StaggerItem key={skill.label}>
              <div className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                <skill.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold">{skill.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-premium mt-20 sm:mt-28">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">My journey</h2>
        </Reveal>
        <div className="mt-10 max-w-2xl">
          <Timeline />
        </div>
      </section>

      {nowReading && (
        <section className="container-premium mt-20 sm:mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What I&apos;m reading right now
            </h2>
          </Reveal>
          <div className="mt-8 max-w-[200px]">
            <BookCard book={nowReading} />
          </div>
        </section>
      )}

      <section className="container-premium mt-20 sm:mt-28">
        <Reveal>
          <div className="bg-aurora rounded-3xl border border-border p-10 text-center sm:p-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Have a question, a correction, or just want to say hi? I read every
              message.
            </p>
            <Button render={<Link href="/contact" />} size="lg" className="mt-6 h-11 rounded-full px-7">
              Contact Me
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
