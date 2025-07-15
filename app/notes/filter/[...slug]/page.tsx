// ✅ app/notes/filter/[...slug]/page.tsx

import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] === 'All' ? undefined : resolvedParams.slug?.[0];

  return <NotesClient tag={tag} />;
}
