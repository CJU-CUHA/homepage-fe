import React, { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Calendar';
import PostBoard from '../PostBoard';
import PostSummary from '../components/PostSummary';

function Main() {
    return (
  <div>
    <div className="main-grid">
      <div className="top-left">
        <PostBoard />
      </div>
      <div className="top-right">
        <Calendar />
      </div>
      <div className="bottom-left">
        <PostSummary />
      </div>
      <div className="bottom-right">
      </div>
    </div>
  </div>
);

};

export default Main;