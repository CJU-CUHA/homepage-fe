import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './components/Login';
import SignuForm from './SignupForm';
import Footer from './components/Footer';
import Dev from './pages/Dev';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/main" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupform" element={<signupform />} />
        <Route path="/Dev" element={<Dev />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;