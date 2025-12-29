'use client';

import css from './NoteForm.module.css';
// import * as Yup from 'yup';
// import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { NoteTag } from '../../types/note';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface NoteFormProps {
  tags: NoteTag[];
}

// const NoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'min 3')
//     .max(50, 'max 50')
//     .required('Title required'),
//   content: Yup.string().max(500, 'max 500'),
//   tag: Yup.string().required('Tag required'),
// });

// interface FormValues {
//   id: string;
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// const initialValues: FormValues = {
//   id: '',
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

export default function NoteForm({ tags }: NoteFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    // const values = Object.fromEntries(formData);
    // console.log(values);

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    if (!title || title.length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    try {
      await axios.post(
        'https://notehub-public.goit.study/api/notes',
        { title, content, tag },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
          },
        },
      );

      toast.success('Note created');
      router.push('/notes/filter/all');
      router.refresh();
    } catch {
      toast.error('Failed to create note');
    }
  };

  // const handleCancel = () => {
  //   router.push('/notes/filter/all');
  // };

  // const formAction = async (formData: FormData) => {
  //   const title = formData.get('title') as string;
  //   const content = formData.get('content') as string;
  //   const tag = formData.get('tag') as NoteTag;

  //   if (!title || title.length < 3) {
  //     toast.error('Title must be at least 3 characters');
  //     return;
  //   }

  //   try {
  //     await createNote({ title, content, tag });
  //     toast.success('Note created');

  //     onClose();
  //     router.push('/notes');
  //     router.refresh();
  //   } catch {
  //     toast.error('Failed to create note');
  //   }
  // };

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: createNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['notes'] });
  //     toast.success('post created!');
  //     onClose();
  //   },
  // });

  // const handleSubmit = (
  //   values: FormValues,
  //   actions: FormikHelpers<FormValues>,
  // ) => {
  //   mutation.mutate({
  //     title: values.title,
  //     content: values.content,
  //     tag: values.tag,
  //   });
  //   actions.resetForm();
  // };

  return (
    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={handleSubmit}
    //   validationSchema={NoteSchema}
    // >
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
        />
        {/* <ErrorMessage name="title" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} required>
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
        {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          // disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
    // </Formik>
  );
}
