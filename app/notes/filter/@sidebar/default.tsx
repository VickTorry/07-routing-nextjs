'use client';

import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/lib/api'; // adjust path if needed
import Link from 'next/link';
import css from './NotesSidebar.module.css';

export default function SidebarNotes() {
  const { data: tags = [], isLoading, error } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  if (isLoading) return null;
  if (error) return <div>Error loading tags</div>;

  return (
    <ul className={css.menuList}>
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
