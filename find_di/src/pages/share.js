document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");
    const postsDiv = document.getElementById("posts");
    const searchInput = document.getElementById("searchInput");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    function renderPosts(postArray) {
        postsDiv.innerHTML = "";
        postArray.forEach(post => {
            const postEl = document.createElement("div");
            postEl.className = "post";
            postEl.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button class="delete-button" data-id="${post.id}">삭제</button>
            `;
            postsDiv.appendChild(postEl);
        });

        // 삭제 이벤트 등록
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                posts = posts.filter(p => p.id !== id);
                saveToLocalStorage();
                renderPosts(posts);
            });
        });
    }

    // 게시물 초기 로딩
    renderPosts(posts);

    // 게시물 작성
    postForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = postTitle.value.trim();
        const content = postContent.value.trim();

        if (title && content) {
            const post = {
                id: Date.now(),
                title,
                content
            };
            posts.unshift(post);
            saveToLocalStorage();
            renderPosts(posts);
            postTitle.value = "";
            postContent.value = "";
        }
    });

    // 검색 기능
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query)
        );
        renderPosts(filtered);
    });
});
