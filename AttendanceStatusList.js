document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('attendance-table-body');
    
    // localStorageから最新の勤怠データを取得
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    
    if (tableBody) {
        renderTable(attendanceData);
    }
    
    function renderTable(data) {
        tableBody.innerHTML = ''; 
        let rowCount = 0;
        
        data.forEach((item, index) => {
            // 波線行 (〜) の描画
            if (!item.id) {
                const waveRow = tableBody.insertRow();
                for (let i = 0; i < 8; i++) {
                    waveRow.insertCell().textContent = '〜';
                }
                return;
            }
            
            // 勤怠データ行の描画
            rowCount++;
            const row = tableBody.insertRow();
            
            // No, 氏名, 出勤, 勤務場所, 電話番号, メールアドレス, 出勤時刻, 退勤時刻
            const fields = [
                rowCount, 
                item.name, 
                item.status, 
                item.workplace || '', 
                item.phone || '', 
                item.email || '', 
                item.checkInTime || '—', 
                item.checkOutTime || '—'
            ];
            
            fields.forEach((field, i) => {
                const cell = row.insertCell();
                cell.textContent = field;
                // Noと氏名のみ左寄せ
                if (i === 0 || i === 1) {
                     cell.style.textAlign = 'left';
                     cell.style.paddingLeft = '15px';
                }
            });
        });
        
        // 元画像に合わせた行数調整（ここでは単純な空行は省略し、波線行のみで完結させます）
    }
});