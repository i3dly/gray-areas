import appCss from "@/app/global.css?url";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Gray Areas" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <RootProvider>
        <Outlet />
      </RootProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
