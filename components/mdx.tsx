import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { PlaceDataRequest } from '@/components/place-data-request';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    PlaceDataRequest,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
