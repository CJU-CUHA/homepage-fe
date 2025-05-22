import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState({
    '2025-05-10': '과 동아리 모임',
    '2025-05-20': '시험일정',
  });

  const handleDateClick = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const newEvent = prompt(`"${dateKey}" 일정 입력:`, events[dateKey] || '');
    if (newEvent !== null) {
      setEvents((prev) => ({ ...prev, [dateKey]: newEvent }));
    }
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendar = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          week.push(
            <td key={j} onClick={() => handleDateClick(day)} style={{ cursor: 'pointer' }}>
              <div>{day}</div>
              {events[dateKey] && <div style={{ fontSize: '10px', color: 'gray' }}>{events[dateKey]}</div>}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }
    return calendar;
  };

  return (
    <div>
      <h2>{currentYear}년 {currentMonth + 1}월</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;