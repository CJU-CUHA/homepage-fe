import React, { useState, useRef, useEffect } from 'react';
import './PostBoard.css';

function PostBoard({ onlyWithFiles = false }) {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const fileInputRef = useRef(null);

    // 로컬 스토리지에서 게시물 로드
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('postboard-posts')) || [];
        setPosts(storedPosts);
    }, []);

    // 게시물 변경 시 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('postboard-posts', JSON.stringify(posts));
    }, [posts]);

    const filteredPosts = posts.filter(post => {
        const matchSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchFile = !onlyWithFiles || (post.file && post.file.name);
        return matchSearch && matchFile;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        let newFile = null;
        let newFileUrl = null;
        if (file) {
            newFile = {
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file)
            };
            newFileUrl = newFile.url;
        }

        const newPost = { id: Date.now(), title, content, file: newFile, fileUrl: newFileUrl };
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

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleCloseDetail = () => {
        setSelectedPost(null);
    };

    return (
        <div className="post-board">
            <h1 className="board-title">share</h1>
            <p className="board-subtitle">자료 공유 & 대외활동</p>

            <input
                type="text"
                className="search-input"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <form onSubmit={handleSubmit} className="post-form">
                <input
                    type="text"
                    className="form-input"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="form-textarea"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="file-input-container">
                    <label htmlFor="file-upload" className="file-upload-label">
                        파일 선택
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="file-input"
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.hwp"
                    />
                    {file && (
                        <div className="file-preview">
                            <span>{file.name}</span>
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="remove-file-btn"
                                aria-label="파일 삭제"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-button">
                    게시하기
                </button>
            </form>

            <div className="posts-container">
                {filteredPosts.length === 0 && <p className="no-posts-message">게시물이 없습니다.</p>}
                {filteredPosts.map(post => (
                    <div
                        key={post.id}
                        className="post-item"
                        onClick={() => handlePostClick(post)}
                    >
                        <h3>{post.title}</h3>
                        <p>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
                        {post.file && <span className="file-badge">첨부파일 있음</span>}
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
                <div className="post-detail-modal">
                    <div className="post-detail-content">
                        <button onClick={handleCloseDetail} className="close-detail-btn">
                            뒤로가기
                        </button>
                        <h2 className="detail-title">{selectedPost.title}</h2>
                        <p className="detail-content">{selectedPost.content}</p>
                        {selectedPost.file && (
                            <div className="detail-file">
                                {selectedPost.file.type.startsWith('image/') ? (
                                    <img
                                        src={selectedPost.fileUrl}
                                        alt={selectedPost.file.name}
                                        className="detail-image"
                                    />
                                ) : (
                                    <a
                                        href={selectedPost.fileUrl}
                                        download={selectedPost.file.name}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="detail-download-link"
                                    >
                                        첨부파일 다운로드: {selectedPost.file.name}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostBoard;