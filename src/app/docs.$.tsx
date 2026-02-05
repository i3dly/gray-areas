import { createRelativeLinkClient } from "@/lib/relative-link";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";

export const Route = createFileRoute("/docs/$")({
  loader: async ({ params }) => {
    const slug = params._splat ? params._splat.split("/").filter(Boolean) : [];
    const page = source.getPage(slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    // biome-ignore lint/style/noNonNullAssertion: loaderData is set when head runs after loader
    const page = loaderData!;
    return {
      meta: [
        { title: page.data.title ?? "Docs" },
        ...(page.data.description ? [{ name: "description", content: page.data.description }] : []),
      ],
    };
  },
  component: DocsPageComponent,
});

function DocsPageComponent() {
  // biome-ignore lint/style/noNonNullAssertion: loader runs before component
  const page = Route.useLoaderData()!;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          code={page.data.body}
          components={getMDXComponents({
            a: createRelativeLinkClient(page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
