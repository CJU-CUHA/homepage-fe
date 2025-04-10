const pages = [
    { title: "페이지 1", content: "여기에 페이지 1의 내용이 들어갑니다.", image: "image1.jpg" },
    { title: "페이지 2", content: "여기에 페이지 2의 내용이 들어갑니다.", image: "image2.jpg" },
    { title: "페이지 3", content: "여기에 페이지 3의 내용이 들어갑니다.", image: "image3.jpg" }
];

const contentDiv = document.querySelector('.content');
const pageButtons = document.querySelectorAll('.page-button');

function loadPage(pageIndex) {
    const page = pages[pageIndex - 1];
    contentDiv.innerHTML = `
        <div class="box">
            <img src="${page.image}" alt="${page.title} 이미지" class="image">
            <h1>${page.title}</h1>
            <p>${page.content}</p>
        </div>
    `;
}

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageIndex = parseInt(button.getAttribute('data-page'));
        loadPage(pageIndex);
    });
});

// 초기 페이지 로드
loadPage(1);
