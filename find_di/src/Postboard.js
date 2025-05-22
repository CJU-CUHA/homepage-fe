import React, { useState } from 'react';
import './share.css';

function PostBoard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = { id: Date.now(), title, content };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const filteredPosts = posts.filter(post =>
    post.title.includes(searchTerm) || post.content.includes(searchTerm)
  );

  return (
    <div>
      <h1>SHARE</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
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
        />
        <button type="submit">게시하기</button>
      </form>

      <div>
        {filteredPosts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button className="delete-button" onClick={() => handleDelete(post.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostBoard;