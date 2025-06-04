import React, { useState } from 'react';
import './PasswordReset';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const requestAuthCodeAndNext = async () => {
    try {
      const res = await fetch('/api/request-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage('인증번호가 이메일로 발송되었습니다. 새 비밀번호를 입력하세요.');
        setStep(2);
      } else {
        const error = await res.json();
        setMessage(error.message || '인증번호 요청 실패');
      }
    } catch {
      setMessage('서버 요청 실패');
    }
  };

  const resetPassword = async () => {
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      if (res.ok) {
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
        setStep(3);
      } else {
        const error = await res.json();
        setMessage(error.message || '비밀번호 재설정 실패');
      }
    } catch {
      setMessage('서버 요청 실패');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
      {step === 1 && (
        <>
          <h2>비밀번호 재설정</h2>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '200px',
              padding: '6px',
              marginBottom: '10px',
            }}
          />
          <button 
          onClick={requestAuthCodeAndNext}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            width: '200px',
          }}
          >인증번호 요청
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={{
              width: '200px',
              padding:'6px',
              fontSize: '14px',
              marginBottom: '10px',
            }}
          />
          <button 
          onClick={resetPassword}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
          }}
          >
            비밀번호 재설정
          </button>
        </>
      )}

      {step === 3 && <p>{message}</p>}

      {message && step !== 3 && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;