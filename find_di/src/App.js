import React, {Component} from 'react';
import logo from './img/cu.png';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="main-banner">
        <div className="logo">
            <img src={logo} alt="logo" width="30px"></img>
        </div>
        <nav class="nav-menu">
            <button className="cuha-button">CUHA</button>
            <span>CTF Time</span>
            <div className="divider"></div>
            <span>WAR GAME</span>
            <div className="divider"></div>
            <span>CUHA WIKI</span>
            <div className="divider"></div>
            <span>MINECRAFT</span>
            <div className="divider"></div>
            <span className="click-me">Click Me</span>
        </nav>
        <div className="auth">
            <span className="login">로그인</span>
            <span className="sep">|</span>
            <span className="signup">회원가입</span>
        </div>
    </header>
    </div>
  );
}

export default App;
