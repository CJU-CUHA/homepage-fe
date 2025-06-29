import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './components/Login';
import SignupForm from './SignupForm';
import Footer from './components/Footer';
import Dev from './pages/Dev';
import Load from './Load';
import './App.css';
import JangbalCity from './pages/JangbalCity';
import Congratulation from './Congratulation';  
import CTFTime from "./pages/CTFTime";
function App() {
  return (
    
    <Router>
      
      <Header />
      <Routes>
        <Route path="/" element={<JangbalCity />} />
        <Route path="/Main" element={<Main/>} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/Load" element={<Load/>} />
        <Route path="/congratulation" element={<Congratulation />} />
        <Route path="/ctftime" element={<CTFTime />} /> 
      </Routes>
      <Footer />
    </Router>
    );
}

export default App;