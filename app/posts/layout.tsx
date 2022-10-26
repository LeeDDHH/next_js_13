'use strict';

import Link from 'next/link';
import { use } from 'react';
const getPosts = async () => {
  const posts = await fetch('https://dummyjson.com/posts?limit=3');
  return posts.json() as Promise<Posts>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { posts } = use(getPosts());
  // console.log(posts);
  return (
    <div>
      <ul>
        {posts.map((p: Post) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
