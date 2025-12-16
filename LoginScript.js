document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // 認証情報 (ID: 中里, Pass: 12345)
    const VALID_USERS = {
        '中里': { password: '12345', name: '中里龍一' },
        '佐藤': { password: '54321', name: '佐藤太郎' } 
    };

    // 初期勤怠データ（IDはログインIDと一致させる）
    const initialAttendanceData = [
        { id: '佐藤', name: '佐藤太郎', status: '出', workplace: '〇〇オフィス', phone: '123-456-789', email: 'AKBYKH123@〇〇.com', checkInTime: '9:00', checkOutTime: '—' },
        { id: '中里', name: '中里龍一', status: '退', workplace: '〇〇オフィス', phone: '333-456-789', email: 'NAKANAKA123@〇〇.com', checkInTime: '9:00', checkOutTime: '18:00' },
        // 空の行を再現するためのダミーデータ（No.3の空行を再現）
        { id: null, name: null, status: null, workplace: null, phone: null, email: null, checkInTime: null, checkOutTime: null },
    ];
    
    // 勤怠データがまだlocalStorageにない場合、初期化する
    if (!localStorage.getItem('attendanceData')) {
        localStorage.setItem('attendanceData', JSON.stringify(initialAttendanceData));
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        errorMessage.textContent = ''; 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const userAuth = VALID_USERS[username];

        if (userAuth && password === userAuth.password) {
            // 認証成功: ログインIDを session storage に保存
            sessionStorage.setItem('loggedInUser', username); 
            window.location.href = 'WorkInput.html';
        } else {
            // 認証失敗
            errorMessage.textContent = 'IDまたはパスワードが正しくありません。';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
});