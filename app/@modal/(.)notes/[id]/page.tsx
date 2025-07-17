
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';   
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

interface Props {
  params: { id: string };
}

export default async function NoteDetails({ params }: Props) {

  const resolvedParams = await params;
  const noteId = Number(resolvedParams.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
      <Modal>
        <NotePreview noteId={noteId} />
      </Modal>
    </HydrationBoundary>
  );
}
