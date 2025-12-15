document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    loginForm.addEventListener('submit', (e) => {
        // デフォルトのフォーム送信を防ぐ
        e.preventDefault();

        // フォームの値を取得
        const id = document.getElementById('id').value;
        const password = document.getElementById('password').value;

        // 簡単な検証と処理
        if (id && password) {
            // ここに実際の認証処理（サーバーへの送信など）を記述
            alert(`ID: ${id} でログインを試みます。`);
            messageElement.textContent = 'ログイン処理を実行しました。';
            // 実際のページ遷移を行う場合は、window.location.href = '...'; など
        } else {
            messageElement.textContent = 'IDとパスワードを入力してください。';
        }
    });

    // 再発行ボタンのクリックイベント（例）
    const reissueButton = document.querySelector('.btn-secondary');
    reissueButton.addEventListener('click', () => {
        alert('IDまたはパスワードの再発行画面へ遷移します。');
    });
});