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
  