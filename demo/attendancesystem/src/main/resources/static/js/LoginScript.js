document.addEventListener('DOMContentLoaded', () => {
    // 新しいHTMLのID名「login-form」に合わせて取得
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // ページリロードを防止

            // HTMLの入力欄 ID「username」と「password」から値を取得
            const usernameValue = document.getElementById('username').value;
            const passwordValue = document.getElementById('password').value;

            // エラーメッセージを一旦クリア
            if (errorMessage) errorMessage.textContent = "";

            try {
                // JavaのAPI（LoginController）に送信
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Java側が get("id") で待ち受けているため、キー名は "id" にする
                    body: JSON.stringify({
                        id: usernameValue,
                        password: passwordValue
                    })
                });

                if (!response.ok) {
                    throw new Error('サーバー応答エラー');
                }

                const data = await response.json();

                // Javaからのレスポンス判定
                if (data.status === "success") {
                    // ログインユーザー情報を保存して画面遷移
                    sessionStorage.setItem('loginUser', usernameValue);
                    window.location.href = 'WorkInput.html';                            
                    } else {
                    // ログイン失敗時のメッセージ表示
                    if (errorMessage) {
                        errorMessage.textContent = "IDまたはパスワードが正しくありません。";
                    } else {
                        alert("IDまたはパスワードが正しくありません。");
                    }
                }

            } catch (error) {
                console.error('通信エラー:', error);
                if (errorMessage) {
                    errorMessage.textContent = "サーバーに接続できません。Javaを起動してください。";
                }
            }
        });
    }
});