import React from 'react';
import Calendar from '../Calendar';
import Postboard from '../Postboard';
import './Main.css';

const Main = ({ currentUser }) => {
    return (
       <div className="main-grid">
         <div className="top-left">
        <Calendar currentUser={currentUser} />
      </div>
      <div className="top-right">
        <Postboard/>
      </div>
      <div className="bottom-left"></div>
      <div className="bottom-right"></div>
    </div>
  );
};

export default Main;