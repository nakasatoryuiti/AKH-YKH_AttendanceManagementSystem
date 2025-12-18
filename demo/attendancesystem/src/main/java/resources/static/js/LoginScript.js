document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const API_BASE_URL = 'http://localhost:8080/api';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: username, 
                    password: password 
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // 認証成功: サーバーから返されたuserIdを保存
                sessionStorage.setItem('loggedInUser', data.userId); 
                console.log(`ログイン成功: ${data.name}`);
                window.location.href = 'WorkInput.html';
            } else {
                // 認証失敗 (401 Unauthorized または success: false)
                errorMessage.textContent = data.message || 'ログインに失敗しました。';
                passwordInput.value = '';
                passwordInput.focus();
            }

        } catch (error) {
            console.error('通信エラー:', error);
            errorMessage.textContent = 'サーバーとの通信に失敗しました。';
        }
    });
});