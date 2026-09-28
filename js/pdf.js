// PDFのファイル名（拡張子なし）: 2026-09-28_品川500あ1234_山田太郎様_車検見積書
// ナンバー・名前は入っているものだけ付ける。書類名は見積書／請求書／領収書の切り替えに合わせる
function getEstimatePdfFilename() {
    const userName = (document.getElementById('userName')?.value || '').replace(/\s+/g, '');
    const plate = getPlateNumber();
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const parts = [dateStr];
    if (plate !== '-') parts.push(plate.replace(/\s+/g, ''));
    if (userName) parts.push(`${userName}様`);
    parts.push(getDocumentTypeInfo().title);
    return toSafeFileName(parts.join('_'));
}

// プレビュー（printPreview）からPDFのBlobを作る。LINEでファイルを送るときに使う
function createEstimatePdfBlob() {
    const element = document.getElementById('printPreview');
    if (!element || !element.innerHTML) return Promise.reject(new Error('プレビューがありません'));
    return html2pdf().set(getEstimatePdfOptions(getEstimatePdfFilename())).from(element).outputPdf('blob');
}

// PDF出力。保存フォルダ（車検データ\見積書PDF\年）があればそこへ、無ければダウンロードに保存する
async function generatePDF() {
    if (typeof validateLegalFees === 'function' && !validateLegalFees()) return; // 法定費用のバリデーション

    // 【最重要修正】モーダル全体ではなく、余白のない純粋なA4プレビュー領域（printPreview）を直接対象にする
    // これにより親要素のpadding分がキャプチャに巻き込まれて「左にズレて右が切れる」現象を完全に防ぎます。
    const element = document.getElementById('printPreview');

    if (!element || !element.innerHTML) {
        alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
        return;
    }

    // フォルダの許可はボタンを押した直後でないと求められないため、PDFを作る前に確かめる
    let folder = await getDataFolder(true);
    if (!folder && hasDataFolderSupport() && !(await loadDataFolderHandle())) {
        if (confirm('PDFの保存先がまだ決まっていません。\n\n次の画面で、デスクトップの「車検データ」フォルダを選んでください。\n（キャンセルすると「ダウンロード」に保存します）')) {
            folder = await chooseDataFolder();
        }
    }

    try {
        const filename = getEstimatePdfFilename();
        const blob = await html2pdf().set(getEstimatePdfOptions(filename)).from(element).outputPdf('blob');
        const year = String(new Date().getFullYear());
        const result = await saveToDataFolderOrDownload(folder, ['見積書PDF', year], filename + '.pdf', blob);

        const where = result.where === 'folder' ? result.path : `ダウンロード\\${result.path}`;
        alert(`PDFを保存しました。\n\n📁 ${where}`);

    } catch (error) {
        console.error('PDF生成エラー:', error);
        alert('PDF生成に失敗しました。ブラウザの印刷機能をお試しください。');
        // フォールバック: 印刷ダイアログを開く
        window.print();
    }
}

// html2pdfのオプション（ズレのない完全フィット設定）
function getEstimatePdfOptions(filename) {
    return {
        margin: 0, // A4マッピング時の右端切れを防ぐため0に設定し、CSSの内側余白(padding)として全体を描画させる
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 1.0 }, // 高画質化
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            scrollX: 0,       // ブラウザの横スクロールによる「左側見切れ」を防止
            scrollY: 0,       // ブラウザの縦スクロールによる上ズレを防止
            onclone: function (clonedDoc) {
                // クローンされたDOM内で、キャプチャ対象を再度取得
                const target = clonedDoc.getElementById('printPreview');
                if (!target) return;

                // 1. キャプチャ対象自体のセンタリングや不確定な余白を完全リセットして左寄せ固定
                // ※これをしないとhtml2canvasが「画面中央にある」と誤認してX座標をズラしてしまう
                target.style.margin = '0';
                target.style.padding = '0';
                target.style.width = '800px';       // 右端切れ防止のためA4ジャスト(794)より数ピクセル余裕を持たせる
                target.style.maxWidth = '800px';

                // 2. 内部の各ページのセンタリング（margin: 0 auto）も強制解除
                const pages = target.querySelectorAll('.print-page');
                pages.forEach(page => {
                    page.style.margin = '0';
                });

                // 3. 最重要：親要素（モーダルの枠など）が持つ見えないPaddingやMarginを完全に剥ぎ取る
                let parent = target.parentElement;
                while (parent && parent !== clonedDoc.body) {
                    parent.style.margin = '0';
                    parent.style.padding = '0';
                    parent.style.border = 'none';
                    parent.style.transform = 'none';
                    parent.style.position = 'static';
                    parent.style.overflow = 'visible';
                    parent = parent.parentElement;
                }
            }
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        pagebreak: {
            mode: ['css', 'legacy']
        }
    };
}

// A4印刷（ブラウザの印刷機能でA4縦にそのまま出力）
// 印刷レイアウトは index.html の @media print / @page size:A4 portrait が担当
function printEstimate() {
    const element = document.getElementById('printPreview');

    if (!element || !element.innerHTML) {
        alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
        return;
    }

    window.print();
}
