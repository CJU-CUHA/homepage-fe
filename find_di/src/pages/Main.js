import React, { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Calendar';
import Postboard from '../Postboard';
import PostSummary from '../components/PostSummary';
import TextSlider from '../components/TextSlider';

function Main() {
    return (
  <div>
    <div className="slider-section">
      <TextSlider />
    </div>
    <div className="main-grid">
      <div className="top-left">
        <Postboard />
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