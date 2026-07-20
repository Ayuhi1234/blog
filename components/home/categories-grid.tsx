import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { CategoryIcon } from "@/components/category-icon";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/content";

export function CategoriesGrid() {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Explore"
        title="Popular Categories"
        description="Ten lenses on the same running project: figuring things out."
        className="mb-10"
      />
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <StaggerItem key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white`}
              >
                <CategoryIcon name={category.icon} className="size-5" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{category.label}</h3>
              <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted-foreground">
                {category.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{counts.get(category.slug) ?? 0} posts</span>
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
