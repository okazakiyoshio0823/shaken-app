// PDF出力
function generatePDF() {
    const element = document.getElementById('printPreview');
    if (!element) {
        showPreview();
        setTimeout(generatePDF, 100);
        return;
    }

    const customerName = document.getElementById('customerName').value || 'お客様';
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

    html2pdf().set(opt).from(element).save().then(() => {
        console.log('PDF generated:', filename);
    }).catch(err => {
        console.error('PDF error:', err);
        alert('PDFの生成に失敗しました');
    });
}
