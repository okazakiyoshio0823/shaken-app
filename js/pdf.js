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

        // ==========================================
        // 【白紙化対策 v4 最シンプル＆原寸大キャプチャ方式】
        // ==========================================
        // 不要なDOM複製等を全て廃止し、「今見えているプレビュー画面」をそのままターゲットにする原点回帰。
        // キャプチャミスを防ぐため、要素の絶対座標とサイズを正確に取得してエンジンに渡す。
        const rect = element.getBoundingClientRect();

        // プレビュー領域の装飾（影や角丸）を一時的にオフにしてプレーンな状態にする
        const originalBoxShadow = element.style.boxShadow;
        const originalBorderRadius = element.style.borderRadius;
        element.style.boxShadow = 'none';
        element.style.borderRadius = '0';

        // html2pdfのオプション
        const opt = {
            margin: 0,
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 1 }, // 最高画質
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff', // 背景を強制的に白にして透明化バグを防ぐ
                removeContainer: true,      // 処理後のゴミコンテナを強制削除
                // キャプチャ対象の座標とサイズを強制指定（これで画面外の白紙を撮るのを防ぐ）
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            // 1ページのみ出力できれば良いとのことなので、pagebreakオプションは外します
        };

        // PDFを生成してダウンロード
        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF保存完了:', filename);

            // スタイルを元に戻す
            element.style.boxShadow = originalBoxShadow;
            element.style.borderRadius = originalBorderRadius;

            if (userName) {
                alert(`PDF保存しました！\n\n📁 ファイル名: ${filename}.pdf\n\n💡 ヒント: ダウンロードフォルダから\n「車検見積りデータ」フォルダに移動すると整理しやすくなります。`);
            }
        }).catch(err => {
            console.error('PDF生成エラー:', err);

            // スタイルを元に戻す
            element.style.boxShadow = originalBoxShadow;
            element.style.borderRadius = originalBorderRadius;

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
