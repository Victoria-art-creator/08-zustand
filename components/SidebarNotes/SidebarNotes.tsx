import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api';

export default async function NotesSidebar() {
  const data = await fetchNotes('', 1, '');
  const tags = Array.from(new Set(data.notes.map((note) => note.tag)));

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
