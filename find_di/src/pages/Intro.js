import React, { useEffect, useRef, useState } from 'react';
import Main from './Main';
import './Intro.css';
import cuhaLogo from '../img/cuha-logo.jpg';

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
      {/* Intro section with the image */}
      <div 
        className={`intro-section ${scrolled ? 'hide' : ''}`}
        ref={introRef}
      >
        <img src={cuhaLogo} alt="CUHA Digital Security" />
      </div>

      {/* Main content section, which appears on scroll */}
      <div className="main-content-wrapper">
        <Main />
      </div>
    </div>
  );
};

export default Intro;