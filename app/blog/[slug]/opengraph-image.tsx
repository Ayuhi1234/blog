import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { getPostBySlug } from "@/lib/content";
import { CATEGORY_OG_COLORS, DEFAULT_OG_COLORS } from "@/lib/og-colors";

export const alt = "Post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const [c1, c2] = post ? CATEGORY_OG_COLORS[post.category] ?? DEFAULT_OG_COLORS : DEFAULT_OG_COLORS;
  const categoryLabel = post ? getCategory(post.category)?.label ?? post.category : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          backgroundImage: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            marginBottom: 24,
          }}
        >
          {categoryLabel}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          {post?.title ?? "Learning in Public"}
        </div>
      </div>
    ),
    { ...size }
  );
}
