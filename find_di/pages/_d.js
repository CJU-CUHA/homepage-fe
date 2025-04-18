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

const ctfLink = document.getElementById('ctfLink');
const container = document.getElementById('ctf-data');

ctfLink.addEventListener('click', function (event) {
  event.preventDefault(); 

  fetch('/pages/ctftime.json') 
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답 오류!');
      }
      return response.json();
    })
    .then(data => {
      container.innerHTML = ''; 

      data.forEach(item => {
        const el = document.createElement('div');
        el.classList.add('ctf-item');
        el.innerHTML = `
          <h3>${item.name}</h3>
          <p><strong>시작:</strong> ${item.start}</p>
          <p><strong>종료:</strong> ${item.finish}</p>
          <p><strong>점수:</strong> ${item.weight}</p>
          <a href="${item.url}" target="_blank">대회 바로가기</a>
        `;
        container.appendChild(el);
      });
    })
    .catch(error => {
      container.innerHTML = `<p style="color:red;">에러 발생: ${error.message}</p>`;
    });
});
