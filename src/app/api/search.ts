import { createFileRoute } from '@tanstack/react-router';
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

const searchAPI = createFromSource(source, {
  language: 'english',
});

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return searchAPI.GET(request);
      },
    },
  },
});
