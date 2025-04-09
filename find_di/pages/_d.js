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
  
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    updateAuthText();
  
    authToggle.addEventListener("click", function (e) {
      e.preventDefault(); 
  
      if (isLoggedIn) {
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
      } else {
        isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
      }
  
      updateAuthText();
    });
  
    function updateAuthText() {
      authToggle.textContent = isLoggedIn ? "로그아웃" : "로그인";
    }
  });
  