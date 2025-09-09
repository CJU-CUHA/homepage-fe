import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import SignupForm from './SignupForm';
import FindIdForm from './components/FindIdForm';
import Intro from './pages/Intro';
import Load from './Load';
import PostBoard from './PostBoard';
import './App.css'; 
import JangbalCity from './pages/JangbalCity';
import PasswordReset from './components/PasswordReset';
import CTFTime from './pages/CTFTime';

function App() {
  const matrixCanvasRef = useRef(null);
  let animationFrameId;

  // Matrix background effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41'; // Neon green color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="app-container">
      <canvas className="matrix-bg" ref={matrixCanvasRef}></canvas>
      
      <Router>
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/JangbalCity" element={<JangbalCity />} />
            <Route path="/Load" element={<Load />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/FindIdForm" element={<FindIdForm />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/SignupForm" element={<SignupForm />} />
            <Route path="/resources" element={<PostBoard />} />
            <Route path="/resources/files" element={<PostBoard onlyWithFiles={true} />} />
            <Route path="/ctftime" element={<CTFTime />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;