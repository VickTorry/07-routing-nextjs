import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoteModal({ params }: Props) {
  const { id } = await params;
  const noteId = Number(id);
  const note = await fetchNoteById(noteId);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
