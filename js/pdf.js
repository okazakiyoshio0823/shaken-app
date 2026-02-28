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

        // プレビューコンテンツを取得（既存のDOMを直接キャプチャする）
        const element = document.getElementById('previewContent');

        if (!element || !element.innerHTML) {
            alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
            return;
        }

        // html2pdfのオプション
        const opt = {
            margin: 0, // マージンはゼロ（CSS側のpadding: 40pxにすべて任せる）
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 794, // キャプチャの横幅をA4相当(794px)に固定
                onclone: function (clonedDoc) {
                    // PDF生成用のクローンDOM内で、画面の中央表示用に使われている margin: 0 auto; などの
                    // 余分なレイアウト設定を強制解除し、A4用紙枠を原点(0, 0)にビタ止めさせる

                    // 1. 各ページ（.print-page）のマージンをリセット
                    const pages = clonedDoc.querySelectorAll('.print-page');
                    pages.forEach(page => {
                        page.style.margin = '0';
                        page.style.boxSizing = 'border-box';
                    });

                    // 2. プレビュー自体のマージンをリセット
                    const preview = clonedDoc.getElementById('printPreview');
                    if (preview) {
                        preview.style.margin = '0';
                        preview.style.padding = '0';
                    }

                    // 3. body自体の余白も完全にゼロにし、flexやセンタリングを解除
                    clonedDoc.body.style.margin = '0';
                    clonedDoc.body.style.padding = '0';
                    clonedDoc.body.style.display = 'block';

                    // 4. モーダル等の影響を排除するため、親ノードを遡ってマージンとパディングを無効化
                    let parent = clonedDoc.getElementById('previewContent').parentElement;
                    while (parent && parent !== clonedDoc.body) {
                        parent.style.margin = '0';
                        parent.style.padding = '0';
                        parent.style.display = 'block';
                        parent.style.position = 'static';
                        parent.style.transform = 'none';
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
                mode: ['avoid-all', 'css', 'legacy']
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
            // フォールバック: 印刷ダイアログを開く
            window.print();
        });

    } catch (error) {
        console.error('PDF生成処理エラー:', error);
        alert('PDF生成でエラーが発生しました。ブラウザの印刷機能をお試しください。');
        // フォールバック: 印刷ダイアログを開く
        window.print();
    }
}
