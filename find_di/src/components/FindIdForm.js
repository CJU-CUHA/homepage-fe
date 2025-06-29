import React, { useState } from 'react';
import axios from 'axios';

const FindIdForm = () => {
  const [email, setEmail] = useState('');
  const [foundId, setFoundId] = useState('');
  const [error, setError] = useState('');

  const handleFindId = async (e) => {
    e.preventDefault();
    setError('');
    setFoundId('');
    try {
      const res = await axios.post('/api/find-id', { email });
      setFoundId(res.data.username);
    } catch (err) {
      setError(err.response?.data?.message || '오류가 발생했습니다.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '60px',
      }}
    >
      <h2>아이디 찾기</h2>
      <form 
      onSubmit={handleFindId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
      >
        <input
          type="email"
          value={email}
          placeholder="가입 시 사용한 이메일 입력"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '240px',
            padding: '6px',
            fontSize: '14px',
          }}
        />
        <button 
        type="submit"
        style={{
          padding: '6px 12px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
        >
          찾기
          </button>
      </form>
      {foundId && (
        <p style={{ marginTop: '15px' }}>
          회원님의 아이디는: <strong>{foundId}</strong>
          </p>
        )}
      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {error}
          </p>
          )}
    </div>
  );
};

export default FindIdForm;