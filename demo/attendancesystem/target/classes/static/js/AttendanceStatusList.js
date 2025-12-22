document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('attendance-table-body');
    const API_BASE_URL = 'http://localhost:8080/api';
    
    // APIから勤怠データを取得し、テーブルを描画する関数
    async function fetchAndRenderTable() {
        if (!tableBody) return;

        try {
            const response = await fetch(`${API_BASE_URL}/attendance/list`);
            
            if (!response.ok) {
                throw new Error(`APIアクセスエラー: ${response.status}`);
            }

            const attendanceData = await response.json();
            
            renderTable(attendanceData);

        } catch (error) {
            console.error('勤怠データ取得エラー:', error);
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: red;">勤怠データロード中にエラーが発生しました。</td></tr>';
        }
    }
    
    // テーブル描画ロジック (変更なし)
    function renderTable(data) {
        tableBody.innerHTML = ''; 
        let rowCount = 0;
        
        // データを氏名順などでソートする場合はここで処理します。
        
        data.forEach((item, index) => {
            // 勤怠データ行の描画
            rowCount++;
            const row = tableBody.insertRow();
            
            // データベースのフィールド名 (userId, name, status, workplace, ...) にアクセス
            const fields = [
                rowCount, 
                item.name || 'N/A', 
                item.status || 'N/A', 
                item.workplace || '—', 
                item.phone || '—', 
                item.email || '—', 
                item.checkInTime || '—', 
                item.checkOutTime || '—'
            ];
            
            fields.forEach((field, i) => {
                const cell = row.insertCell();
                cell.textContent = field;
                if (i === 0 || i === 1) {
                     cell.style.textAlign = 'left';
                     cell.style.paddingLeft = '15px';
                }
            });
        });

        // データベースに登録されていないダミーの波線行を再現するために、
        // 取得したデータ行の後に手動で追加します（例として3行目と5行目）
        if (data.length < 3) {
             addWaveRow(); // データが少ない場合にのみ追加
        }
    }

    function addWaveRow() {
        const waveRow = tableBody.insertRow();
        for (let i = 0; i < 8; i++) {
            const cell = waveRow.insertCell();
            cell.textContent = '〜';
            cell.style.textAlign = 'center';
        }
    }

    fetchAndRenderTable();
});