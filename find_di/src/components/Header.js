import React from "react";
import cuhaLogo from '../img/cu.png';

function Header() {
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
            <span class="click-me">Click Me</span>
          </nav>
          <div class="auth">
            <a href="/login">로그인</a>
            <span class="sep">|</span>
            <a href="/signupform">회원가입</a>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;