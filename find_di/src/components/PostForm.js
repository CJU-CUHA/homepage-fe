// src/components/PostForm.js
import React from "react";

function PostForm({ title, content, setTitle, setContent, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">게시하기</button>
    </form>
  );
}

export default PostForm;
