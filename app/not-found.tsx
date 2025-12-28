import css from './Home.module.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page NoteHub is not found',
  description:
    'The page you are looking for does not exist. Please check the URL or return to the NoteHub homepage',
  openGraph: {
    title: 'Page NoteHub is not found',
    description:
      'This page does not exist. Go back to NoteHub to continue working with your notes',
    url: 'https://08-zustand-khaki-nine.vercel.app/404',
    images: [
      {
        url: '/page_404.png',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
