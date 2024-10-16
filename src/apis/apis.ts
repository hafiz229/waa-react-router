const domain = "http://localhost:3001";

export const Api = {
    getPostList: `${domain}/posts`,
    getPostDetail: (id: string) => `${domain}/posts/${id}`,
    editPost: (id: string) => `${domain}/posts/${id}`
}