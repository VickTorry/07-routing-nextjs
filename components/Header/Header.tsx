

import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import { getTags } from '@/lib/api';

const Header = async () => {
 const tags = await getTags();

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
            <TagsMenu tags={tags} /> {/* ✅ Tags now properly passed */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
