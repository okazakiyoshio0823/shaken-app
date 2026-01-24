// PDF出力
function generatePDF() {
    const element = document.getElementById('printPreview');
    if (!element) {
        showPreview();
        setTimeout(generatePDF, 100);
        return;
    }

    const customerName = document.getElementById('userName').value || 'お客様';
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const filename = `車検見積書_${customerName}_${dateStr}.pdf`;

    // PDF生成（ブラウザの印刷機能を使用）
    // printメディアクエリでプレビューのみ表示されるように制御
    window.print();
}
