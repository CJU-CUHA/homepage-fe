import React from 'react';
import Calendar from '../Calendar';
import './Main.css';

const Main = ({ currentUser }) => {
    return (
        <div>
       <div className="grid-container">
        <div className="grid-item"></div>
        <div className="grid-item">
            <Calendar currentUser={currentUser} />

        </div>
       </div>
       </div>
    );
};

export default Main;