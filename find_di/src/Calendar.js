import React, { useEffect, useState } from 'react';
import './Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const STORAGE_KEY = 'scheduleData';

const formatDate = (year, month, day) => {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

const Calendar = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState('');

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setScheduleData(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleData));
  }, [scheduleData]);

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
    setNoticeText(scheduleData[dateStr] || '');
    setModalOpen(true);
  };

  const handleSave = () => {
    if (noticeText.trim()) {
      setScheduleData((prev) => ({
        ...prev,
        [selectedDate]: noticeText.trim(),
      }));
      setModalOpen(false);
      setNoticeText('');
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('이 일정을 삭제하시겠습니까?');
    if (confirmDelete) {
      const { [selectedDate]: _, ...rest } = scheduleData;
      setScheduleData(rest);
      setModalOpen(false);
      setNoticeText('');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setNoticeText('');
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const createCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const totalCells = firstDay + totalDays;
    const totalRows = Math.ceil(totalCells / 7);

    const rows = [];
    let day = 1;

    for (let i = 0; i < totalRows; i++) {
      const cells = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cells.push(<td key={j}></td>);
        } else if (day > totalDays) {
          cells.push(<td key={j}></td>);
        } else {
          const dateStr = formatDate(currentYear, currentMonth + 1, day);
          const isToday =
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth() &&
            day === today.getDate();
          const hasEvent = !!scheduleData[dateStr];

          cells.push(
            <td
              key={j}
              onClick={() => handleDayClick(dateStr)}
              className={`${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
              title={scheduleData[dateStr] || ''}
              style={{ cursor: 'pointer' }}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="calendar-container"
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          width: 'fit-content',
        }}
      >
        <div className="calendar-box">
          <div
            className="calendar-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '20px',
              marginBottom: '10px',
            }}
          >
            <FaChevronLeft onClick={handlePrevMonth} style={{ cursor: 'pointer' }} title="이전 달" />
            <span>
              {currentYear}년 {currentMonth + 1}월
            </span>
            <FaChevronRight onClick={handleNextMonth} style={{ cursor: 'pointer' }} title="다음 달" />
          </div>

          <table className="calendar">
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>{createCalendar()}</tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            minWidth: '300px',
          }}
        >
          <h3>{selectedDate} 일정</h3>
          <textarea
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            rows={4}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;