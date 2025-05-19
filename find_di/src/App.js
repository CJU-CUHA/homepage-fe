import React, { useState, useEffect } from 'react';
import logo from './img/cu.png';
import './banner.css';
import Login from './component/login.js';
import PostForm from './component/PostForm.js';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [ctfData, setCtfData] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchCTF = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://cuha.cju.ac.kr:10001/api/api/ctftime');
      const data = await res.json();
      setCtfData(data);
    } catch (err) {
      console.error('CTF fetch error:', err);
      setCtfData([]);
    } finally {
      setLoading(false);
    }
  };

  const logoLink = React.createElement(
    'a',
    { href: 'klogin.html' },
    React.createElement('img', { src: logo, alt: 'Logo', draggable: 'false', width: '30px' })
  );

  const ctfLink = React.createElement(
    'a',
    { href: '#', onClick: fetchCTF },
    'CTF Time'
  );

  const ctfItems = loading
    ? React.createElement('p', null, '로딩 중...')
    : ctfData.map((item, idx) =>
        React.createElement(
          'div',
          { key: idx, className: 'ctf-item' },
          React.createElement('h2', null, item.title),
          React.createElement('p', null, item.description),
          React.createElement('p', null, `날짜: ${item.date}`)
        )
      );

  const navMenu = React.createElement(
    'nav',
    { className: 'banner-section nav-menu' },
    ctfLink,
    React.createElement('div', { id: 'ctf-data', className: 'ctf-container' }, ctfItems),
    React.createElement('a', { href: 'https://cifrar.cju.ac.kr/' }, 'WAR GAME'),
    React.createElement('a', { href: 'https://cuha.cju.ac.kr/index.php/%EB%8C%80%EB%AC%B8' }, 'CUHA WIKI'),
    React.createElement('span', null, 'MINECRAFT'),
    React.createElement(
      'button',
      { className: 'click-me', onClick: openModal },
      'Click Me'
    )
  );

  const authSection = React.createElement(
    'div',
    { className: 'auth' },
    React.createElement(Login),
    React.createElement('span', { className: 'sep' }, '|'),
    React.createElement(PostForm)
  );

  const modal = showModal
    ? React.createElement(
        'div',
        { className: 'modal', onClick: closeModal },
        React.createElement(
          'div',
          {
            className: 'modal-content',
            onClick: (e) => e.stopPropagation(),
          },
          React.createElement(
            'span',
            { className: 'close', onClick: closeModal },
            '×'
          ),
          React.createElement('p', null, '언제나 당신을 응원합니다.'),
          React.createElement(
            'button',
            { onClick: closeModal },
            '닫기'
          )
        )
      )
    : null;

  const header = React.createElement(
    'header',
    { className: 'main-banner' },
    React.createElement('div', { className: 'banner-section logo' }, logoLink),
    navMenu,
    authSection
  );

  return React.createElement('div', { className: 'App' }, header, modal);
}

export default App;