// app/notes/Notes.client.tsx
'use client'

import { useState, KeyboardEvent } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import type { Note } from '@/types/note'

import css from './Notes.module.css'

import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteModal from '@/components/NoteModal/NoteModal'
import NoteList from '@/components/NoteList/NoteList'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

const PER_PAGE = 12

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type Props = {
  initialData?: FetchNotesResponse;
  initialSearch?: string;
}

export default function NotesClient({ initialData, initialSearch }: Props) {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState(initialSearch || '')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchDebounced] = useDebounce(search, 500)
  const shouldUseInitialData = page === 1 && searchDebounced === initialSearch



  console.log('✅ useQuery firing with:', page, searchDebounced)

  console.log('📦 Received initialData:', initialData)
  console.log('🔑 useQuery key:', ['notes', searchDebounced, page])

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', searchDebounced, page],
    queryFn: () => fetchNotes(page, PER_PAGE, searchDebounced),
    placeholderData: keepPreviousData,
    initialData: shouldUseInitialData ? initialData : undefined,
    refetchOnMount: false, 
  })
  
  if (isLoading && !data) {
    console.log('⏳ Showing loading fallback...')
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setIsModalOpen(false)
  }

  return (
    <div className={css.app} onKeyDown={onKeyDown}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && !data && <Loader />}
      {isError && error instanceof Error && (
        <ErrorMessage message={error.message} />
      )}

      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : !isLoading ? (
        <p>No notes found.</p>
      ) : null}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
