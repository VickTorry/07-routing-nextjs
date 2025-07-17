// ✅ app/notes/filter/[...slug]/page.tsx

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] === 'All' ? undefined : resolvedParams.slug?.[0];
  const initialSearch = '';
    const initialData = await fetchNotes(1, 12, initialSearch, tag); // ← SSR

  return <NotesClient tag={tag} initialSearch={initialSearch} initialData={initialData} />;
}
