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

        // プレビューコンテンツを取得
        const element = document.getElementById('previewContent');

        if (!element || !element.innerHTML) {
            alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
            return;
        }

        // html2pdfのオプション（ズレのない完全フィット設定）
        const opt = {
            margin: 0,
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 794, // 過去の1024枠指定だと左側余白分がズレる原因になるため、A4ジャスト幅に完全固定
                scrollX: 0,       // ブラウザの横スクロールによる「左側見切れ」を完全防止
                scrollY: 0,       // ブラウザの縦スクロールによる上ズレを防止
                onclone: function (clonedDoc) {
                    const target = clonedDoc.getElementById('previewContent');
                    if (!target) return;

                    // 1. 各ページのセンタリング（margin: 0 auto）を強制解除
                    // これが残っているとhtml2canvasが左側の余白(マージン)ごとキャプチャしてしまい、右にズレて左が切れる原因になる
                    const printPreview = target.querySelector('#printPreview');
                    const pages = target.querySelectorAll('.print-page');

                    if (printPreview) {
                        printPreview.style.margin = '0';
                        printPreview.style.maxWidth = '794px';
                        printPreview.style.width = '794px';
                    }

                    pages.forEach(page => {
                        page.style.margin = '0';
                    });

                    // 2. モーダル等の親要素による目に見えないパディングやTransformのズレをすべて排除
                    let parent = target.parentElement;
                    while (parent && parent !== clonedDoc.body) {
                        parent.style.margin = '0';
                        parent.style.padding = '0';
                        parent.style.transform = 'none';
                        parent.style.border = 'none';
                        // overflowを解除して、はみ出しによる見切れを防ぐ
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
