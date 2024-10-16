import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../apis/apis";
import { PostListType } from "../../types";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState<PostListType>();
  const [loading, setLoading] = useState<Boolean>(false);

  const loadPostDetail = async (currentId: string) => {
    setLoading(true);

    const response = await fetch(Api.getPostDetail(currentId));
    const data = await response.json();
    setPostDetail(data);

    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadPostDetail(id!);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(Api.editPost(postDetail!?.id?.toString()), {
      method: "PUT",
      body: JSON.stringify(postDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      navigate(`/posts/${postDetail?.id}`);
    }
  };

  const onPostChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostDetail((previous) => ({
      ...previous!,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h1>Edit Post</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={postDetail?.title}
                  onChange={onPostChange}
                />
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center",}}>
              <label>
                Content:
              </label>
              <textarea
                  value={postDetail?.body}
                  name="body"
                  onChange={onPostChange}
                  rows={10}
                />
            </div>
            <button type="submit">Save Changes</button>
          </form>
          <br />
          <button onClick={() => navigate(`/posts/${postDetail?.id}`)}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default EditPost;
