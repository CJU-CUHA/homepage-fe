import React from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="sidebar-backdrop" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <h3>메뉴</h3>
        <Link to="/JangbalCity" onClick={onClose}>개발부</Link>
        <Link to="/ctf" onClick={onClose}>CTF TIME</Link>
        <Link to="/war" onClick={onClose}>WAR GAME</Link>
        <Link to="https://cuha.cju.ac.kr/index.php/%EB%8C%80%EB%AC%B8" >CUHA WIKI</Link>
        <Link to="https://cifrar.cju.ac.kr" onClick={onClose}>MINECRAFT</Link>
      </div>
    </div>
  );
}

export default Sidebar;