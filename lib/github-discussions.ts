import "server-only";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const CHUNK_SIZE = 20;

export type DiscussionCounts = { reactions: number; comments: number };

const EMPTY_COUNTS: DiscussionCounts = { reactions: 0, comments: 0 };

type SearchNode = {
  title: string;
  category: { id: string } | null;
  reactions: { totalCount: number };
  comments: { totalCount: number };
};

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function fetchChunk(repo: string, pathnames: string[]): Promise<Record<string, SearchNode[]>> {
  const query = `query DiscussionCounts {
    ${pathnames
      .map(
        (pathname, i) => `d${i}: search(query: ${JSON.stringify(
          `repo:${repo} in:title "${pathname}"`
        )}, type: DISCUSSION, first: 5) {
      nodes {
        ... on Discussion {
          title
          category { id }
          reactions { totalCount }
          comments { totalCount }
        }
      }
    }`
      )
      .join("\n")}
  }`;

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_DISCUSSIONS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    // GitHub's GraphQL endpoint is POST-only, so Next's Data Cache won't
    // auto-cache it — the explicit revalidate here is what makes it cached/ISR.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const result: Record<string, SearchNode[]> = {};
  pathnames.forEach((_, i) => {
    result[`d${i}`] = json.data?.[`d${i}`]?.nodes ?? [];
  });
  return result;
}

export async function getDiscussionCountsByPathnames(
  pathnames: string[]
): Promise<Map<string, DiscussionCounts>> {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const result = new Map<string, DiscussionCounts>();

  if (!repo || !categoryId || !process.env.GITHUB_DISCUSSIONS_TOKEN || pathnames.length === 0) {
    return result;
  }

  try {
    for (const group of chunk(pathnames, CHUNK_SIZE)) {
      const byAlias = await fetchChunk(repo, group);
      group.forEach((pathname, i) => {
        const nodes = byAlias[`d${i}`] ?? [];
        const match = nodes.find(
          (node) => node.title === pathname && node.category?.id === categoryId
        );
        result.set(pathname, match ? { reactions: match.reactions.totalCount, comments: match.comments.totalCount } : EMPTY_COUNTS);
      });
    }
  } catch (error) {
    console.warn("Failed to fetch discussion counts:", error);
    return new Map();
  }

  return result;
}

export async function getDiscussionCount(pathname: string): Promise<DiscussionCounts> {
  const counts = await getDiscussionCountsByPathnames([pathname]);
  return counts.get(pathname) ?? EMPTY_COUNTS;
}
