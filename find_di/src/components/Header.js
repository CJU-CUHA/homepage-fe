import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
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
          <div class="logo">
            <Link to="/main">
            <img src={cuhaLogo} alt="logo" style={{ userSelect: "none", WebkitUserDrag: "none" }} />
            </Link>
          </div>
          <nav className="nav-menu">
            <span>CTF Time</span>
            <div className="divider"></div>
            <span>WAR GAME</span>
            <div className="divider"></div>
            <Link to="https://cuha.cju.ac.kr/index.php/%EB%8C%80%EB%AC%B8">
                <span>CUHA WIKI</span>
            </Link>
            <div className="divider"></div>
            <Link to="https://cifrar.cju.ac.kr">
                <span>MINECRAFT</span>
            </Link>
            <div className="divider"></div>
            <span className="click-me" onClick={handleClick}>Click Me</span>
          </nav>
          <div className="auth">
            <Link to="/login">로그인</Link>
            <span className="sep">|</span>
            <Link to="/signupform">회원가입</Link>
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