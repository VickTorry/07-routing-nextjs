'use client'; // <-- Required for useQuery and interactivity

import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/lib/api';

const Header = () => {
  const { data: tags, isLoading, error } = useQuery<string[]>({
    queryKey: ['tags'],     // ✅ Correct way to pass query key
    queryFn: getTags,       // ✅ The function that fetches tags
  });

  if (isLoading) return null; // or show a spinner
  if (error) return <div>Error loading tags</div>;

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu tags={tags!} /> {/* ✅ Tags now properly passed */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
