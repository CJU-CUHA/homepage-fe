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
