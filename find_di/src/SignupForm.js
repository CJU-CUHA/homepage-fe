// src/SignupForm.js
import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (username.length < 5 || username.length > 20) {
      newErrors.username = '아이디는 5자 이상 20자 이하로 입력하세요.';
    }

    if (password.length < 8 || password.length > 20) {
      newErrors.password = '비밀번호는 8자 이상 20자 이하로 입력하세요.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!email.includes('@')) {
      newErrors.email = '올바른 이메일 주소를 입력하세요.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('회원가입 완료!');
      // 여기에 서버로 보내는 코드를 넣을 수 있어요.
    }
  };

  return (
    <div className="login-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

        <button type="button">아이디 중복 체크</button>

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">부서</option>
          <option value="se">보안부</option>
          <option value="de">개발부</option>
          <option value="hu">인사부</option>
          <option value="mo">총무부</option>
        </select>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupForm;
