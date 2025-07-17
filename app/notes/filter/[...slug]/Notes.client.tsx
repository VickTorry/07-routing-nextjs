'use client';

import { useState, KeyboardEvent } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';


import css from './Notes.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { FetchNotesResponse } from '@/lib/api';

const PER_PAGE = 12;

type Props = {
  tag?: string;
  initialSearch: string;
  initialData: FetchNotesResponse;
};

export default function NotesClient({ tag, initialSearch, initialData }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchDebounced] = useDebounce(search, 500);
    const shouldUseInitialData = page === 1 && searchDebounced === initialSearch;


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', tag, searchDebounced, page],
    queryFn: () => fetchNotes(page, PER_PAGE, searchDebounced, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData: shouldUseInitialData ? initialData : undefined,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setIsModalOpen(false);
  };

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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
