import NoteForm from '../NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { NoteTag } from '@/types/note';

interface Props {
  tags: NoteTag[];
}

export default function CreateNote({ tags }: Props) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
}
