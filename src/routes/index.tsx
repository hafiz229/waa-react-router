import { Navigate, RouteObject } from "react-router-dom";
import PostList from "../component/PostList";
import PostDetails from "../component/PostDetails";
import EditPost from "../component/EditPost";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/posts" />,
  },
  {
    path: "/posts",
    element: <PostList />,
  },
  {
    path: "/posts/:id",
    element: <PostDetails  />,
  },
  {
    path: "/posts/:id/edit",
    element: <EditPost  />,
  },
];
