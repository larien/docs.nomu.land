import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute, internalDocsRoute } from '@/lib/shared';

function isStaticAsset(pathname: string): boolean {
  return /\.[a-zA-Z0-9]{2,12}$/.test(pathname);
}

const publicDocsPattern = docsRoute === '/' ? '/{*path}' : `${docsRoute}{/*path}`;
const publicMdxPattern = docsRoute === '/' ? '/{*path}.mdx' : `${docsRoute}{/*path}.mdx`;

const { rewrite: rewriteDocs } = rewritePath(
  publicDocsPattern,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  publicMdxPattern,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  if (pathname.startsWith('/og/')) {
    return NextResponse.next();
  }
  if (pathname.startsWith('/llms')) {
    return NextResponse.next();
  }
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    return NextResponse.next();
  }
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (pathname === internalDocsRoute || pathname === `${internalDocsRoute}/`) {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }
  if (pathname.startsWith(`${internalDocsRoute}/`)) {
    const stripped = pathname.slice(internalDocsRoute.length) || '/';
    return NextResponse.redirect(new URL(stripped, request.url), 308);
  }

  const suffixResult = rewriteSuffix(pathname);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const mdResult = rewriteDocs(pathname);
    if (mdResult) {
      return NextResponse.rewrite(new URL(mdResult, request.nextUrl));
    }
  }

  const url = request.nextUrl.clone();
  if (pathname === '/') {
    url.pathname = internalDocsRoute;
  } else {
    url.pathname = `${internalDocsRoute}${pathname}`;
  }
  return NextResponse.rewrite(url);
}
