document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const messageElement = document.getElementById('message');

    // 1. 現在時刻をフォーマットして表示する関数
    function updateTime() {
        const now = new Date();
        
        // YYYY-MM-DD
        const date = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('-');

        // hh:mm:ss
        const time = [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join(':');

        // YYYY-MM-DDTkk:mm:ss 形式で表示
        // 'T' の後に時刻が続く形式は ISO 8601 の標準的な表現です。
        currentTimeElement.textContent = `${date}T${time}`;
    }

    // 1秒ごとに時刻を更新
    setInterval(updateTime, 1000);
    // 初回ロード時にも実行
    updateTime();

    // 2. 出勤ボタンのクリック処理
    checkInBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent;
        // ここに打刻データをサーバーに送信する処理を記述
        messageElement.textContent = `${timestamp} に出勤を登録しました。`;
        messageElement.style.color = 'green';
    });

    // 3. 退勤ボタンのクリック処理
    checkOutBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent;
        // ここに打刻データをサーバーに送信する処理を記述
        messageElement.textContent = `${timestamp} に退勤を登録しました。`;
        messageElement.style.color = 'blue';
    });
});