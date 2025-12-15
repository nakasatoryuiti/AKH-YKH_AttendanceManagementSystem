document.addEventListener('DOMContentLoaded', () => {
    // --- 1. タブ切り替え機能 ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTabId = e.target.dataset.tab;

            // すべてのタブの active クラスを削除
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // クリックされたタブと対応するコンテンツに active クラスを追加
            e.target.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
            
            // メッセージをクリア
            document.getElementById('message').textContent = '';
        });
    });

    // --- 2. 勤務入力タブの機能 ---
    const currentTimeElement = document.getElementById('current-time');
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');
    const messageElement = document.getElementById('message');

    // 現在時刻をフォーマットして表示する関数
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

    // 1秒ごとに時刻を更新
    setInterval(updateTime, 1000);
    updateTime();

    // 出勤ボタンのクリック処理
    checkInBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent;
        messageElement.textContent = `${timestamp} に出勤を登録しました。`;
        messageElement.style.color = 'green';
    });

    // 退勤ボタンのクリック処理
    checkOutBtn.addEventListener('click', () => {
        const timestamp = currentTimeElement.textContent;
        messageElement.textContent = `${timestamp} に退勤を登録しました。`;
        messageElement.style.color = 'blue';
    });

    // --- 3. 一括登録タブの機能 ---
    const batchForm = document.getElementById('batch-form');

    batchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const workplace = document.getElementById('workplace').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (workplace || phone || email) {
            messageElement.textContent = '勤務先・連絡先の一括登録が完了しました。';
            messageElement.style.color = 'green';
            // フォームのリセット (任意)
            // batchForm.reset(); 
        } else {
            messageElement.textContent = '少なくとも一つの項目を入力してください。';
            messageElement.style.color = 'red';
        }
    });
});