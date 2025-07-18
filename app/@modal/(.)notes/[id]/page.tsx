import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client'; // shorter import

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const noteId = Number(id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={noteId} />
    </HydrationBoundary>
  );
}
