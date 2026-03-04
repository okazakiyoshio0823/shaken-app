// PDF出力
function generatePDF() {
    try {
        // 使用者名を取得
        const userName = document.getElementById('userName')?.value || '';
        const plateSerial = document.getElementById('plateSerial')?.value || '';
        const today = new Date();
        const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

        // ファイル名を作成: [日付]_[使用者名]_車検見積書.pdf
        let filename = `${dateStr}_車検見積書`;
        if (userName) {
            filename = `${dateStr}_${userName}_車検見積書`;
        } else if (plateSerial) {
            filename = `${dateStr}_${plateSerial}_車検見積書`;
        }

        // 【最重要修正】モーダル全体ではなく、余白のない純粋なA4プレビュー領域（printPreview）を直接対象にする
        // これにより親要素のpadding分がキャプチャに巻き込まれて「左にズレて右が切れる」現象を完全に防ぎます。
        const element = document.getElementById('printPreview');

        if (!element || !element.innerHTML) {
            alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
            return;
        }

        // html2pdfのオプション（ズレのない完全フィット設定）
        const opt = {
            margin: [0, 10, 0, 10], // 上下0、左右10mmのマージンを設定して、PDFの「ど真ん中」に配置して左見切れを防ぐ
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
                    target.style.width = '794px';       // A4横幅に強制固定
                    target.style.maxWidth = '794px';

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

        // PDFを生成してダウンロード
        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF保存完了:', filename);

            if (userName) {
                alert(`PDF保存しました！\n\n📁 ファイル名: ${filename}.pdf\n\n💡 ヒント: ダウンロードフォルダから\n「車検見積りデータ」フォルダに移動すると整理しやすくなります。`);
            }
        }).catch(err => {
            console.error('PDF生成エラー:', err);

            alert('PDF生成に失敗しました。ブラウザの印刷機能をお試しください。');
            window.print();
        });

    } catch (error) {
        console.error('PDF生成処理エラー:', error);
        alert('PDF生成でエラーが発生しました。ブラウザの印刷機能をお試しください。');
        // フォールバック: 印刷ダイアログを開く
        window.print();
    }
}
