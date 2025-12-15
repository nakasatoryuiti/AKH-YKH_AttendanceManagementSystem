document.addEventListener('DOMContentLoaded', () => {
    const batchForm = document.getElementById('batch-form');
    const messageElement = document.getElementById('message');

    batchForm.addEventListener('submit', (e) => {
        // e.preventDefault(); はブラウザのネイティブ検証が失敗した場合、
        // そもそも実行されないため、ここでは削除または条件付きで残すのが一般的です。

        // ネイティブ検証をパスした場合、このブロックが実行される

        // フォームが送信されるのを一旦止め、非同期処理を想定した処理を行います
        e.preventDefault(); 
        
        // 値は取得できますが、検証ロジックはHTMLに任せます。
        const workplace = document.getElementById('workplace').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        // 実際の登録処理（APIコールなど）をここに記述
        console.log(`登録データ: ${workplace}, ${phone}, ${email}`);
        
        // 登録完了メッセージ
        messageElement.textContent = '勤務先・連絡先の一括登録が完了しました。';
        messageElement.style.color = 'green';
        
        // フォームのリセット（任意）
        // batchForm.reset(); 
    });
});