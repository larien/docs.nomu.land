/**
 * Resolves owner/repo for this codebase on GitHub.
 * On Vercel, the connected Git repo is exposed via VERCEL_GIT_* — no extra env needed.
 */
export function getGithubRepoFullName(): string {
  const owner = process.env.VERCEL_GIT_REPO_OWNER?.trim();
  const slug = process.env.VERCEL_GIT_REPO_SLUG?.trim();
  if (owner && slug) {
    return `${owner}/${slug}`;
  }

  const fromEnv = process.env.NEXT_PUBLIC_GITHUB_DOCS_REPO?.trim();
  if (fromEnv?.includes('/')) {
    return fromEnv;
  }

  // Public clone URL shape: https://github.com/docs/nomu.land (owner `docs`, repo `nomu.land`)
  return 'larien/docs.nomu.land';
}

export function getGithubCommitBranch(): string {
  return process.env.VERCEL_GIT_COMMIT_REF?.trim() || 'main';
}

export function getGithubRepoRootUrl(): string {
  return `https://github.com/${getGithubRepoFullName()}`;
}

export function getGithubBlobBaseUrl(): string {
  const branch = getGithubCommitBranch();
  return `${getGithubRepoRootUrl()}/blob/${branch}`;
}
