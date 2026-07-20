const API_BASE = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) {
    throw new Error("GitHub write integration is not configured on this deployment.");
  }
  return { token, repo, branch };
}

async function githubFetch(path: string, init?: RequestInit) {
  const { token } = getConfig();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
  });
}

export async function githubFileExists(filePath: string) {
  const { repo, branch } = getConfig();
  const res = await githubFetch(
    `/repos/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`
  );
  return res.status === 200;
}

export async function createGitHubFile(filePath: string, content: string, message: string) {
  const { repo, branch } = getConfig();
  const res = await githubFetch(`/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf-8").toString("base64"),
      branch,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `GitHub API error (${res.status})`);
  }
  return res.json();
}
