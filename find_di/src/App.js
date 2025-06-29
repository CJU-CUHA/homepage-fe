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
import Congratulation from './Congratulation';  
import CTFTime from "./pages/CTFTime";
import PasswordReset from './components/PasswordReset';
import Dev from './pages/Dev';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<JangbalCity />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/Load" element={<Load />} />
        <Route path="/congratulation" element={<Congratulation />} />
        <Route path="/ctftime" element={<CTFTime />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FindIdForm" element={<FindIdForm />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
