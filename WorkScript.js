document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const messageElement = document.getElementById('message');
    
    // ログインユーザーIDを取得
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        // ログインしていない場合、ログイン画面に戻る（または警告）
        alert('ログインしてください。');
        window.location.href = 'Login.html';
        return;
    }

    // (既存の時刻更新ロジックは省略せずに含めてください)
    function updateTime() {
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
    
    // 勤怠データを更新する関数
    function updateAttendanceStatus(status, checkInTime = null, checkOutTime = null) {
        // localStorageからデータを取得し、JSONとしてパース
        const data = JSON.parse(localStorage.getItem('attendanceData'));
        
        if (data) {
            // ログインユーザーのデータを見つける
            const userIndex = data.findIndex(item => item.id === loggedInUser);
            
            if (userIndex !== -1) {
                // ステータスを更新
                data[userIndex].status = status;
                
                if (checkInTime) {
                    data[userIndex].checkInTime = checkInTime;
                    data[userIndex].checkOutTime = '—'; // 出勤時は退勤時刻をリセット
                }
                if (checkOutTime) {
                    data[userIndex].checkOutTime = checkOutTime;
                }
                
                // localStorageに書き戻す
                localStorage.setItem('attendanceData', JSON.stringify(data));
            }
        }
    }

    // 出勤ボタンのクリック処理
    checkInBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent.substring(11, 16); // 時刻部分のみ (HH:MM)
        updateAttendanceStatus('出', timestamp);
        messageElement.textContent = `${currentTimeElement.textContent} に出勤を登録しました。`;
        messageElement.style.color = 'green';
    });

    // 退勤ボタンのクリック処理
    checkOutBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent.substring(11, 16); // 時刻部分のみ (HH:MM)
        updateAttendanceStatus('退', null, timestamp);
        messageElement.textContent = `${currentTimeElement.textContent} に退勤を登録しました。`;
        messageElement.style.color = 'blue';
    });
});