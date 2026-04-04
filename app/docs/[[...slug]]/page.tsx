import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getGithubBlobBaseUrl } from '@/lib/github-repo';
import { siteUrl } from '@/lib/shared';
import { DocFeedback } from '@/components/doc-feedback';
import { FAQJsonLd } from '@/components/faq-json-ld';
import { buildSuggestEditIssueUrl } from '@/lib/github-issues';
import { troubleshootingFaqItems } from '@/lib/troubleshooting-faq';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  const updatedRaw = page.data.updated;
  const lastUpdateDate =
    updatedRaw && !Number.isNaN(Date.parse(updatedRaw))
      ? new Date(`${updatedRaw}T12:00:00.000Z`)
      : null;

  const pageId = page.slugs.length > 0 ? page.slugs.join('/') : 'index';
  const canonicalUrl = `${siteUrl}${page.url}`;
  const suggestEditUrl = buildSuggestEditIssueUrl({
    pageTitle: page.data.title,
    pageUrl: canonicalUrl,
  });

  const showTroubleshootingFaq = page.path === 'troubleshooting/index.mdx';

  return (
    <>
      {showTroubleshootingFaq ? <FAQJsonLd items={[...troubleshootingFaqItems]} /> : null}
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        footer={{
          children: (
            <DocFeedback pageId={pageId} suggestEditUrl={suggestEditUrl} />
          ),
        }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        {lastUpdateDate ? (
          <PageLastUpdate date={lastUpdateDate} className="mb-2 -mt-4" />
        ) : null}
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`${getGithubBlobBaseUrl()}/content/docs/${page.path}`}
          />
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const canonicalUrl = `${siteUrl}${page.url}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      images: getPageImage(page).url,
    },
  };
}
