// src/components/ClubBanner.jsx
import React from "react";
import "pages/ClubBanner.css";
import logo from "./cu.png";

function ClubBanner() {
  const handleClick = () => {
    alert("Nothing here~");
  };

  return (
    <header className="main-banner">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <nav className="nav-menu">
        <span>CTF Time</span>
        <div className="divider"></div>
        <span>WAR GAME</span>
        <div className="divider"></div>
        <span>CUHA WIKI</span>
        <div className="divider"></div>
        <span>MINECRAFT</span>
        <div className="divider"></div>
        <button className="click-me" onClick={handleClick}>
          Click Me
        </button>
      </nav>

      <div className="auth">
        <span className="login">로그인</span>
        <span className="sep">|</span>
        <span className="signup">회원가입</span>
      </div>
    </header>
  );
}

export default ClubBanner;