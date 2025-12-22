document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const messageElement = document.getElementById('message');
    const API_BASE_URL = 'http://localhost:8080/api';
    
    // ログインユーザーIDを取得
    // 修正：ログイン時に保存したキー名 'loginUser' に合わせる
const loggedInUser = sessionStorage.getItem('loginUser'); 

    if (!loggedInUser) {
        alert('ログインしてください。');
        window.location.href = 'Login.html';
        return;
    }

    // 時刻表示ロジック (変更なし)
    function updateTime() {
        // ... (省略: 以前のupdateTime関数をそのまま使用)
        const now = new Date();
        const date = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('-');
        const time = [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join(':');
        currentTimeElement.textContent = `${date}T${time}`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 打刻APIを呼び出す共通関数
    async function callPunchApi(type) {
        const fullTime = currentTimeElement.textContent;
        const time = fullTime.substring(11, 16); // 時刻部分 (HH:MM)

        try {
            const response = await fetch(`${API_BASE_URL}/attendance/punch`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: loggedInUser,
                    type: type, // "IN" or "OUT"
                    time: time
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                const action = type === 'IN' ? '出勤' : '退勤';
                messageElement.textContent = `${fullTime} に ${action} を登録しました。`;
                messageElement.style.color = type === 'IN' ? 'green' : 'blue';
            } else {
                messageElement.textContent = data.message || '打刻処理中にエラーが発生しました。';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error('通信エラー:', error);
            messageElement.textContent = 'サーバーとの通信に失敗しました。';
            messageElement.style.color = 'red';
        }
    }

    checkInBtn.addEventListener('click', () => callPunchApi('IN'));
    checkOutBtn.addEventListener('click', () => callPunchApi('OUT'));
});