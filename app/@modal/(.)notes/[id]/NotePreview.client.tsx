'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

interface Props {
  noteId: number;
}

export default function NotePreview({ noteId }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: true, // ✅ optional but matches feedback
  });

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      {isLoading && <Loader />}
      {isError && error instanceof Error && (
        <ErrorMessage message={error.message} />
      )}
      {!note && !isLoading && !isError && <p>Note not found</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p><strong>Tag:</strong> {note.tag}</p>
          <p><em>Created at:</em> {new Date(note.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Modal>
  );
}
