'use client';

import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useNoteDraftStore } from '@/lib/store/noteStore';

interface NoteFormProps {
  tags: NoteTag[];
}

export default function NoteForm({ tags }: NoteFormProps) {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setDraft({ [name]: value });
  };

  const formAction = async () => {
    if (!draft.title || draft.title.length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    try {
      const response = await fetch(
        'https://notehub-public.goit.study/api/notes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
          },
          body: JSON.stringify(draft),
        },
      );

      if (!response.ok) throw new Error();

      toast.success('Note created');
      clearDraft();
      router.back();
      router.refresh();
    } catch {
      toast.error('Failed to create note');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // const handleSubmit = async (formData: FormData) => {
  //   const title = formData.get('title') as string;
  //   const content = formData.get('content') as string;
  //   const tag = formData.get('tag') as NoteTag;

  //   if (!title || title.length < 3) {
  //     toast.error('Title must be at least 3 characters');
  //     return;
  //   }

  //     toast.success('Note created');
  //     router.push('/notes/filter/all');
  //     // onSuccess: (() => {
  //     //   clearDraft();
  //     //   router.push('/notes/filter/all');
  //     // });
  //     router.refresh();
  //   } catch {
  //     toast.error('Failed to create note');
  //   }
  // };

  return (
    <form className={css.form} action={formAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          required
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
