import { getGithubRepoFullName } from '@/lib/github-repo';

export function buildSuggestEditIssueUrl(params: {
  pageTitle: string;
  pageUrl: string;
}): string {
  const repo = getGithubRepoFullName();
  const title = `Feedback: ${params.pageTitle}`;
  const body = `Page: ${params.pageUrl}\n\nWhat should change?`;
  const q = new URLSearchParams({
    title,
    body,
    labels: 'docs-feedback',
    template: 'suggest-edit.md',
  });
  return `https://github.com/${repo}/issues/new?${q.toString()}`;
}
