import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PostListType } from '../../types';
import { Api } from '../../apis/apis';

const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [postDetail, setPostDetail] = useState<PostListType>()

    const loadPostDetail = async (currentId: string) => {
        const response = await fetch(Api.getPostDetail(currentId));
        const data = await response.json();
        setPostDetail(data);
    }

    useEffect(() => {
        if (id) {
            loadPostDetail(id!);
        }
    }, [id])
  
    return (
      <div>
        <h1>{postDetail?.title}</h1>
        <p>{postDetail?.body}</p>
        <Link to={`/posts/${postDetail?.id}/edit`}>
          <button>Edit</button>
        </Link>
        <br />
        <Link to="/posts">Back to Posts</Link>
      </div>
    );
  };

export default PostDetails