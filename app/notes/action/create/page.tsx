import type { Metadata } from 'next';
import CreateNote from '@/components/CreateNote/CreateNote';

export const metadata: Metadata = {
  title: 'NoteHub: Create note',
  description: 'Create a new note in NoteHub to organize your ideas and tasks',
  openGraph: {
    title: 'NoteHub: Create note',
    description:
      'Create a new note in NoteHub to organize your ideas and tasks',
    url: 'https://08-zustand-khaki-nine.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note',
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
