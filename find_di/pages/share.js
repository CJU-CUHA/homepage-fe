// 게시물 로드 함수
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        addPostToDOM(post.title, post.content);
    });
}

// 게시물 추가 함수
function addPostToDOM(title, content) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <button class="delete-button">삭제</button>
    `;

    // 삭제 버튼 클릭 시 게시물 삭제
    postDiv.querySelector('.delete-button').addEventListener('click', function() {
        postDiv.remove();
        deletePostFromLocalStorage(title); // 로컬 스토리지에서 삭제
    });

    // 게시물 추가
    document.getElementById('posts').appendChild(postDiv);
}

// 로컬 스토리지에서 게시물 삭제 함수
function deletePostFromLocalStorage(title) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.filter(post => post.title !== title);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
}

// 폼 제출 이벤트 리스너
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // 게시물 저장
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title, content });
    localStorage.setItem('posts', JSON.stringify(posts));

    // 게시물 추가
    addPostToDOM(title, content);

    // 입력 필드 초기화
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
});

// 페이지 로드 시 게시물 불러오기
loadPosts();
