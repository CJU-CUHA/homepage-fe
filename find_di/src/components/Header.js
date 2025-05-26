import React from "react";
import { useState } from "react";
import cuhaLogo from '../img/cu.png';
import './Header.css';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <header class="main-banner">
          <div className="logo">
            <img src={cuhaLogo} alt="logo" />
          </div>
          <nav class="nav-menu">
            <span>CTF Time</span>
            <div class="divider"></div>
            <span>WAR GAME</span>
            <div class="divider"></div>
            <a href="https://cuha.cju.ac.kr/index.php/%EB%8C%80%EB%AC%B8">
                <span>CUHA WIKI</span>
            </a>
            <div class="divider"></div>
            <a href="https://cifrar.cju.ac.kr">
                <span>MINECRAFT</span>
            </a>
            <div class="divider"></div>
            <span className="click-me" onClick={handleClick}>Click Me</span>
          </nav>
          <div className="auth">
            <a href="/login">로그인</a>
            <span className="sep">|</span>
            <a href="/signupform">회원가입</a>
          </div>
        </header>
      </div>

       {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>당신의 1초를 빼앗기</h2>
            <p>메롱</p>
            <button onClick={handleClose}>닫기</button>
          </div>
        </div>
       )}
    </>
  );
}

export default Header;