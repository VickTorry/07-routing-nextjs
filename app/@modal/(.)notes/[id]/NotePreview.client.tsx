// ✅ FILE: app/@modal/(.)notes/[id]/NotePreview.client.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface Props {
  noteId: number;
}

export default function NotePreview({ noteId }: Props) {
  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error) return <ErrorMessage message={error.message} />;
  if (!note) return <p>Note not found</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p><em>Created at:</em> {new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
