import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import SignupForm from './SignupForm';
import FindIdForm from './components/FindIdForm';
import Footer from './components/Footer';
import Main from './pages/Main';
import Load from './Load';
import './App.css';
import JangbalCity from './pages/JangbalCity';
import PasswordReset from './components/PasswordReset';
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/JangbalCity" element={<JangbalCity />} />
        <Route path="/Load" element={<Load/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/FindIdForm" element={<FindIdForm/>} />
        <Route path="/reset-password" element={<PasswordReset/>} />
        <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>

      <Footer />
    </Router>
   );
 }

export default App;