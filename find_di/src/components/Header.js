import React from "react";
import { Link } from "react-router-dom";
import cuhaLogo from "../img/cu.png";

function Header() {
  return (
    <div className="App">
      <header className="main-banner">
        <div className="logo">
          <img src={cuhaLogo} alt="logo" />
        </div>

        <nav className="nav-menu">
         <Link to="/ctftime" className="nav-link">CTF Time</Link>
          <div className="divider" />

          <span>WAR GAME</span>
          <div className="divider" />

      
          <a
            href="https://cuha.cju.ac.kr/index.php/%EB%8C%80%EB%AC%B8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>CUHA WIKI</span>
          </a>
          <div className="divider" />

          <a
            href="https://cifrar.cju.ac.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>MINECRAFT</span>
          </a>
          <div className="divider" />

          <span className="click-me">Click Me</span>
          <div className="divider" />

          
          <Link
            to="/congratulation"
            className="nav-link"
          >
            <span>Congratulation</span>
          </Link>
        </nav>

        <div className="auth">
          <Link to="/login">로그인</Link>
          <span className="sep">|</span>
          <Link to="/signupform">회원가입</Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
