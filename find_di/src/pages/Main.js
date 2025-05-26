import React from 'react';
import Calendar from '../Calendar';
import './Main.css';

const Main = ({ currentUser }) => {
    return (
        <div>
        <Calendar currentUser={currentUser} />
       <div className="grid-container">
        <div className="grid-item"></div>
        <div className="grid-item"><Calendar /></div>
       </div>
       </div>
    );
};

export default Main;