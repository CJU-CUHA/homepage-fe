// components/PostSummary.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostSummary.css'; // 선택 사항: 스타일 분리

function PostSummary() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('posts');
    if (stored) {
      setPosts(JSON.parse(stored).slice(0, 3)); // 최신 3개만
    }
  }, []);

  return (
    <div className="post-summary">
      <h2>자료공유 & 대외활동</h2>
      {posts.length === 0 ? (
        <p>최근 게시물이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="summary-item">
            <h4>{post.title}</h4>
            <p>{post.content.length > 50 ? post.content.slice(0, 50) + '...' : post.content}</p>
          </div>
        ))
      )}
      <button onClick={() => navigate('/resources/files')}>더보기</button>
    </div>
  );
}

export default PostSummary;
