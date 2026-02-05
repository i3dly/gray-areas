import { createFileRoute, Outlet } from '@tanstack/react-router';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export const Route = createFileRoute('/docs')({
  component: DocsLayoutComponent,
});

function DocsLayoutComponent() {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      <Outlet />
    </DocsLayout>
  );
}
