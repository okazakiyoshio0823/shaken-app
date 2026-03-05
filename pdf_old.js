// PDF蜃ｺ蜉・function generatePDF() {
    try {
        // 菴ｿ逕ｨ閠・錐繧貞叙蠕・        const userName = document.getElementById('userName')?.value || '';
        const plateSerial = document.getElementById('plateSerial')?.value || '';
        const today = new Date();
        const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

        // 繝輔ぃ繧､繝ｫ蜷阪ｒ菴懈・: [譌･莉肋_[菴ｿ逕ｨ閠・錐]_霆頑､懆ｦ狗ｩ肴嶌.pdf
        let filename = `${dateStr}_霆頑､懆ｦ狗ｩ肴嶌`;
        if (userName) {
            filename = `${dateStr}_${userName}_霆頑､懆ｦ狗ｩ肴嶌`;
        } else if (plateSerial) {
            filename = `${dateStr}_${plateSerial}_霆頑､懆ｦ狗ｩ肴嶌`;
        }

        // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ・        const element = document.getElementById('previewContent');

        if (!element || !element.innerHTML) {
            alert('繝励Ξ繝薙Η繝ｼ蜀・ｮｹ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲ょ・縺ｫ繝励Ξ繝薙Η繝ｼ繧定｡ｨ遉ｺ縺励※縺上□縺輔＞縲・);
            return;
        }

        // html2pdf縺ｮ繧ｪ繝励す繝ｧ繝ｳ
        const opt = {
            margin: 10,
            filename: filename + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1024 // 繝ｬ繧､繧｢繧ｦ繝亥ｴｩ繧碁亟豁｢縺ｮ縺溘ａ蟷・ｒ蝗ｺ螳・            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            }
        };

        // PDF繧堤函謌舌＠縺ｦ繝繧ｦ繝ｳ繝ｭ繝ｼ繝・        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF菫晏ｭ伜ｮ御ｺ・', filename);

            // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ繝偵Φ繝医ｒ陦ｨ遉ｺ・医ヶ繝ｩ繧ｦ繧ｶ縺ｮ蛻ｶ髯舌〒菫晏ｭ伜・繝輔か繝ｫ繝縺ｯ逶ｴ謗･謖・ｮ壹〒縺阪↑縺・◆繧・ｼ・            if (userName) {
                alert(`PDF菫晏ｭ倥＠縺ｾ縺励◆・―n\n刀 繝輔ぃ繧､繝ｫ蜷・ ${filename}.pdf\n\n庁 繝偵Φ繝・ 繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨ヵ繧ｩ繝ｫ繝縺九ｉ\n縲瑚ｻ頑､懆ｦ狗ｩ阪ｊ繝・・繧ｿ縲阪ヵ繧ｩ繝ｫ繝縺ｫ遘ｻ蜍輔☆繧九→謨ｴ逅・＠繧・☆縺上↑繧翫∪縺吶Ａ);
            }
        }).catch(err => {
            console.error('PDF逕滓・繧ｨ繝ｩ繝ｼ:', err);
            alert('PDF逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
            // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: 蜊ｰ蛻ｷ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・            window.print();
        });

    } catch (error) {
        console.error('PDF逕滓・蜃ｦ逅・お繝ｩ繝ｼ:', error);
        alert('PDF逕滓・縺ｧ繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
        // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: 蜊ｰ蛻ｷ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・        window.print();
    }
}
