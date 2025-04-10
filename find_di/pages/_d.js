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

  document.addEventListener("DOMContentLoaded", function () {
    const authToggle = document.getElementById("authToggle");
  
    let isLoggedIn = false;
  
    authToggle.addEventListener("click", function (e) {
      e.preventDefault(); //링크 이동x
  
      isLoggedIn = !isLoggedIn;
  
      if (isLoggedIn) {
        authToggle.textContent = "로그아웃";
      } else {
        authToggle.textContent = "로그인";
      }
    });
  });
  

document.addEventListener("DOMContentLoaded", () => {
  const authToggle = document.getElementById("authToggle");

  
  if (localStorage.getItem("isLoggedIn") === "true") {
    authToggle.textContent = "로그아웃";
    authToggle.href = "#"; 

    authToggle.addEventListener("click", (e) => {
      e.preventDefault()

      localStorage.removeItem("isLoggedIn");
      
      window.location.href = "index.html";
    });
  }
});
