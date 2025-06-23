import React, { useState, useEffect } from 'react';
import './TextSlider.css';

const messages = [
  '보안 교육 수강신청 시작!',
  'CTF 대회 안내 확인하세요.',
  '스터디 팀원 모집 중!',
  '자료 공유 게시판을 이용해보세요.',
];

function TextSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-slider">
      <div className="slide-text">
        {messages[index]}
      </div>
    </div>
  );
}

export default TextSlider;
