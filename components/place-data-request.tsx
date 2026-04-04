import { getPlaceDataIssueUrl, getPlaceDataRepoFullName } from '@/lib/github-place-request';

/** MDX: call-to-action to open a GitHub issue for a missing or wrong place in search. */
export function PlaceDataRequest() {
  const href = getPlaceDataIssueUrl();
  const repo = getPlaceDataRepoFullName();

  return (
    <div className="not-prose my-6 rounded-xl border border-fd-border bg-fd-card p-4 text-fd-card-foreground">
      <p className="m-0 text-sm font-semibold">Cannot find the place in search?</p>
      <p className="mt-2 mb-0 text-sm text-fd-muted-foreground leading-relaxed [&_span]:text-fd-foreground">
        Open a short issue on <span className="font-medium text-fd-foreground">{repo}</span> so we
        can add or fix it in the catalog. Include what you typed, where it is, and a maps link if you
        have one.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-medium text-fd-primary underline underline-offset-4 hover:opacity-90"
      >
        Start place request on GitHub →
      </a>
    </div>
  );
}
