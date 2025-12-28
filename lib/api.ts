import type { Note, NoteTag } from '../types/note';
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export default interface NoteHTTPResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  tag?: string,
): Promise<NoteHTTPResponse> => {
  const response = await axios.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>('/notes', newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
