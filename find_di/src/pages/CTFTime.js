import React, { useEffect, useState } from "react";
import "./CTFTime.css"; 

function CTFTime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://corsproxy.io/?https://ctftime.org/api/v1/events/')
      .then(res => res.json())
      .then(result => setData(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="ctf-container">
      <h2>CTF TIME</h2>
      <div className="ctf-card-list">
        {data.length === 0 ? (
          <div>데이터 불러오는 중...</div>
        ) : (
          data.map((item, idx) => (
            <div className="ctf-card" key={idx}>
              <div className="ctf-title">{item.title}</div>
              <div>시작일: {item.start ? item.start.slice(0,10) : "?"}</div>
              <div>종료일: {item.finish ? item.finish.slice(0,10) : "?"}</div>
              <div>참가방식: {item.format || "없음"}</div>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                대회 링크
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CTFTime;