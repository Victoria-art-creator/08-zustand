import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] ?? 'all';

  const filterLabel = tag === 'all' ? 'All Notes' : `Notes tagged "${tag}"`;
  const title = `${filterLabel} | NoteHub`;
  const description =
    tag === 'all'
      ? 'Browse all notes in NoteHub. Search, filter, and manage your notes easily.'
      : `Browse notes filtered by the tag "${tag}" in NoteHub. Quickly find and manage related notes`;

  const url =
    tag === 'all'
      ? 'https://08-zustand-khaki-nine.vercel.app/notes/filter/all'
      : `https://08-zustand-khaki-nine.vercel.app/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub: ${filterLabel}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(undefined, 1, tag === 'all' ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
