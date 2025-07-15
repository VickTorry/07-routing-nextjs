import axios from 'axios';
import type { Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  console.log('[fetchNotes] Params:', {
  page,
  perPage,
  search,
  tag,
});
  const response = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: {
        page,
        perPage,
        ...(search?.trim() ? { search } : {}),
        ...(tag !== undefined ? { tag } : {}),
   },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

/**
 * Fetch a single note by ID.
 */
export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

/**
 * Create a new note.
 */
export const createNote = async (note: {
  title: string;
  content: string;
  tag: Note['tag'];
}): Promise<Note> => {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

/**
 * Delete a note by ID.
 */
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

/**
 * Get the available tags manually (since backend does not expose a tags endpoint).
 */
export const getTags = async (): Promise<string[]> => {
  try {
    const response = await fetchNotes(1, 20); // smaller perPage
    const notes = response.notes;
    const validTags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

    const tags = Array.from(new Set(notes.map(note => note.tag)))
                      .filter(tag => validTags.includes(tag));

    return ['All', ...tags];
  } catch (error) {
    console.error('❌ getTags failed:', error);
    throw error;
  }
};