document.addEventListener('DOMContentLoaded', () => {
    const batchForm = document.getElementById('batch-form');
    const messageElement = document.getElementById('message');
    const workplaceInput = document.getElementById('workplace');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const API_BASE_URL = 'http://localhost:8080/api';

    // ログインユーザーIDを取得
const loggedInUser = sessionStorage.getItem('loginUser');    
    if (!loggedInUser) {
        alert('ログインしてください。');
        window.location.href = 'Login.html';
        return;
    }

    // --- ページロード時に現在の連絡先情報をAPIから取得してフォームに表示 ---
    async function loadCurrentData() {
        try {
            // 現状、一括登録APIにはユーザーIDを指定してデータを取得するGETエンドポイントがないため、
            // 暫定的に「一覧表示API」を呼び出し、自ユーザーの情報をフィルタリングして表示します。
            const response = await fetch(`${API_BASE_URL}/attendance/list`);
            if (response.ok) {
                const data = await response.json();
                const currentUser = data.find(item => item.userId === loggedInUser);
                
                if (currentUser) {
                    workplaceInput.value = currentUser.workplace || '';
                    phoneInput.value = currentUser.phone || '';
                    emailInput.value = currentUser.email || '';
                }
            }
        } catch (error) {
            console.error('データ取得エラー:', error);
            // エラー時も登録はできるようにするため、メッセージは出さない
        }
    }
    loadCurrentData();

    // --- 一括登録のフォーム送信処理 ---
    batchForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        messageElement.textContent = '';
        
        const workplace = workplaceInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/attendance/batch`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: loggedInUser,
                    workplace: workplace,
                    phone: phone,
                    email: email
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                messageElement.textContent = '勤務先・連絡先の一括登録が完了しました。';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = data.message || '登録処理中にエラーが発生しました。';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error('通信エラー:', error);
            messageElement.textContent = 'サーバーとの通信に失敗しました。';
            messageElement.style.color = 'red';
        }
    });
});