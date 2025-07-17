'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState, useEffect, useRef } from 'react';


type Props = {
  tags: string[];
};

export default function TagsMenu({ tags }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  

  // 🔍 Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setOpen(prev => !prev)}>
        Notes ▾
      </button>
      {open && (
        <ul className={css.menuList}>
          {tags.map(tag => (
  <li key={tag} className={css.menuItem}>
    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
      {tag}
    </Link>
  </li>
))}
        </ul>
      )}
    </div>
  );
}
