document.querySelector('.click-me').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'block';
});

document.getElementById('closemodal').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", () => {
const authToggle = document.getElementById("authToggle");

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn) {
  authToggle.textContent = "로그아웃";
  authToggle.href = "#";
  authToggle.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    
    window.location.href = "index.html";
  });
} else {
  authToggle.textContent = "로그인";
  authToggle.href = "klogin.html";
}
});

document.getElementById('ctfLink').addEventListener('click', async (event) => {
  event.preventDefault(); 

  const ctfDataContainer = document.getElementById('ctf-data');
  ctfDataContainer.innerHTML = '<p>로딩 중...</p>'; 

  const url = 'http://cuha.cju.ac.kr:10001/api/api/ctftime'; 

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('네트워크 오류');
      }
      const data = await response.json();

      
      ctfDataContainer.innerHTML = ''; 
      if (data.length > 0) {
          data.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.className = 'ctf-item';
              itemDiv.innerHTML = `
                  <h2>${item.title}</h2>
                  <p>${item.description}</p>
                  <p>날짜: ${item.date}</p>
              `;
              ctfDataContainer.appendChild(itemDiv);
          });
      } else {
          ctfDataContainer.innerHTML = '<p>CTF 정보를 불러올 수 없습니다.</p>';
      }
  } catch (error) {
      ctfDataContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
});
