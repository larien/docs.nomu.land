'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type DocFeedbackProps = {
  pageId: string;
  suggestEditUrl: string;
};

const storageKey = (pageId: string) => `nomu-docs-vote:${pageId}`;

export function DocFeedback({ pageId, suggestEditUrl }: DocFeedbackProps) {
  const [thanks, setThanks] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alreadyVoted = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(storageKey(pageId)) === '1';
    } catch {
      return false;
    }
  }, [pageId]);

  const disabled = thanks || alreadyVoted || busy;

  const sendVote = useCallback(
    async (vote: 'up' | 'down') => {
      if (disabled) return;
      setBusy(true);
      setError(null);
      try {
        const res = await fetch('/api/docs-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, vote }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error || `Request failed (${res.status})`);
        }
        try {
          sessionStorage.setItem(storageKey(pageId), '1');
        } catch {
          /* ignore */
        }
        setThanks(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setBusy(false);
      }
    },
    [disabled, pageId],
  );

  return (
    <div className="not-prose mt-10 border-t border-fd-border pt-8 space-y-6">
      <div>
        <p className="text-sm font-medium text-fd-foreground mb-3">Was this helpful?</p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => void sendVote('up')}
            className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent/60 disabled:opacity-50"
            aria-label="Yes, this page was helpful"
          >
            <ThumbsUp className="size-4" />
            Yes
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => void sendVote('down')}
            className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent/60 disabled:opacity-50"
            aria-label="No, this page was not helpful"
          >
            <ThumbsDown className="size-4" />
            No
          </button>
          {thanks ? (
            <span className="text-sm text-fd-muted-foreground">Thanks!</span>
          ) : null}
          {error ? <span className="text-sm text-red-600 dark:text-red-400">{error}</span> : null}
        </div>
      </div>
      <div>
        <a
          href={suggestEditUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm font-medium text-fd-primary underline underline-offset-4"
        >
          Suggest an edit
        </a>
        <span className="text-sm text-fd-muted-foreground"> — open a GitHub issue with this page prefilled.</span>
      </div>
    </div>
  );
}
