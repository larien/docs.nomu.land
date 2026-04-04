/**
 * Pre-filled GitHub issue URL so travelers can request a missing search result.
 * Repo is the Nomu app/backend monorepo by default, not the docs site.
 */
export function getPlaceDataRepoFullName(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GITHUB_PLACES_REPO?.trim();
  if (fromEnv?.includes('/') && !fromEnv.includes('..')) {
    return fromEnv;
  }
  return 'larien/docs.nomu.land';
}

export function getPlaceDataIssueUrl(): string {
  const repo = getPlaceDataRepoFullName();
  const params = new URLSearchParams();
  params.set('title', 'Place request: ');
  params.set(
    'body',
    [
      '### Place you searched for',
      '(Exact text you typed in Nomu, and language if relevant)',
      '',
      '### Where it should be',
      '(City, region, country — or paste a Google Maps / Apple Maps link)',
      '',
      '### What Nomu showed',
      '(e.g. “No locations found”, or wrong result picked)',
      '',
      '---',
      'Request from Nomu Docs — please add or correct this location in place search.',
    ].join('\n'),
  );
  return `https://github.com/${repo}/issues/new?${params.toString()}`;
}
