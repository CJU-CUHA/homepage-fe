import React, { useEffect, useState } from 'react';
import './Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'scheduleData';

const formatDate = (year, month, day) => {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

const Calendar = ({ currentUser }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [userList, setUserList] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());

  useEffect(() => {
    fetch('/api/titles')
      .then(res => res.json())
      .then(data => setTitleList(data))
      .catch(() => setTitleList(['Security', 'Programming', 'Meeting', 'Work']));
  }, []);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUserList(data))
      .catch(() => setUserList([{ name: currentUser?.name || 'Unknown' }]));
  }, [currentUser]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setScheduleData(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleData));
  }, [scheduleData]);

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch('/api/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      setAuthor(user.username || user.name);
    }
  };

  fetchUser();
}, []);

  const handleSave = () => {
    if (!selectedDate || !title || !subtitle || !author) return;
    const newEntry = { id: uuidv4(), title, subtitle, author };
    setScheduleData(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEntry],
    }));
    setModalOpen(false);
    setTitle('');
    setSubtitle('');
    setAuthor(currentUser?.name || '');
  };

  const toggleSelectForDelete = (id) => {
  setSelectedForDelete(prev => {
    const newSet = new Set(prev);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    return newSet;
  });
};

const handleBulkDelete = () => {
  const newData = {};

  for (const [date, entries] of Object.entries(scheduleData)) {
    const filtered = entries.filter(entry => !selectedForDelete.has(entry.id));
    if (filtered.length > 0) {
      newData[date] = filtered;
    }
  }

  setScheduleData(newData);
  setSelectedForDelete(new Set());
};

  const requestDelete = (dateStr, idx) => {
    setDeleteTarget({ dateStr, idx });
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const { dateStr, idx } = deleteTarget;
    const newArr = [...scheduleData[dateStr]];
    newArr.splice(idx, 1);
    const newData = { ...scheduleData };
    if (newArr.length > 0) {
      newData[dateStr] = newArr;
    } else {
      delete newData[dateStr];
    }
    setScheduleData(newData);
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
    setTitle('');
    setSubtitle('');
    setAuthor(currentUser?.name || '');
    setSelectedDate(dateStr);
    setModalOpen(true);
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
          const hasEvent = scheduleData[dateStr]?.length > 0;

          cells.push(
            <td
              key={j}
              onClick={() => handleDayClick(dateStr)}
              className={`${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
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
    <div>
      <div className="calendar-container">
        <div className="calendar-header">
          <FaChevronLeft onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else setCurrentMonth(currentMonth - 1);
          }} />
          <span>{currentYear}년 {currentMonth + 1}월</span>
          <FaChevronRight onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else setCurrentMonth(currentMonth + 1);
          }} />
        </div>

        <table className="calendar">
          <thead>
            <tr>
              <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
            </tr>
          </thead>
          <tbody>{createCalendar()}</tbody>
        </table>
      </div>

      <div className="schedule-list-container">
  {Object.entries(scheduleData).map(([date, entries]) => (
    <div key={date} className="schedule-list">
      <strong>{date}</strong>
      {entries.map((entry) => (
        <div key={entry.id} className="schedule-item">
          <input
            type="checkbox"
            checked={selectedForDelete.has(entry.id)}
            onChange={() => toggleSelectForDelete(entry.id)}
          />
          <span>{entry.title} - {entry.subtitle} ({entry.author})</span>
        </div>
      ))}
    </div>
  ))}
  {selectedForDelete.size > 0 && (
    <button onClick={handleBulkDelete}>선택된 일정 삭제</button>
  )}
</div>

      {modalOpen && (
        <div className="modal">
          <h3>{selectedDate}</h3>
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="">제목 선택</option>
            {titleList.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>

          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="내용"
          />

          <p>등록자: {author}</p>

          <div className="modal-actions">
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {deleteConfirmOpen && (
        <div className="modal">
          <p>이 일정을 삭제하시겠습니까?</p>
          <div className="modal-actions">
            <button onClick={confirmDelete}>확인</button>
            <button onClick={cancelDelete}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;