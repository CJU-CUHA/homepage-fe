import { useState } from "react";
import { Link } from 'react-router-dom';
import cuhaLogo from '../img/cu.png';
import Sidebar from "./Sidebar";
import './Header.css';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState('');
  const [hasShownFortune, setHasShownFortune] = useState(false);

  const fortunes = [
    "오늘은 작은 기쁨이 찾아올 거예요.",
    "기회는 준비된 자에게 옵니다.",
    "행운은 곧 당신의 편이 될 거예요!",
    "가장 평범한 하루가 특별해질 수 있어요.",
    "지금의 노력이 곧 결실을 맺습니다."
  ];

  const handleClickMe = () => {
    if (!hasShownFortune) {
      const random = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortuneMessage(random);
      setModalOpen(true);
      setHasShownFortune(true);
    }
  };

  const handleCloseFortune = () => {
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
            <span className="click-me" onClick={handleClickMe}>Click Me</span>
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
            <h2>오늘의 운세</h2>
            <p>{fortuneMessage}</p>
            <button onClick={handleCloseFortune}>닫기</button>
          </div>
        </div>
       )}
    </>
  );
}

export default Header;