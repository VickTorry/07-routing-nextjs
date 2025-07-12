import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'
import type { FetchNotesResponse } from '@/lib/api'

export default async function NotesPage() {

  const queryClient = new QueryClient()

  const page = 1
  const search = ''
  const perPage = 12

  // Prefetch the first page of notes with empty search
  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(page, perPage, search),
  })
  
  const dehydratedState = dehydrate(queryClient)

  const fetchedData = queryClient.getQueryData<FetchNotesResponse>(['notes', search, page])

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialData={fetchedData} initialSearch={search} />
    </HydrationBoundary>
  )
}
