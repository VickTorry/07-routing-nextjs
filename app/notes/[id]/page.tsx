import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client' 

type Props = {
  params: { id: string }  // ✅ FIXED: params is not a Promise
}

export default async function NoteDetails({ params }: Props) {
  const noteId = Number(params.id)
  const queryClient = new QueryClient()

  // Preload the note
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
