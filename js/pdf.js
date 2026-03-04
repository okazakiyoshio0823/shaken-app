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

        // 【最強の白紙化対策 v3】
        // モーダル等特有の「overflow: hidden」や「max-height」などのCSS制限を一切受けないよう、
        // 独立した専用コンテナを作成し、対象要素のHTMLのみをコピーします。
        const renderContainer = document.createElement('div');
        renderContainer.id = 'pdf-render-container';
        // HTML2Canvasから確実に「画面内で可視状態にある」と判定させるため左上に配置しつつ、
        // ユーザーからは見えないよう z-index でアプリの裏側に隠します。
        renderContainer.style.position = 'absolute';
        renderContainer.style.top = '0';
        renderContainer.style.left = '0';
        renderContainer.style.width = '794px'; // A4相当
        renderContainer.style.minHeight = '1123px'; // 最低でもA4・1枚分の高さを確保
        renderContainer.style.background = '#fff';
        renderContainer.style.zIndex = '-9999';
        // overflow は確実に visible
        renderContainer.style.overflow = 'visible';

        // プレビューの中身を完全にコピー
        // 元のDOMからHTML文字列として複製するため、既存のDOMへの変更は一切及ぼしません
        renderContainer.innerHTML = element.innerHTML;
        document.body.appendChild(renderContainer);

        // 各ページのマージンをリセットし、高さやoverflowの制限を完全に解除
        const pages = renderContainer.querySelectorAll('.print-page');
        pages.forEach(page => {
            page.style.margin = '0';
            page.style.padding = '0';
            page.style.boxSizing = 'border-box';
            page.style.maxHeight = 'none';
            page.style.overflow = 'visible';
            page.style.height = 'auto';
            page.style.pageBreakAfter = 'always';
        });

        // プレビュー全体を囲むコンテナがあればそれも制限解除
        const printPreview = renderContainer.querySelector('#printPreview');
        if (printPreview) {
            printPreview.style.maxHeight = 'none';
            printPreview.style.overflow = 'visible';
            printPreview.style.height = 'auto';
            printPreview.style.boxShadow = 'none';
            printPreview.style.margin = '0';
        }

        // html2pdfのオプション
        const opt = {
            margin: 0,
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,           // 高画質化
                useCORS: true,      // 外部画像許可
                logging: false,     // ログ出力
                windowWidth: 794,   // 固定幅
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // PDFを生成してダウンロード
        html2pdf().set(opt).from(renderContainer).save().then(() => {
            console.log('PDF保存完了:', filename);
            renderContainer.remove(); // 一時コンテナを削除

            if (userName) {
                alert(`PDF保存しました！\n\n📁 ファイル名: ${filename}.pdf\n\n💡 ヒント: ダウンロードフォルダから\n「車検見積りデータ」フォルダに移動すると整理しやすくなります。`);
            }
        }).catch(err => {
            console.error('PDF生成エラー:', err);
            renderContainer.remove(); // 一時コンテナを削除
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
