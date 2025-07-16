import React from "react";

function PostItem({ post, onDelete }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button className="delete-button" onClick={() => onDelete(post.id)}>
        삭제
      </button>
    </div>
  );
}

export default PostItem;
