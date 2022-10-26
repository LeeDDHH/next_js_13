'use strict';

import { use } from 'react';

type Props = { params: { id: number } };

const getPost = async (id: number) => {
  const post = await fetch(`https://dummyjson.com/posts/${id}`);

  return post.json() as Promise<Post>;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const post = use(getPost(id));
  // console.log(posts);
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </div>
  );
};

export default Page;
