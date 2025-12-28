import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: NotePreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
