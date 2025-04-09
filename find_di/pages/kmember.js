document.getElementById('signup-form').addEventListener('submit', function(event) {
    let isValid = true;

    // 아이디 유효성 검사
    const username = document.querySelector('input[name="username"]');
    const usernameError = document.getElementById('username-error');
    if (username.value.length < 5 || username.value.length > 20) {
        usernameError.textContent = '아이디는 5자 이상 20자 이하로 입력해주세요.';
        usernameError.style.display = 'block';
        isValid = false;
    } else {
        usernameError.style.display = 'none';
    }

    // 비밀번호 유효성 검사
    const password = document.querySelector('input[name="password"]');
    const passwordError = document.getElementById('password-error');
    if (password.value.length < 8 || password.value.length > 20) {
        passwordError.textContent = '비밀번호는 8자 이상 20자 이하로 입력해주세요.';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // 비밀번호 확인 유효성 검사
    const confirmPassword = document.querySelector('input[name="confirm-password"]');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }

    // 이메일 유효성 검사
    const email = document.querySelector('input[name="email"]');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = '유효한 이메일 주소를 입력해주세요.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // 유효성 검사 실패 시 폼 제출 방지
    if (!isValid) {
        event.preventDefault();
    }
});
