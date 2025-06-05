import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import cuhaLogo from '../img/cu.png';
import Sidebar from "./Sidebar";
import './Header.css';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="App">
        <header className="main-banner">
          <button 
            className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>

          <div className="logo">
            <Link to="/">
              <img src={cuhaLogo} alt="logo" />
            </Link>
          </div>

          <nav className="nav-menu">
            <span className="click-me" onClick={() => setModalOpen(true)}>Click Me</span>
          </nav>

          <div className="auth">
            <Link to="/login">로그인</Link>
            <span className="sep">|</span>
            <Link to="/signupform">회원가입</Link>
          </div>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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