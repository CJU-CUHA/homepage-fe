// src/components/PostList.js
import React from "react";
import PostItem from "./PostItem";

function PostList({ posts, onDelete }) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PostList;