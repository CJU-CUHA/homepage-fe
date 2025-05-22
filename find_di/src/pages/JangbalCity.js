import React from 'react';
import './JangbalCity.css';
import bgbg from '../img/bgbg.jpg'; // 이미지 import (상대경로 주의)

const JangbalCity = () => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="title">장발's City</h1>

      <div className="main-grid">
        {/* 왼쪽 열 */}
        <div className="left-column">
          <div className="box box1">
            <div className="circle">{/* 이미지 자리 */}</div>
            <div className="description">동아리 소개글</div>
          </div>

          <div className="box box2">
            <div className="calendar">📅 달력</div>
            <div className="notices">📌 공지사항</div>
          </div>
        </div>

        {/* 오른쪽 열 */}
        <div className="right-column">
          <div className="box box3">🎞️ 배너 이미지 슬라이드</div>

          <div className="right-bottom">
            <div className="box box5">🏆 활동 랭킹</div>
            <div className="box box4">❓ 질문 게시판</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JangbalCity;
