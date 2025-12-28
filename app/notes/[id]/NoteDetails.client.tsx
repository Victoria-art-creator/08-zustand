'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

interface NoteDetailsProps {
  noteId: string;
  initialNote?: Note;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong...</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (isSure) {
      router.back();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <button onClick={handleGoBack}>Back</button>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
