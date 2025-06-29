import React, { useState, useRef } from 'react';
import './pages/share.css';

function PostBoard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    let fileUrl = null;
    if (file) {
      fileUrl = URL.createObjectURL(file);
    }

    const newPost = { id: Date.now(), title, content, file, fileUrl };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setFile(null);

    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));

    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const filteredPosts = posts.filter(post =>
    post.title.includes(searchTerm) || post.content.includes(searchTerm)
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

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
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.hwp"
          />
          {file && (
            <div style={{ marginLeft: '10px' }}>
              <span>{file.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                aria-label="파일 삭제"
                style={{
                  marginLeft: '5px',
                  cursor: 'pointer',
                  background: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  lineHeight: '16px',
                  padding: 0,
                }}
              >
                ×
              </button>
            </div>
          )}
        <button type="submit">게시하기</button>
      </form>

      <div>
            {filteredPosts.length === 0 && <p>게시물이 없습니다.</p>}
      {filteredPosts.map(post => (
        <div
          key={post.id}
          className="post"
          style={{ cursor: 'pointer' }}
          onClick={() => handlePostClick(post)}
        >
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
          {post.file && <p>첨부파일: {post.file.name}</p>}
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post.id);
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
    
    {selectedPost && (
      <div className="post-detail" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        <button onClick={handleCloseDetail}>뒤로가기</button>
        <h2>{selectedPost.title}</h2>
        <p>{selectedPost.content}</p>
        {selectedPost.file && (
          <>
            {selectedPost.file.type.startsWith('image/') ? (
              <img
                src={selectedPost.fileUrl}
                alt={selectedPost.file.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <a href={selectedPost.fileUrl} download={selectedPost.file.name} target="_blank" rel="noreferrer">
                첨부파일 다운로드: {selectedPost.file.name}
              </a>
            )}
          </>
        )}
      </div>
    )}
  </div>
 );
}

export default PostBoard;