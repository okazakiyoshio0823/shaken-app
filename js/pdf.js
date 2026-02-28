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
        const sourceElement = document.getElementById('previewContent');

        if (!sourceElement || !sourceElement.innerHTML) {
            alert('プレビュー内容が見つかりません。先にプレビューを表示してください。');
            return;
        }

        // 既存のモーダル内のDOMをそのままキャプチャすると画面上のセンタリングや
        // Bootstrap、フレックスボックスの余白などをhtml2canvasが巻き込んで
        // レイアウト崩れ（右切れ・謎の左マージン）を引き起こすため、
        // 完全にクリーンな「A4サイズ(794px)の透明な仮想コンテナ」を作ってキャプチャさせる。
        const pdfContainer = document.createElement('div');
        pdfContainer.style.position = 'absolute';
        pdfContainer.style.top = '0px';
        pdfContainer.style.left = '0px';
        pdfContainer.style.zIndex = '999999'; // 画面の最前面に一時的に表示して確実に撮影させる
        pdfContainer.style.width = '794px'; // 96dpiでのA4横幅の近似値に完全固定
        pdfContainer.style.backgroundColor = '#ffffff';
        pdfContainer.style.margin = '0';
        pdfContainer.style.padding = '0';

        // プレビューの内容をコピー
        pdfContainer.innerHTML = sourceElement.innerHTML;
        document.body.appendChild(pdfContainer);

        // html2pdfのオプション
        const opt = {
            margin: 0, // 余計なマージンは作らずCSSのpaddingに任せる
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 794 // キャプチャ幅をA4相当に固定
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
        html2pdf().set(opt).from(pdfContainer).save().then(() => {
            console.log('PDF保存完了:', filename);
            document.body.removeChild(pdfContainer); // 仮想コンテナをお片付け

            if (userName) {
                alert(`PDF保存しました！\n\n📁 ファイル名: ${filename}.pdf\n\n💡 ヒント: ダウンロードフォルダから\n「車検見積りデータ」フォルダに移動すると整理しやすくなります。`);
            }
        }).catch(err => {
            console.error('PDF生成エラー:', err);
            if (document.body.contains(pdfContainer)) {
                document.body.removeChild(pdfContainer);
            }
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
