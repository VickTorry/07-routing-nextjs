// components/NotePreview/NotePreview.tsx
'use client';

import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  return (
    <div className={css.preview}>
      <h2>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
