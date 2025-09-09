import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import './Calendar.css';

// Component for a single schedule item
const ScheduleItem = ({ entry, toggleSelect, isSelected }) => (
  <div className="schedule-item">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => toggleSelect(entry.id)}
    />
    <div className="schedule-content">
      <span className="schedule-title">{entry.title}</span>
      <span className="schedule-subtitle">{entry.subtitle}</span>
      <span className="schedule-author">({entry.author})</span>
    </div>
  </div>
);

// Component for the schedule creation/edit modal
const ScheduleModal = ({
  selectedDate,
  modalOpen,
  setModalOpen,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  author,
  titleList,
  handleSave,
}) => (
  modalOpen && (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>[SYSTEM] 일정 등록</h3>
        <p className="modal-date-info">// 대상 일자: {selectedDate} //</p>
        <div className="form-group">
          <label htmlFor="title-select">제목</label>
          <select
            id="title-select"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          >
            <option value="">-- 제목 선택 --</option>
            {titleList.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subtitle-input">내용</label>
          <input
            id="subtitle-input"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="일정 내용을 입력하세요"
            className="form-input"
          />
        </div>
       <p className="modal-author-info">등록자: <span className="author-name">{author}</span></p>

       <div className="modal-actions">
          <button onClick={handleSave} className="modal-btn save">저장</button>
          <button onClick={() => setModalOpen(false)} className="modal-btn close">닫기</button>
        </div>
      </div>
    </div>
  )
);

// Main Calendar component
const Calendar = () => {
  const STORAGE_KEY = 'scheduleData';
  const today = useRef(new Date());
  const [currentYear, setCurrentYear] = useState(today.current.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.current.getMonth());
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());

  const formatDate = (year, month, day) => {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const titleRes = await fetch('/api/titles');
        const titleData = await titleRes.json();
        setTitleList(titleData);
      } catch (err) {
        setTitleList(['보안교육', '프로젝트회의', 'CTF', '스터디']);
      }
    };
    fetchInitialData();
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) setScheduleData(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleData));
  }, [scheduleData]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthor('Guest');
        return;
      }
      try {
        const res = await fetch('/api/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const user = await res.json();
          setAuthor(user.username || user.name || 'Unknown');
        } else {
          setAuthor('Unknown');
        }
      } catch (err) {
        setAuthor('Unknown');
      }
    };
    fetchUser();
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedDate || !title || !subtitle || !author) return;
    const newEntry = { id: uuidv4(), title, subtitle, author };
    setScheduleData(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEntry],
    }));
    setModalOpen(false);
    setTitle('');
    setSubtitle('');
  }, [selectedDate, title, subtitle, author]);

  const handleDayClick = useCallback((dateStr) => {
    setSelectedDate(dateStr);
    setTitle('');
    setSubtitle('');
    setModalOpen(true);
  }, []);

  const toggleSelectForDelete = useCallback((id) => {
    setSelectedForDelete(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    const newData = {};
    for (const [date, entries] of Object.entries(scheduleData)) {
      const filtered = entries.filter(entry => !selectedForDelete.has(entry.id));
      if (filtered.length > 0) {
        newData[date] = filtered;
      }
    }
    setScheduleData(newData);
    setSelectedForDelete(new Set());
  }, [scheduleData, selectedForDelete]);

  const createCalendar = useCallback(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const totalCells = firstDay + totalDays;
    const totalRows = Math.ceil(totalCells / 7);

    const rows = [];
    let day = 1;

    for (let i = 0; i < totalRows; i++) {
      const cells = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > totalDays) {
          cells.push(<td key={`empty-${i}-${j}`}></td>);
        } else {
          const dateStr = formatDate(currentYear, currentMonth + 1, day);
          const isToday = currentYear === today.current.getFullYear() && currentMonth === today.current.getMonth() && day === today.current.getDate();
          const hasEvent = scheduleData[dateStr]?.length > 0;
          cells.push(
            <td
              key={dateStr}
              onClick={() => handleDayClick(dateStr)}
              className={`${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
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
  }, [currentYear, currentMonth, scheduleData, handleDayClick, formatDate]);

  return (
    <div className="calendar-section section">
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
        <h3 className="section-subtitle"> 예정된 일정</h3>
        {Object.entries(scheduleData)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([date, entries]) => (
            <div key={date} className="schedule-list">
              <strong className="schedule-date-header">[{date}]</strong>
              {entries.map((entry) => (
                <ScheduleItem
                  key={entry.id}
                  entry={entry}
                  toggleSelect={toggleSelectForDelete}
                  isSelected={selectedForDelete.has(entry.id)}
                />
              ))}
            </div>
          ))}
         {selectedForDelete.size > 0 && (
         <button onClick={handleBulkDelete} className="bulk-delete-btn">선택된 일정 삭제</button>
        )}
      </div>

      <ScheduleModal
        selectedDate={selectedDate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        author={author}
        titleList={titleList}
        handleSave={handleSave}
      />
    </div>
  );
}

export default Calendar;