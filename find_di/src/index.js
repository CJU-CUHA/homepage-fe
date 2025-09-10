import React from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.js';
// import reportWebVitals from './reportWebVitals';
// import SignupForm from './SignupForm';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
