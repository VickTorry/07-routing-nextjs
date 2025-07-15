import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';

interface Props {
  params: { id: string };
}

export default async function NoteModal({ params }: Props) {
  const noteId = Number(params.id);
  const note = await fetchNoteById(noteId);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
