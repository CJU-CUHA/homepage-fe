import React, { useState } from 'react';
import './Login.css'; // 기존에 만든 스타일 연결

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', username, password);

    // 여기에 서버로 로그인 정보 보내는 코드 추가 가능
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
      <div className="find-credentials">
        <a href="#" className="find-link">아이디 찾기</a>
        <span>|</span>
        <a href="#" className="find-link">비밀번호 찾기</a>
        <span>|</span>
        <a href="#" className="find-link">회원가입</a>
      </div>
    </div>
  );
}

export default Login;
