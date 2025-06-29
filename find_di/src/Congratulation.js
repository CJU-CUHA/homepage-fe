import React, { useState, useEffect } from "react";
import "./Congratulation.css"; // 파일 이름 확인!

const totalPages = 100;
const buttonsPerPage = 10;

const contentData = {
  1: {
    img: process.env.PUBLIC_URL + "/sujang.png",
    title: "수장님의 보석함",
    text: "청주대 디지털보안학과에 존재하는 CUHA 회장 서종찬 수장님의 개인 게시판이다."
  },
  2: {
    img: process.env.PUBLIC_URL + "/page2.png",
    title: "수장님의 추억들",
    text: "여기는 수장님의 소중한 추억들을 담은 공간입니다."
  },
  3: {
    img: process.env.PUBLIC_URL + "/page3.png",
    title: "수장님의 명언집",
    text: "수장님의 인생 명언들을 기록해두는 공간입니다."
  }
};

const defaultData = page => ({
  img: process.env.PUBLIC_URL + "/default.png",
  title: `페이지 ${page}`,
  text: "아직 이 페이지에 대한 내용은 준비되지 않았습니다."
});

function Congratulation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentButtonGroup, setCurrentButtonGroup] = useState(0);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
      if (e.key === "ArrowLeft" && currentPage > 1) {
        goToPage(currentPage - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const goToPage = page => {
    setCurrentPage(page);
    setCurrentButtonGroup(Math.floor((page - 1) / buttonsPerPage));
  };

  const renderPageButtons = () => {
    const startPage = currentButtonGroup * buttonsPerPage + 1;
    const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);
    let btns = [];
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      const buttonClass = isActive ? "page-button active" : "page-button";
      btns.push(
        <button
          key={i}
          className={buttonClass}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return btns;
  };
  
  const data = contentData[currentPage] || defaultData(currentPage);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="box fade-in" key={currentPage}>
          <img
            src={data.img}
            alt={`페이지 ${currentPage} 이미지`}
            className="image"
          />
          <h1>{data.title}</h1>
          <p>{data.text}</p>
        </div>
      </div>
      <div className="pagination">
        <button
          className="arrow-button"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          ≪
        </button>
        <button
          className="arrow-button"
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {renderPageButtons()}
        <button
          className="arrow-button"
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
        <button
          className="arrow-button"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          ≫
        </button>
      </div>
    </div>
  );
}

export default Congratulation;