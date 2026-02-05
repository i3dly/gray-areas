import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-1 flex-col justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
        <p className="text-fd-muted-foreground">
          You can open{' '}
          <Link
            to="/docs"
            className="text-fd-foreground font-semibold underline"
          >
            /docs
          </Link>{' '}
          and see the documentation.
        </p>
      </main>
    </HomeLayout>
  );
}
