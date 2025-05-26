import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import SignupForm from './SignupForm';
import Footer from './components/Footer';
import Main from './pages/Main';
import Load from './Load';
import './App.css';
import JangbalCity from './pages/JangbalCity';
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<JangbalCity/>} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Load" element={<Load/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>

      <Footer />
    </Router>
   );
 }

export default App;