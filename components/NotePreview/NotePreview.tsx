import css from './NotePreview.module.css';

interface NotePreviewProps {
  title: string;
  content: string;
}
export default function NotePreview({ title, content }: NotePreviewProps) {
  return (
    <div className={css.notePreview}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
    </div>
  );
}
