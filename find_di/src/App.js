import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './components/Login';
import SignupForm from './SignupForm';
import Footer from './components/Footer';
import Dev from './pages/Dev';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Main" element={<Main/>} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;