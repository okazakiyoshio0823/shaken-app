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

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // html2pdfライブラリが読み込まれているかチェック
    if (typeof html2pdf === 'undefined') {
        alert('エラー: PDF生成ライブラリ(html2pdf)が読み込まれていません。\nインターネット接続を確認してください。');
        return;
    }

    html2pdf().set(opt).from(element).save().then(() => {
        console.log('PDF generated:', filename);
        // 保存完了後にアラートを出す（任意）
        setTimeout(() => alert('✅ PDFをダウンロードしました'), 1000);
    }).catch(err => {
        console.error('PDF error:', err);
        alert('PDFの生成に失敗しました: ' + err.message);
    });
}
