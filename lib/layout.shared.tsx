import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { getGithubRepoRootUrl } from '@/lib/github-repo';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- inline brand SVG */}
          <img src="/logo.svg" alt="Nomu" width={32} height={32} className="size-8 shrink-0" />
          <span>{appName}</span>
        </span>
      ),
      url: '/',
    },
    githubUrl: getGithubRepoRootUrl(),
  };
}
