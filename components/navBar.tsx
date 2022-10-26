'use strcit';

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px 0 10px 0' }}>
      <Link href="/" style={{ padding: '0 5px 0 0' }}>
        Home
      </Link>
      <Link href="/posts" style={{ padding: '0 5px 0 0' }}>
        Posts
      </Link>
    </nav>
  );
};

export default NavBar;
