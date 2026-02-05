import defaultMdxComponents from "fumadocs-ui/mdx";
import type { ComponentProps, FC } from "react";

const Link = defaultMdxComponents.a;

const BASE_URL = "/docs";

/**
 * Browser-safe dirname: same as path.dirname but no Node dependency.
 */
function dirname(path: string): string {
  const i = path.lastIndexOf("/");
  return i <= 0 ? "" : path.slice(0, i);
}

/**
 * Resolve relative href (e.g. ./other-page) to absolute URL.
 * Mirrors fumadocs source.resolveHref logic without Node path.
 */
export function resolveRelativeHref(href: string, parentPath: string): string {
  if (!href?.startsWith("./")) return href;
  const rest = href.slice(2).replace(/\.mdx?$/i, "");
  const dir = dirname(parentPath);
  const path = dir ? `${dir}/${rest}` : rest;
  return `${BASE_URL}/${path}`;
}

export type PageLike = { path: string };

/**
 * Create a relative link component that works in the browser (no Node path).
 * Use this instead of createRelativeLink from fumadocs-ui/mdx in client/SSR code.
 */
export function createRelativeLinkClient<P extends PageLike>(page: P): FC<ComponentProps<"a">> {
  return function RelativeLink({ href, ...props }) {
    const resolved = href ? resolveRelativeHref(href, page.path) : href;
    return <Link href={resolved} {...props} />;
  };
}
