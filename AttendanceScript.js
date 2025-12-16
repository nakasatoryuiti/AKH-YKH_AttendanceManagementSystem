document.addEventListener('DOMContentLoaded', () => {
    const batchForm = document.getElementById('batch-form');
    const messageElement = document.getElementById('message');
    const workplaceInput = document.getElementById('workplace');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // ログインユーザーIDを取得
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        alert('ログインしてください。');
        window.location.href = 'Login.html';
        return;
    }

    // --- ページロード時に現在の連絡先情報をフォームに表示 ---
    const currentData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const currentUser = currentData.find(item => item.id === loggedInUser);
    
    if (currentUser) {
        workplaceInput.value = currentUser.workplace || '';
        phoneInput.value = currentUser.phone || '';
        emailInput.value = currentUser.email || '';
    }

    batchForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // フォームの値を取得
        const workplace = workplaceInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        // --- localStorageの勤怠データを更新 ---
        const data = JSON.parse(localStorage.getItem('attendanceData') || '[]');
        const userIndex = data.findIndex(item => item.id === loggedInUser);
        
        if (userIndex !== -1) {
            // 連絡先・勤務場所情報を更新
            data[userIndex].workplace = workplace;
            data[userIndex].phone = phone;
            data[userIndex].email = email;
            
            // localStorageに書き戻す
            localStorage.setItem('attendanceData', JSON.stringify(data));
            
            messageElement.textContent = '勤務先・連絡先の一括登録が完了しました。';
            messageElement.style.color = 'green';
        } else {
             messageElement.textContent = 'エラー: ユーザーデータが見つかりません。';
             messageElement.style.color = 'red';
        }
    });
});