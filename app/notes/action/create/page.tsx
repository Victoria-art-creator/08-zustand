import type { Metadata } from 'next';
import CreateNote from '@/components/CreateNote/CreateNote';

// interface NewNote {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

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

// export const CreateNotePage = async (newNote: NewNote): Promise<Note> => {
//   const response = await axios.post<Note>('/notes', newNote, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//     },
//   });
//   return response.data;
// };

export default function CreateNotePage() {
  return <CreateNote tags={[]} />;
}
