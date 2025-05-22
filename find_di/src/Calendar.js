import React, { useState } from 'react';

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const events = {
    '2025-05-10': '과 동아리 모임',
    '2025-05-20': '시험일정',
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
    setSelectedDay(null);
  };

  const renderDays = () => {
    const blanks = Array(firstDayOfMonth).fill(null);
    const daysArray = blanks.map((_, index) => (
      <div key={`b${index}`} style={{ width: '14.2%', height: 60 }}></div>
    ));

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = !!events[dateKey];

      daysArray.push(
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          style={{
            width: '14.2%',
            height: 60,
            backgroundColor: selectedDay === day ? '#4caf50' : '#f0f0f0',
            color: selectedDay === day ? 'white' : 'black',
            border: hasEvent ? '2px solid #2196f3' : '1px solid #ccc',
            borderRadius: 6,
            margin: 1,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div>{day}</div>
          {hasEvent && (
            <div style={{
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 10,
              color: '#2196f3'
            }}>
              {events[dateKey]}
            </div>
          )}
        </button>
      );
    }

    return daysArray;
  };

  return (
    <div style={{ maxWidth: 480, margin: '20px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 20 }}>일정 캘린더</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={prevMonth}>&lt;</button>
        <span style={{ margin: '0 15px', fontSize: 18 }}>
          {year}년 {month + 1}월
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#fff' }}>
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={i} style={{ width: '14.2%', fontWeight: 'bold', padding: 8 }}>{d}</div>
        ))}
        {renderDays()}
      </div>
      <div style={{ marginTop: 15, fontSize: 14 }}>
        {selectedDay
          ? `${year}년 ${month + 1}월 ${selectedDay}일 선택됨`
          : '날짜를 선택하세요'}
      </div>
    </div>
  );
};

export default Calendar;