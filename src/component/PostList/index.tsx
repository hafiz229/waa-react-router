import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostListType } from '../../types';
import { Api } from '../../apis/apis';

const PostList = () => {
    const [postList, setPostList] = useState<PostListType[]>([]);

    const loadPostList = async () => {
        const response = await fetch(Api.getPostList);
        const data = await response.json();

        setPostList(data);
    }

    useEffect(() => {
        loadPostList();
    } ,[])

  return (
    <div>
    <h1>Blog Posts</h1>
    <ul>
      {postList?.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default PostList