import React, { useEffect, useRef, useState } from 'react';
import Main from './Main';
import './Intro.css';
import cuhaLogo from '../img/cuha-logo.png';

const Intro = () => {
  const introRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introElement = introRef.current;
      if (introElement) {
        // Set 'scrolled' to true if the user scrolls past 50% of the screen height.
        if (window.scrollY > window.innerHeight * 0.5) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="intro-container">
      <div 
        className={`intro-section ${scrolled ? 'hide' : ''}`}
        ref={introRef}
      >
        <img src={cuhaLogo} alt="CUHA Digital Security" />
      </div>

      <div className="main-content-wrapper">
        <Main />
      </div>
    </div>
  );
};

export default Intro;