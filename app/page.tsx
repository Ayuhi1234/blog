import { Hero } from "@/components/home/hero";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { LatestPosts } from "@/components/home/latest-posts";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedBooks } from "@/components/home/featured-books";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Testimonials } from "@/components/home/testimonials";
import {
  getFeaturedPosts,
  getLatestPosts,
  getFeaturedBooks,
  getFeaturedProjects,
} from "@/lib/content";

export default function Home() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getLatestPosts(6);
  const featuredBooks = getFeaturedBooks(5);
  const featuredProjects = getFeaturedProjects(2);

  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
      <CategoriesGrid />
      <LatestPosts posts={latestPosts} />
      <FeaturedBooks books={featuredBooks} />
      <FeaturedProjects projects={featuredProjects} />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
