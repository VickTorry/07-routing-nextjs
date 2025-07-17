import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client' 


type Props = {
  params: Promise<{ id: string }>
}

export default async function NoteDetails({ params }: Props) {

  const { id } = await params  // ✅ Await here to match what Turbopack expects
  console.log('note id:', id);
  const noteId = Number(id)
  const note = await fetchNoteById(noteId)
  console.log('Fetched note:', note) // ✅ Log the fetched note
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}
