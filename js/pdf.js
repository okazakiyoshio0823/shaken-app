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
                    // DOM構造を改変（appendChild等）するとhtml2canvasがクラッシュし、
                    // エラーフォールバックとしてブラウザ標準の印刷画面が開いてしまうため、
                    // クローンされたDOMの色付けや非表示（CSS制御）のみに留める最も安全なハック。

                    const target = clonedDoc.getElementById('previewContent');
                    if (!target) return;

                    // 1. 各ページ（.print-page）の余計なマージンをリセット
                    const pages = target.querySelectorAll('.print-page');
                    pages.forEach(page => {
                        page.style.margin = '0';
                        page.style.boxSizing = 'border-box';
                    });

                    // 2. プレビュー領域（#printPreview）自体のマージンをリセットし、
                    // html2canvasに「余白」を誤認されないよう強制的に左上(0,0)に固定する
                    const preview = target.querySelector('#printPreview') || target;
                    preview.style.margin = '0';
                    preview.style.padding = '0';
                    preview.style.position = 'absolute';
                    preview.style.top = '0';
                    preview.style.left = '0';
                    preview.style.width = '794px';
                    preview.style.background = '#fff';

                    // 3. クラッシュを避けるためDOM階層はそのまま維持し、
                    // プレビュー内容「以外」のすべての要素をCSSで不可視化する
                    clonedDoc.body.style.margin = '0';
                    clonedDoc.body.style.padding = '0';
                    clonedDoc.body.style.background = '#fff';

                    // モーダルの黒背景やヘッダーなど、キャプチャの邪魔になるものを強制非表示
                    const hideTargets = clonedDoc.querySelectorAll('body > *:not(#previewModal), #previewModal > *:not(.modal-content), .modal-content > *:not(#previewContent), .app-container');
                    hideTargets.forEach(el => {
                        if (el && el.style) el.style.display = 'none';
                    });

                    // 親階層のスクロール等による見切れを防ぐため一律リセット
                    let parent = target.parentElement;
                    while (parent && parent !== clonedDoc.body) {
                        parent.style.margin = '0';
                        parent.style.padding = '0';
                        parent.style.position = 'static';
                        parent.style.display = 'block';
                        parent.style.height = 'auto';
                        parent.style.maxHeight = 'none';
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
