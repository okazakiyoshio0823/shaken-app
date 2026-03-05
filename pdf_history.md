commit 3ef1a41783a60bb4968ac2dcf5c47db09fd4e578
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Wed Mar 4 10:34:03 2026 +0900

    fix: PDF縺ｧ逋ｽ邏呻ｼ・繝壹・繧ｸ逶ｮ縺ｮ縺ｿ縺ｫ縺ｪ繧句撫鬘後・螳悟・菫ｮ豁｣・・4: 荳譎ゅさ繝ｳ繝・リ菴懈・縺ｪ縺ｩ縺ｮ隍・尅縺ｪ蜃ｦ逅・ｒ蜈ｨ縺ｦ遐ｴ譽・＠縲∫判髱｢縺ｫ陦ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ繝励Ξ繝薙Η繝ｼ閾ｪ菴薙・邨ｶ蟇ｾ蠎ｧ讓吶→螳溷ｯｸ繧ｵ繧､繧ｺ繧・html2canvas 縺ｫ逶ｴ謗･貂｡縺励∝ｼｷ蛻ｶ逧・↓縺昴・鬆伜沺縺ｮ縺ｿ繧偵く繝｣繝励メ繝｣縺輔○繧区婿蠑上↓螟画峩縲りレ譎ｯ濶ｲ繧・撼蜷梧悄驕・ｻｶ蟇ｾ遲悶ｂ霑ｽ蜉・・
diff --git a/js/pdf.js b/js/pdf.js
index d8f452b..63bd1e3 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -15,7 +15,7 @@ function generatePDF() {
             filename = `${dateStr}_${plateSerial}_霆頑､懆ｦ狗ｩ肴嶌`;
         }
 
-        // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ暦ｼ域里蟄倥・DOM繧堤峩謗･繧ｭ繝｣繝励メ繝｣縺吶ｋ・・+        // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ・         const element = document.getElementById('previewContent');
 
         if (!element || !element.innerHTML) {
@@ -23,78 +23,62 @@ function generatePDF() {
             return;
         }
 
-        // 縲先怙蠑ｷ縺ｮ逋ｽ邏吝喧蟇ｾ遲・v3縲・-        // 繝｢繝ｼ繝繝ｫ遲臥音譛峨・縲経verflow: hidden縲阪ｄ縲稽ax-height縲阪↑縺ｩ縺ｮCSS蛻ｶ髯舌ｒ荳蛻・女縺代↑縺・ｈ縺・・-        // 迢ｬ遶九＠縺溷ｰら畑繧ｳ繝ｳ繝・リ繧剃ｽ懈・縺励∝ｯｾ雎｡隕∫ｴ縺ｮHTML縺ｮ縺ｿ繧偵さ繝斐・縺励∪縺吶・-        const renderContainer = document.createElement('div');
-        renderContainer.id = 'pdf-render-container';
-        // HTML2Canvas縺九ｉ遒ｺ螳溘↓縲檎判髱｢蜀・〒蜿ｯ隕也憾諷九↓縺ゅｋ縲阪→蛻､螳壹＆縺帙ｋ縺溘ａ蟾ｦ荳翫↓驟咲ｽｮ縺励▽縺､縲・-        // 繝ｦ繝ｼ繧ｶ繝ｼ縺九ｉ縺ｯ隕九∴縺ｪ縺・ｈ縺・z-index 縺ｧ繧｢繝励Μ縺ｮ陬丞・縺ｫ髫縺励∪縺吶・-        renderContainer.style.position = 'absolute';
-        renderContainer.style.top = '0';
-        renderContainer.style.left = '0';
-        renderContainer.style.width = '794px'; // A4逶ｸ蠖・-        renderContainer.style.minHeight = '1123px'; // 譛菴弱〒繧・4繝ｻ1譫壼・縺ｮ鬮倥＆繧堤｢ｺ菫・-        renderContainer.style.background = '#fff';
-        renderContainer.style.zIndex = '-9999';
-        // overflow 縺ｯ遒ｺ螳溘↓ visible
-        renderContainer.style.overflow = 'visible';
+        // ==========================================
+        // 縲千區邏吝喧蟇ｾ遲・v4 譛繧ｷ繝ｳ繝励Ν・・次蟇ｸ螟ｧ繧ｭ繝｣繝励メ繝｣譁ｹ蠑上・+        // ==========================================
+        // 荳崎ｦ√↑DOM隍・｣ｽ遲峨ｒ蜈ｨ縺ｦ蟒・ｭ｢縺励√御ｻ願ｦ九∴縺ｦ縺・ｋ繝励Ξ繝薙Η繝ｼ逕ｻ髱｢縲阪ｒ縺昴・縺ｾ縺ｾ繧ｿ繝ｼ繧ｲ繝・ヨ縺ｫ縺吶ｋ蜴溽せ蝗槫ｸｰ縲・+        // 繧ｭ繝｣繝励メ繝｣繝溘せ繧帝亟縺舌◆繧√∬ｦ∫ｴ縺ｮ邨ｶ蟇ｾ蠎ｧ讓吶→繧ｵ繧､繧ｺ繧呈ｭ｣遒ｺ縺ｫ蜿門ｾ励＠縺ｦ繧ｨ繝ｳ繧ｸ繝ｳ縺ｫ貂｡縺吶・+        const rect = element.getBoundingClientRect();
 
-        // 繝励Ξ繝薙Η繝ｼ縺ｮ荳ｭ霄ｫ繧貞ｮ悟・縺ｫ繧ｳ繝斐・
-        // 蜈・・DOM縺九ｉHTML譁・ｭ怜・縺ｨ縺励※隍・｣ｽ縺吶ｋ縺溘ａ縲∵里蟄倥・DOM縺ｸ縺ｮ螟画峩縺ｯ荳蛻・所縺ｼ縺励∪縺帙ｓ
-        renderContainer.innerHTML = element.innerHTML;
-        document.body.appendChild(renderContainer);
-
-        // 蜷・・繝ｼ繧ｸ縺ｮ繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ縺励・ｫ倥＆繧・verflow縺ｮ蛻ｶ髯舌ｒ螳悟・縺ｫ隗｣髯､
-        const pages = renderContainer.querySelectorAll('.print-page');
-        pages.forEach(page => {
-            page.style.margin = '0';
-            page.style.padding = '0';
-            page.style.boxSizing = 'border-box';
-            page.style.maxHeight = 'none';
-            page.style.overflow = 'visible';
-            page.style.height = 'auto';
-            page.style.pageBreakAfter = 'always';
-        });
-
-        // 繝励Ξ繝薙Η繝ｼ蜈ｨ菴薙ｒ蝗ｲ繧繧ｳ繝ｳ繝・リ縺後≠繧後・縺昴ｌ繧ょ宛髯占ｧ｣髯､
-        const printPreview = renderContainer.querySelector('#printPreview');
-        if (printPreview) {
-            printPreview.style.maxHeight = 'none';
-            printPreview.style.overflow = 'visible';
-            printPreview.style.height = 'auto';
-            printPreview.style.boxShadow = 'none';
-            printPreview.style.margin = '0';
-        }
+        // 繝励Ξ繝薙Η繝ｼ鬆伜沺縺ｮ陬・｣ｾ・亥ｽｱ繧・ｧ剃ｸｸ・峨ｒ荳譎ら噪縺ｫ繧ｪ繝輔↓縺励※繝励Ξ繝ｼ繝ｳ縺ｪ迥ｶ諷九↓縺吶ｋ
+        const originalBoxShadow = element.style.boxShadow;
+        const originalBorderRadius = element.style.borderRadius;
+        element.style.boxShadow = 'none';
+        element.style.borderRadius = '0';
 
         // html2pdf縺ｮ繧ｪ繝励す繝ｧ繝ｳ
         const opt = {
             margin: 0,
             filename: filename + '.pdf',
-            image: { type: 'jpeg', quality: 0.98 },
+            image: { type: 'jpeg', quality: 1 }, // 譛鬮倡判雉ｪ
             html2canvas: {
-                scale: 2,           // 鬮倡判雉ｪ蛹・-                useCORS: true,      // 螟夜Κ逕ｻ蜒剰ｨｱ蜿ｯ
-                logging: false,     // 繝ｭ繧ｰ蜃ｺ蜉・-                windowWidth: 794,   // 蝗ｺ螳壼ｹ・+                scale: 2,
+                useCORS: true,
+                logging: false,
+                backgroundColor: '#ffffff', // 閭梧勹繧貞ｼｷ蛻ｶ逧・↓逋ｽ縺ｫ縺励※騾乗・蛹悶ヰ繧ｰ繧帝亟縺・+                removeContainer: true,      // 蜃ｦ逅・ｾ後・繧ｴ繝溘さ繝ｳ繝・リ繧貞ｼｷ蛻ｶ蜑企勁
+                // 繧ｭ繝｣繝励メ繝｣蟇ｾ雎｡縺ｮ蠎ｧ讓吶→繧ｵ繧､繧ｺ繧貞ｼｷ蛻ｶ謖・ｮ夲ｼ医％繧後〒逕ｻ髱｢螟悶・逋ｽ邏吶ｒ謦ｮ繧九・繧帝亟縺撰ｼ・+                x: rect.left,
+                y: rect.top,
+                width: rect.width,
+                height: rect.height,
+                windowWidth: document.documentElement.scrollWidth,
+                windowHeight: document.documentElement.scrollHeight,
                 scrollX: 0,
                 scrollY: 0
             },
-            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
-            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
+            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
+            // 1繝壹・繧ｸ縺ｮ縺ｿ蜃ｺ蜉帙〒縺阪ｌ縺ｰ濶ｯ縺・→縺ｮ縺薙→縺ｪ縺ｮ縺ｧ縲｝agebreak繧ｪ繝励す繝ｧ繝ｳ縺ｯ螟悶＠縺ｾ縺・         };
 
         // PDF繧堤函謌舌＠縺ｦ繝繧ｦ繝ｳ繝ｭ繝ｼ繝・-        html2pdf().set(opt).from(renderContainer).save().then(() => {
+        html2pdf().set(opt).from(element).save().then(() => {
             console.log('PDF菫晏ｭ伜ｮ御ｺ・', filename);
-            renderContainer.remove(); // 荳譎ゅさ繝ｳ繝・リ繧貞炎髯､
+
+            // 繧ｹ繧ｿ繧､繝ｫ繧貞・縺ｫ謌ｻ縺・+            element.style.boxShadow = originalBoxShadow;
+            element.style.borderRadius = originalBorderRadius;
 
             if (userName) {
                 alert(`PDF菫晏ｭ倥＠縺ｾ縺励◆・―n\n刀 繝輔ぃ繧､繝ｫ蜷・ ${filename}.pdf\n\n庁 繝偵Φ繝・ 繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨ヵ繧ｩ繝ｫ繝縺九ｉ\n縲瑚ｻ頑､懆ｦ狗ｩ阪ｊ繝・・繧ｿ縲阪ヵ繧ｩ繝ｫ繝縺ｫ遘ｻ蜍輔☆繧九→謨ｴ逅・＠繧・☆縺上↑繧翫∪縺吶Ａ);
             }
         }).catch(err => {
             console.error('PDF逕滓・繧ｨ繝ｩ繝ｼ:', err);
-            renderContainer.remove(); // 荳譎ゅさ繝ｳ繝・リ繧貞炎髯､
+
+            // 繧ｹ繧ｿ繧､繝ｫ繧貞・縺ｫ謌ｻ縺・+            element.style.boxShadow = originalBoxShadow;
+            element.style.borderRadius = originalBorderRadius;
+
             alert('PDF逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
             window.print();
         });

commit 103d4179467610b22bba8fc6fb1da41c3cbb63db
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Wed Mar 4 10:25:03 2026 +0900

    fix: PDF逋ｽ邏吝喧縺ｮ螳悟・迚ｹ螳壹→菫ｮ豁｣・・nclone蜀・〒荳崎ｦ∬ｦ∫ｴ繧帝國縺吩ｻ｣繧上ｊ縺ｫ縲√・繝ｬ繝薙Η繝ｼ縺ｮHTML譁・ｭ怜・繧呈眠縺励＞騾乗・繧ｳ繝ｳ繝・リ縺ｫ繧ｳ繝斐・縺励※迢ｬ遶九＆縺帙ｋ縲後け繝ｭ繝ｼ繝ｳ譁ｹ蠑・v3縲阪ｒ螳溯｣・ゅ％繧後↓繧医ｊ蜈・・繝｢繝ｼ繝繝ｫ縺ｮCSS縺ｫ荳蛻・が鬲斐＆繧後↑縺上↑繧翫∪縺呻ｼ・
diff --git a/js/pdf.js b/js/pdf.js
index 7754681..d8f452b 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -23,94 +23,79 @@ function generatePDF() {
             return;
         }
 
+        // 縲先怙蠑ｷ縺ｮ逋ｽ邏吝喧蟇ｾ遲・v3縲・+        // 繝｢繝ｼ繝繝ｫ遲臥音譛峨・縲経verflow: hidden縲阪ｄ縲稽ax-height縲阪↑縺ｩ縺ｮCSS蛻ｶ髯舌ｒ荳蛻・女縺代↑縺・ｈ縺・・+        // 迢ｬ遶九＠縺溷ｰら畑繧ｳ繝ｳ繝・リ繧剃ｽ懈・縺励∝ｯｾ雎｡隕∫ｴ縺ｮHTML縺ｮ縺ｿ繧偵さ繝斐・縺励∪縺吶・+        const renderContainer = document.createElement('div');
+        renderContainer.id = 'pdf-render-container';
+        // HTML2Canvas縺九ｉ遒ｺ螳溘↓縲檎判髱｢蜀・〒蜿ｯ隕也憾諷九↓縺ゅｋ縲阪→蛻､螳壹＆縺帙ｋ縺溘ａ蟾ｦ荳翫↓驟咲ｽｮ縺励▽縺､縲・+        // 繝ｦ繝ｼ繧ｶ繝ｼ縺九ｉ縺ｯ隕九∴縺ｪ縺・ｈ縺・z-index 縺ｧ繧｢繝励Μ縺ｮ陬丞・縺ｫ髫縺励∪縺吶・+        renderContainer.style.position = 'absolute';
+        renderContainer.style.top = '0';
+        renderContainer.style.left = '0';
+        renderContainer.style.width = '794px'; // A4逶ｸ蠖・+        renderContainer.style.minHeight = '1123px'; // 譛菴弱〒繧・4繝ｻ1譫壼・縺ｮ鬮倥＆繧堤｢ｺ菫・+        renderContainer.style.background = '#fff';
+        renderContainer.style.zIndex = '-9999';
+        // overflow 縺ｯ遒ｺ螳溘↓ visible
+        renderContainer.style.overflow = 'visible';
+
+        // 繝励Ξ繝薙Η繝ｼ縺ｮ荳ｭ霄ｫ繧貞ｮ悟・縺ｫ繧ｳ繝斐・
+        // 蜈・・DOM縺九ｉHTML譁・ｭ怜・縺ｨ縺励※隍・｣ｽ縺吶ｋ縺溘ａ縲∵里蟄倥・DOM縺ｸ縺ｮ螟画峩縺ｯ荳蛻・所縺ｼ縺励∪縺帙ｓ
+        renderContainer.innerHTML = element.innerHTML;
+        document.body.appendChild(renderContainer);
+
+        // 蜷・・繝ｼ繧ｸ縺ｮ繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ縺励・ｫ倥＆繧・verflow縺ｮ蛻ｶ髯舌ｒ螳悟・縺ｫ隗｣髯､
+        const pages = renderContainer.querySelectorAll('.print-page');
+        pages.forEach(page => {
+            page.style.margin = '0';
+            page.style.padding = '0';
+            page.style.boxSizing = 'border-box';
+            page.style.maxHeight = 'none';
+            page.style.overflow = 'visible';
+            page.style.height = 'auto';
+            page.style.pageBreakAfter = 'always';
+        });
+
+        // 繝励Ξ繝薙Η繝ｼ蜈ｨ菴薙ｒ蝗ｲ繧繧ｳ繝ｳ繝・リ縺後≠繧後・縺昴ｌ繧ょ宛髯占ｧ｣髯､
+        const printPreview = renderContainer.querySelector('#printPreview');
+        if (printPreview) {
+            printPreview.style.maxHeight = 'none';
+            printPreview.style.overflow = 'visible';
+            printPreview.style.height = 'auto';
+            printPreview.style.boxShadow = 'none';
+            printPreview.style.margin = '0';
+        }
+
         // html2pdf縺ｮ繧ｪ繝励す繝ｧ繝ｳ
         const opt = {
-            margin: 0, // 繝槭・繧ｸ繝ｳ縺ｯ繧ｼ繝ｭ・・SS蛛ｴ縺ｮpadding: 40px縺ｫ縺吶∋縺ｦ莉ｻ縺帙ｋ・・+            margin: 0,
             filename: filename + '.pdf',
             image: { type: 'jpeg', quality: 0.98 },
             html2canvas: {
-                scale: 2,
-                useCORS: true,
-                logging: false, // 隍・尅縺ｪ蝠城｡後ｒ繝・ヰ繝・げ縺吶ｋ縺溘ａ縲√％縺薙〒縺ｯtrue縺ｫ縺励※繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ繧堤｢ｺ隱阪☆繧区焔繧ゅ≠繧翫∪縺吶′荳譌ｦfalse
+                scale: 2,           // 鬮倡判雉ｪ蛹・+                useCORS: true,      // 螟夜Κ逕ｻ蜒剰ｨｱ蜿ｯ
+                logging: false,     // 繝ｭ繧ｰ蜃ｺ蜉・+                windowWidth: 794,   // 蝗ｺ螳壼ｹ・                 scrollX: 0,
-                scrollY: 0,
-                windowWidth: 794, // 繧ｭ繝｣繝励メ繝｣縺ｮ讓ｪ蟷・ｒA4逶ｸ蠖・794px)縺ｫ蝗ｺ螳・-                windowHeight: document.getElementById('previewContent') ? document.getElementById('previewContent').scrollHeight + 100 : 3000, // 鬮倥＆縺・縺ｨ縺励※險育ｮ励＆繧後ｋ縺ｮ繧帝亟縺舌◆繧√・蜊∝・縺ｪ鬆伜沺謖・ｮ・-                onclone: function (clonedDoc) {
-                    // DOM讒矩繧呈隼螟会ｼ・ppendChild遲会ｼ峨☆繧九→html2canvas縺後け繝ｩ繝・す繝･縺励・-                    // 繧ｨ繝ｩ繝ｼ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ縺ｨ縺励※繝悶Λ繧ｦ繧ｶ讓呎ｺ悶・蜊ｰ蛻ｷ逕ｻ髱｢縺碁幕縺・※縺励∪縺・◆繧√・-                    // 繧ｯ繝ｭ繝ｼ繝ｳ縺輔ｌ縺櫂OM縺ｮ濶ｲ莉倥￠繧・撼陦ｨ遉ｺ・・SS蛻ｶ蠕｡・峨・縺ｿ縺ｫ逡吶ａ繧区怙繧ょｮ牙・縺ｪ繝上ャ繧ｯ縲・-
-                    const target = clonedDoc.getElementById('previewContent');
-                    if (!target) return;
-
-                    // 1. 蜷・・繝ｼ繧ｸ・・print-page・峨・菴呵ｨ医↑繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
-                    const pages = target.querySelectorAll('.print-page');
-                    pages.forEach(page => {
-                        page.style.margin = '0';
-                        page.style.boxSizing = 'border-box';
-                    });
-
-                    // 2. 繝励Ξ繝薙Η繝ｼ鬆伜沺・・printPreview・芽・菴薙・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ縺励・-                    // html2canvas縺ｫ縲御ｽ咏區縲阪ｒ隱､隱阪＆繧後↑縺・ｈ縺・ｼｷ蛻ｶ逧・↓蟾ｦ荳・0,0)縺ｫ蝗ｺ螳壹☆繧・-                    const preview = target.querySelector('#printPreview') || target;
-                    preview.style.margin = '0';
-                    preview.style.padding = '0';
-                    preview.style.position = 'absolute';
-                    preview.style.top = '0';
-                    preview.style.left = '0';
-                    preview.style.width = '794px';
-                    preview.style.background = '#fff';
-
-                    // 3. 繧ｯ繝ｩ繝・す繝･繧帝∩縺代ｋ縺溘ａDOM髫主ｱ､縺ｯ縺昴・縺ｾ縺ｾ邯ｭ謖√＠縲・-                    // 繝励Ξ繝薙Η繝ｼ蜀・ｮｹ縲御ｻ･螟悶阪・縺吶∋縺ｦ縺ｮ隕∫ｴ繧辰SS縺ｧ荳榊庄隕門喧縺吶ｋ
-                    clonedDoc.body.style.margin = '0';
-                    clonedDoc.body.style.padding = '0';
-                    clonedDoc.body.style.background = '#fff';
-
-                    // 繝｢繝ｼ繝繝ｫ縺ｮ鮟定レ譎ｯ繧・・繝・ム繝ｼ縺ｪ縺ｩ縲√く繝｣繝励メ繝｣縺ｮ驍ｪ鬲斐↓縺ｪ繧九ｂ縺ｮ繧貞ｼｷ蛻ｶ髱櫁｡ｨ遉ｺ
-                    const hideTargets = clonedDoc.querySelectorAll('body > *:not(#previewModal), #previewModal > *:not(.modal-content), .modal-content > *:not(#previewContent), .app-container');
-                    hideTargets.forEach(el => {
-                        if (el && el.style) el.style.display = 'none';
-                    });
-
-                    // 隕ｪ髫主ｱ､縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遲峨↓繧医ｋ隕句・繧後・逋ｽ邏吝喧繧帝亟縺舌◆繧∽ｸ蠕九Μ繧ｻ繝・ヨ・・ｼｷ蛻ｶ陦ｨ遉ｺ
-                    let parent = target.parentElement;
-                    while (parent && parent !== clonedDoc.body) {
-                        parent.style.margin = '0';
-                        parent.style.padding = '0';
-                        parent.style.position = 'static';
-                        parent.style.display = 'block'; // 蠑ｷ蛻ｶ逧・↓繝悶Ο繝・け隕∫ｴ蛹・-                        parent.style.opacity = '1';     // 蠑ｷ蛻ｶ逧・↓荳埼乗・蛹・-                        parent.style.visibility = 'visible'; // 蠑ｷ蛻ｶ逧・↓蜿ｯ隕門喧
-                        parent.style.height = 'auto';
-                        parent.style.maxHeight = 'none';
-                        parent.style.overflow = 'visible';
-                        parent = parent.parentElement;
-                    }
-                }
-            },
-            jsPDF: {
-                unit: 'mm',
-                format: 'a4',
-                orientation: 'portrait'
+                scrollY: 0
             },
-            pagebreak: {
-                mode: ['avoid-all', 'css', 'legacy']
-            }
+            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
+            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
         };
 
         // PDF繧堤函謌舌＠縺ｦ繝繧ｦ繝ｳ繝ｭ繝ｼ繝・-        html2pdf().set(opt).from(element).save().then(() => {
+        html2pdf().set(opt).from(renderContainer).save().then(() => {
             console.log('PDF菫晏ｭ伜ｮ御ｺ・', filename);
+            renderContainer.remove(); // 荳譎ゅさ繝ｳ繝・リ繧貞炎髯､
 
             if (userName) {
                 alert(`PDF菫晏ｭ倥＠縺ｾ縺励◆・―n\n刀 繝輔ぃ繧､繝ｫ蜷・ ${filename}.pdf\n\n庁 繝偵Φ繝・ 繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨ヵ繧ｩ繝ｫ繝縺九ｉ\n縲瑚ｻ頑､懆ｦ狗ｩ阪ｊ繝・・繧ｿ縲阪ヵ繧ｩ繝ｫ繝縺ｫ遘ｻ蜍輔☆繧九→謨ｴ逅・＠繧・☆縺上↑繧翫∪縺吶Ａ);
             }
         }).catch(err => {
             console.error('PDF逕滓・繧ｨ繝ｩ繝ｼ:', err);
+            renderContainer.remove(); // 荳譎ゅさ繝ｳ繝・リ繧貞炎髯､
             alert('PDF逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
-            // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: 蜊ｰ蛻ｷ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・             window.print();
         });
 

commit d781f5ad9ad55e77e684b61819771b79985ead7f
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Wed Mar 4 10:15:07 2026 +0900

    fix: PDF逋ｽ邏吝喧縺ｮ譬ｹ譛ｬ蜴溷屏・・tml2canvas縺瑚ｦｪ隕∫ｴ縺ｮCSS縺ｫ蠖ｱ髻ｿ縺輔ｌ鬮倥＆0繧・撼陦ｨ遉ｺ縺ｨ隱､隱阪☆繧九ヰ繧ｰ・峨↓蟇ｾ蜃ｦ縺吶ｋ縺溘ａ縲｛nclone蜀・〒隕ｪ髫主ｱ､縺ｸ蠑ｷ蛻ｶ逧・↓display:block/opacity:1/visibility:visible繧帝←逕ｨ縺励『indowHeight繧ｪ繝励す繝ｧ繝ｳ繧よ・遉ｺ逧・↓謖・ｮ・
diff --git a/js/pdf.js b/js/pdf.js
index a5bae95..7754681 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -31,10 +31,11 @@ function generatePDF() {
             html2canvas: {
                 scale: 2,
                 useCORS: true,
-                logging: false,
+                logging: false, // 隍・尅縺ｪ蝠城｡後ｒ繝・ヰ繝・げ縺吶ｋ縺溘ａ縲√％縺薙〒縺ｯtrue縺ｫ縺励※繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ繧堤｢ｺ隱阪☆繧区焔繧ゅ≠繧翫∪縺吶′荳譌ｦfalse
                 scrollX: 0,
                 scrollY: 0,
                 windowWidth: 794, // 繧ｭ繝｣繝励メ繝｣縺ｮ讓ｪ蟷・ｒA4逶ｸ蠖・794px)縺ｫ蝗ｺ螳・+                windowHeight: document.getElementById('previewContent') ? document.getElementById('previewContent').scrollHeight + 100 : 3000, // 鬮倥＆縺・縺ｨ縺励※險育ｮ励＆繧後ｋ縺ｮ繧帝亟縺舌◆繧√・蜊∝・縺ｪ鬆伜沺謖・ｮ・                 onclone: function (clonedDoc) {
                     // DOM讒矩繧呈隼螟会ｼ・ppendChild遲会ｼ峨☆繧九→html2canvas縺後け繝ｩ繝・す繝･縺励・                     // 繧ｨ繝ｩ繝ｼ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ縺ｨ縺励※繝悶Λ繧ｦ繧ｶ讓呎ｺ悶・蜊ｰ蛻ｷ逕ｻ髱｢縺碁幕縺・※縺励∪縺・◆繧√・@@ -73,13 +74,15 @@ function generatePDF() {
                         if (el && el.style) el.style.display = 'none';
                     });
 
-                    // 隕ｪ髫主ｱ､縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遲峨↓繧医ｋ隕句・繧後ｒ髦ｲ縺舌◆繧∽ｸ蠕九Μ繧ｻ繝・ヨ
+                    // 隕ｪ髫主ｱ､縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遲峨↓繧医ｋ隕句・繧後・逋ｽ邏吝喧繧帝亟縺舌◆繧∽ｸ蠕九Μ繧ｻ繝・ヨ・・ｼｷ蛻ｶ陦ｨ遉ｺ
                     let parent = target.parentElement;
                     while (parent && parent !== clonedDoc.body) {
                         parent.style.margin = '0';
                         parent.style.padding = '0';
                         parent.style.position = 'static';
-                        parent.style.display = 'block';
+                        parent.style.display = 'block'; // 蠑ｷ蛻ｶ逧・↓繝悶Ο繝・け隕∫ｴ蛹・+                        parent.style.opacity = '1';     // 蠑ｷ蛻ｶ逧・↓荳埼乗・蛹・+                        parent.style.visibility = 'visible'; // 蠑ｷ蛻ｶ逧・↓蜿ｯ隕門喧
                         parent.style.height = 'auto';
                         parent.style.maxHeight = 'none';
                         parent.style.overflow = 'visible';

commit 89238bfa0fd9c570fab9b1761bc9269ec4d3d881
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Wed Mar 4 10:05:30 2026 +0900

    fix: PDF逋ｽ邏吝喧縺ｮ螳悟・迚ｹ螳壹→菫ｮ豁｣・・nclone蜀・〒荳崎ｦ∬ｦ∫ｴ繧帝撼陦ｨ遉ｺ(display:none)縺ｫ縺吶ｋ髫帙∝ｭ伜惠縺励↑縺・modal-dialog髫主ｱ､繧呈欠螳壹＠縺ｦ縺・◆縺溘ａ隱､縺｣縺ｦ.modal-content閾ｪ菴薙′髱櫁｡ｨ遉ｺ縺ｫ縺ｪ縺｣縺ｦ縺・◆繧ｻ繝ｬ繧ｯ繧ｿ繝溘せ繧堤峩蜑阪↓菫ｮ豁｣・・
diff --git a/js/pdf.js b/js/pdf.js
index f606356..a5bae95 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -68,7 +68,7 @@ function generatePDF() {
                     clonedDoc.body.style.background = '#fff';
 
                     // 繝｢繝ｼ繝繝ｫ縺ｮ鮟定レ譎ｯ繧・・繝・ム繝ｼ縺ｪ縺ｩ縲√く繝｣繝励メ繝｣縺ｮ驍ｪ鬲斐↓縺ｪ繧九ｂ縺ｮ繧貞ｼｷ蛻ｶ髱櫁｡ｨ遉ｺ
-                    const hideTargets = clonedDoc.querySelectorAll('body > *:not(#previewModal), #previewModal > *:not(.modal-dialog), .modal-dialog > *:not(.modal-content), .modal-content > *:not(#previewContent), .app-container');
+                    const hideTargets = clonedDoc.querySelectorAll('body > *:not(#previewModal), #previewModal > *:not(.modal-content), .modal-content > *:not(#previewContent), .app-container');
                     hideTargets.forEach(el => {
                         if (el && el.style) el.style.display = 'none';
                     });

commit afe95aeba2fd8162046d2e17f4973926712ff592
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Tue Mar 3 15:05:59 2026 +0900

    fix: PDF逕滓・譎ゅ・縲悟､ｱ謨励＠縺ｾ縺励◆縲阪お繝ｩ繝ｼ・・tml2canvas蜀・〒縺ｮDOM謾ｹ螟峨↓莨ｴ縺・け繝ｩ繝・す繝･・峨ｒ隗｣豸医＠縲｛nclone蜀・〒縺ｯ髱槫ｯｾ雎｡隕∫ｴ縺ｮdisplay:none荳榊庄隕門喧縺ｨ蟇ｾ雎｡縺ｮabsolute蝗ｺ螳壹・縺ｿ繧定｡後≧螳牙・縺ｪCSS繝ｪ繧ｻ繝・ヨ縺ｫ蝗槫ｸｰ

diff --git a/js/pdf.js b/js/pdf.js
index 8d62823..f606356 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -36,43 +36,55 @@ function generatePDF() {
                 scrollY: 0,
                 windowWidth: 794, // 繧ｭ繝｣繝励メ繝｣縺ｮ讓ｪ蟷・ｒA4逶ｸ蠖・794px)縺ｫ蝗ｺ螳・                 onclone: function (clonedDoc) {
-                    // PDF逕滓・逕ｨ縺ｮ繧ｯ繝ｭ繝ｼ繝ｳDOM蜀・〒縲∫判髱｢縺ｮ荳ｭ螟ｮ陦ｨ遉ｺ逕ｨ縺ｫ菴ｿ繧上ｌ縺ｦ縺・ｋ margin 繧・Δ繝ｼ繝繝ｫ縺ｮ譫邨・∩縺ｪ縺ｩ
-                    // html2canvas 縺ｮ蠎ｧ讓呵ｨ育ｮ励ｒ迢ゅｏ縺帙ｋ・域僑螟ｧ繧・ｷｦ隕句・繧後・・牙次蝗縺ｨ縺ｪ繧九☆縺ｹ縺ｦ縺ｮ隕∫ｴ繧貞ｮ悟・縺ｫ遐ｴ螢翫＠縲・-                    // 邏皮ｲ九↑ A4繝励Ξ繝薙Η繝ｼ鬆伜沺・・94px・峨□縺代ｒ邨ｶ蟇ｾ蠎ｧ讓・0,0)縺ｫ蜀埼・鄂ｮ縺吶ｋ譛蠑ｷ縺ｮ繝上ャ繧ｯ縲・+                    // DOM讒矩繧呈隼螟会ｼ・ppendChild遲会ｼ峨☆繧九→html2canvas縺後け繝ｩ繝・す繝･縺励・+                    // 繧ｨ繝ｩ繝ｼ繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ縺ｨ縺励※繝悶Λ繧ｦ繧ｶ讓呎ｺ悶・蜊ｰ蛻ｷ逕ｻ髱｢縺碁幕縺・※縺励∪縺・◆繧√・+                    // 繧ｯ繝ｭ繝ｼ繝ｳ縺輔ｌ縺櫂OM縺ｮ濶ｲ莉倥￠繧・撼陦ｨ遉ｺ・・SS蛻ｶ蠕｡・峨・縺ｿ縺ｫ逡吶ａ繧区怙繧ょｮ牙・縺ｪ繝上ャ繧ｯ縲・ 
                     const target = clonedDoc.getElementById('previewContent');
                     if (!target) return;
 
-                    // 1. 蜷・・繝ｼ繧ｸ・・print-page・峨・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
+                    // 1. 蜷・・繝ｼ繧ｸ・・print-page・峨・菴呵ｨ医↑繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
                     const pages = target.querySelectorAll('.print-page');
                     pages.forEach(page => {
                         page.style.margin = '0';
                         page.style.boxSizing = 'border-box';
                     });
 
-                    // 2. 繝励Ξ繝薙Η繝ｼ閾ｪ菴薙・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
+                    // 2. 繝励Ξ繝薙Η繝ｼ鬆伜沺・・printPreview・芽・菴薙・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ縺励・+                    // html2canvas縺ｫ縲御ｽ咏區縲阪ｒ隱､隱阪＆繧後↑縺・ｈ縺・ｼｷ蛻ｶ逧・↓蟾ｦ荳・0,0)縺ｫ蝗ｺ螳壹☆繧・                     const preview = target.querySelector('#printPreview') || target;
                     preview.style.margin = '0';
                     preview.style.padding = '0';
+                    preview.style.position = 'absolute';
+                    preview.style.top = '0';
+                    preview.style.left = '0';
+                    preview.style.width = '794px';
+                    preview.style.background = '#fff';
 
-                    // 3. 繧ｿ繝ｼ繧ｲ繝・ヨ隕∫ｴ繧偵√Δ繝ｼ繝繝ｫ遲峨・縺吶∋縺ｦ縺ｮ隕ｪ隕∫ｴ縺九ｉ蠑輔″蜑･縺後☆縺溘ａ縺ｮ莠句燕貅門ｙ
-                    target.style.position = 'absolute';
-                    target.style.top = '0';
-                    target.style.left = '0';
-                    target.style.margin = '0';
-                    target.style.padding = '0';
-                    target.style.width = '794px';
-                    target.style.background = '#fff';
-
-                    // 4. 繧ｯ繝ｭ繝ｼ繝ｳ縺輔ｌ縺櫂OM縺ｮBODY繧貞ｮ悟・縺ｫ譖ｴ蝨ｰ・育悄縺｣逋ｽ・峨↓縺吶ｋ
-                    clonedDoc.body.innerHTML = '';
+                    // 3. 繧ｯ繝ｩ繝・す繝･繧帝∩縺代ｋ縺溘ａDOM髫主ｱ､縺ｯ縺昴・縺ｾ縺ｾ邯ｭ謖√＠縲・+                    // 繝励Ξ繝薙Η繝ｼ蜀・ｮｹ縲御ｻ･螟悶阪・縺吶∋縺ｦ縺ｮ隕∫ｴ繧辰SS縺ｧ荳榊庄隕門喧縺吶ｋ
                     clonedDoc.body.style.margin = '0';
                     clonedDoc.body.style.padding = '0';
                     clonedDoc.body.style.background = '#fff';
 
-                    // 5. 縺輔″縺ｻ縺ｩ蠑輔″蜑･縺後＠縺溽ｴ泌ｺｦ100%縺ｮ繧ｿ繝ｼ繧ｲ繝・ヨ隕∫ｴ縺縺代ｒ縲∽ｽ輔ｂ縺ｪ縺ВODY縺ｮ蟾ｦ荳翫↓繝昴ヤ繝ｳ縺ｨ驟咲ｽｮ縺吶ｋ
-                    // 縺薙ｌ縺ｫ繧医ｊ縲√Δ繝ｼ繝繝ｫ縺ｮ繧ｻ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ菴咏區繧・せ繧ｯ繝ｭ繝ｼ繝ｫ驥上↑縺ｩ縺ｮ縺ゅｉ繧・ｋ蠎ｧ讓呵ｨ育ｮ励お繝ｩ繝ｼ縺檎黄逅・噪縺ｫ逋ｺ逕溘＠縺ｪ縺上↑繧・-                    clonedDoc.body.appendChild(target);
+                    // 繝｢繝ｼ繝繝ｫ縺ｮ鮟定レ譎ｯ繧・・繝・ム繝ｼ縺ｪ縺ｩ縲√く繝｣繝励メ繝｣縺ｮ驍ｪ鬲斐↓縺ｪ繧九ｂ縺ｮ繧貞ｼｷ蛻ｶ髱櫁｡ｨ遉ｺ
+                    const hideTargets = clonedDoc.querySelectorAll('body > *:not(#previewModal), #previewModal > *:not(.modal-dialog), .modal-dialog > *:not(.modal-content), .modal-content > *:not(#previewContent), .app-container');
+                    hideTargets.forEach(el => {
+                        if (el && el.style) el.style.display = 'none';
+                    });
+
+                    // 隕ｪ髫主ｱ､縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遲峨↓繧医ｋ隕句・繧後ｒ髦ｲ縺舌◆繧∽ｸ蠕九Μ繧ｻ繝・ヨ
+                    let parent = target.parentElement;
+                    while (parent && parent !== clonedDoc.body) {
+                        parent.style.margin = '0';
+                        parent.style.padding = '0';
+                        parent.style.position = 'static';
+                        parent.style.display = 'block';
+                        parent.style.height = 'auto';
+                        parent.style.maxHeight = 'none';
+                        parent.style.overflow = 'visible';
+                        parent = parent.parentElement;
+                    }
                 }
             },
             jsPDF: {

commit 28bc6f75dff79a5f7e9ee578be950baf1bd50d8c
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Tue Mar 3 14:16:03 2026 +0900

    fix: PDF縺ｧ蜿ｳ縺梧僑螟ｧ縺励※蟾ｦ縺瑚ｦ句・繧後ｋ閾ｴ蜻ｽ逧・ヰ繧ｰ縺ｮ譛邨りｧ｣豎ｺ遲悶→縺励※縲｛nclone蜀・〒DOM蜈ｨ菴薙ｒ遐ｴ螢翫＠繝励Ξ繝薙Η繝ｼ鬆伜沺縺ｮ縺ｿ繧鍛ody逶ｴ荳九・蟾ｦ荳顔ｫｯ(0,0)縺ｫ邨ｶ蟇ｾ蜀埼・鄂ｮ縺吶ｋ螳悟・繝ｪ繧ｻ繝・ヨ蜃ｦ逅・ｒ蟆主・

diff --git a/js/pdf.js b/js/pdf.js
index 9a0df6a..8d62823 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -36,57 +36,43 @@ function generatePDF() {
                 scrollY: 0,
                 windowWidth: 794, // 繧ｭ繝｣繝励メ繝｣縺ｮ讓ｪ蟷・ｒA4逶ｸ蠖・794px)縺ｫ蝗ｺ螳・                 onclone: function (clonedDoc) {
-                    // PDF逕滓・逕ｨ縺ｮ繧ｯ繝ｭ繝ｼ繝ｳDOM蜀・〒縲∫判髱｢縺ｮ荳ｭ螟ｮ陦ｨ遉ｺ逕ｨ縺ｫ菴ｿ繧上ｌ縺ｦ縺・ｋ margin: 0 auto; 縺ｪ縺ｩ縺ｮ
-                    // 菴吝・縺ｪ繝ｬ繧､繧｢繧ｦ繝郁ｨｭ螳壹ｒ蠑ｷ蛻ｶ隗｣髯､縺励、4逕ｨ邏呎棧繧貞次轤ｹ(0, 0)縺ｫ繝薙ち豁｢繧√＆縺帙ｋ
+                    // PDF逕滓・逕ｨ縺ｮ繧ｯ繝ｭ繝ｼ繝ｳDOM蜀・〒縲∫判髱｢縺ｮ荳ｭ螟ｮ陦ｨ遉ｺ逕ｨ縺ｫ菴ｿ繧上ｌ縺ｦ縺・ｋ margin 繧・Δ繝ｼ繝繝ｫ縺ｮ譫邨・∩縺ｪ縺ｩ
+                    // html2canvas 縺ｮ蠎ｧ讓呵ｨ育ｮ励ｒ迢ゅｏ縺帙ｋ・域僑螟ｧ繧・ｷｦ隕句・繧後・・牙次蝗縺ｨ縺ｪ繧九☆縺ｹ縺ｦ縺ｮ隕∫ｴ繧貞ｮ悟・縺ｫ遐ｴ螢翫＠縲・+                    // 邏皮ｲ九↑ A4繝励Ξ繝薙Η繝ｼ鬆伜沺・・94px・峨□縺代ｒ邨ｶ蟇ｾ蠎ｧ讓・0,0)縺ｫ蜀埼・鄂ｮ縺吶ｋ譛蠑ｷ縺ｮ繝上ャ繧ｯ縲・+
+                    const target = clonedDoc.getElementById('previewContent');
+                    if (!target) return;
 
                     // 1. 蜷・・繝ｼ繧ｸ・・print-page・峨・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
-                    const pages = clonedDoc.querySelectorAll('.print-page');
+                    const pages = target.querySelectorAll('.print-page');
                     pages.forEach(page => {
                         page.style.margin = '0';
                         page.style.boxSizing = 'border-box';
                     });
 
                     // 2. 繝励Ξ繝薙Η繝ｼ閾ｪ菴薙・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
-                    const preview = clonedDoc.getElementById('printPreview');
-                    if (preview) {
-                        preview.style.margin = '0';
-                        preview.style.padding = '0';
-                    }
+                    const preview = target.querySelector('#printPreview') || target;
+                    preview.style.margin = '0';
+                    preview.style.padding = '0';
+
+                    // 3. 繧ｿ繝ｼ繧ｲ繝・ヨ隕∫ｴ繧偵√Δ繝ｼ繝繝ｫ遲峨・縺吶∋縺ｦ縺ｮ隕ｪ隕∫ｴ縺九ｉ蠑輔″蜑･縺後☆縺溘ａ縺ｮ莠句燕貅門ｙ
+                    target.style.position = 'absolute';
+                    target.style.top = '0';
+                    target.style.left = '0';
+                    target.style.margin = '0';
+                    target.style.padding = '0';
+                    target.style.width = '794px';
+                    target.style.background = '#fff';
 
-                    // 3. body閾ｪ菴薙・菴咏區繧ょｮ悟・縺ｫ繧ｼ繝ｭ縺ｫ縺励’lex繧・そ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ繧定ｧ｣髯､
+                    // 4. 繧ｯ繝ｭ繝ｼ繝ｳ縺輔ｌ縺櫂OM縺ｮBODY繧貞ｮ悟・縺ｫ譖ｴ蝨ｰ・育悄縺｣逋ｽ・峨↓縺吶ｋ
+                    clonedDoc.body.innerHTML = '';
                     clonedDoc.body.style.margin = '0';
                     clonedDoc.body.style.padding = '0';
-                    clonedDoc.body.style.display = 'block';
-
-                    // 4. 繝｢繝ｼ繝繝ｫ遲峨・蠖ｱ髻ｿ繧呈賜髯､縺吶ｋ縺溘ａ縲∬ｦｪ繝弱・繝峨ｒ驕｡縺｣縺ｦ繝槭・繧ｸ繝ｳ縺ｨ繝代ョ繧｣繝ｳ繧ｰ繧堤┌蜉ｹ蛹・-                    let parent = clonedDoc.getElementById('previewContent').parentElement;
-                    while (parent && parent !== clonedDoc.body) {
-                        parent.style.margin = '0';
-                        parent.style.padding = '0';
-                        parent.style.display = 'block'; // flex繧定ｧ｣髯､縺鈴壼ｸｸ邵ｦ遨阪∩縺ｫ
-
-                        // height, max-height, overflow縺ｮ蛻ｶ髯舌ｒ螳悟・隗｣髯､・医％繧後〒繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ隕句・繧後ｒ髦ｲ縺撰ｼ・-                        parent.style.height = 'auto';
-                        parent.style.maxHeight = 'none';
-                        parent.style.overflow = 'visible';
-
-                        // 荳逡ｪ螟匁棧縺ｮ繝｢繝ｼ繝繝ｫ閭梧勹縺縺代・蟾ｦ荳翫↓邨ｶ蟇ｾ蝗ｺ螳壹＠逶ｴ縺呻ｼ医＆繧ゅ↑縺・→荳九↓關ｽ縺｡縺ｦ逋ｽ邏吶↓縺ｪ繧具ｼ・-                        if (parent.id === 'previewModal') {
-                            parent.style.position = 'absolute';
-                            parent.style.top = '0';
-                            parent.style.left = '0';
-                            parent.style.width = '794px';
-                            parent.style.background = '#fff';
-                        } else {
-                            // 縺昴ｌ莉･螟悶・荳ｭ髢薙さ繝ｳ繝・リ縺ｯstatic縺ｧ螳牙・縺ｫ豬√＠霎ｼ繧
-                            parent.style.position = 'static';
-                            parent.style.width = 'auto';
-                            parent.style.maxWidth = 'none';
-                        }
+                    clonedDoc.body.style.background = '#fff';
 
-                        parent.style.transform = 'none';
-                        parent = parent.parentElement;
-                    }
+                    // 5. 縺輔″縺ｻ縺ｩ蠑輔″蜑･縺後＠縺溽ｴ泌ｺｦ100%縺ｮ繧ｿ繝ｼ繧ｲ繝・ヨ隕∫ｴ縺縺代ｒ縲∽ｽ輔ｂ縺ｪ縺ВODY縺ｮ蟾ｦ荳翫↓繝昴ヤ繝ｳ縺ｨ驟咲ｽｮ縺吶ｋ
+                    // 縺薙ｌ縺ｫ繧医ｊ縲√Δ繝ｼ繝繝ｫ縺ｮ繧ｻ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ菴咏區繧・せ繧ｯ繝ｭ繝ｼ繝ｫ驥上↑縺ｩ縺ｮ縺ゅｉ繧・ｋ蠎ｧ讓呵ｨ育ｮ励お繝ｩ繝ｼ縺檎黄逅・噪縺ｫ逋ｺ逕溘＠縺ｪ縺上↑繧・+                    clonedDoc.body.appendChild(target);
                 }
             },
             jsPDF: {

commit 99c32486b33045bb34e11ff7c94452d5cc4f20a1
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Mon Mar 2 15:41:55 2026 +0900

    fix: PDF逋ｽ邏吝喧縺ｮ譬ｹ譛ｬ隗｣豎ｺ・・nclone譎ゅ↓繝励Ξ繝薙Η繝ｼ繝｢繝ｼ繝繝ｫ縺茎tatic縺ｫ縺ｪ繧顔判髱｢荳矩Κ縺ｸ關ｽ縺｡縺ｦ縺励∪縺・ｸ榊・蜷医ｒabsolute蝗ｺ螳壹〒蝗樣∩縺励｛verflow縺ｫ繧医ｋ隕句・繧悟宛髯舌ｂ邯ｲ鄒・噪縺ｫ隗｣髯､・・
diff --git a/js/pdf.js b/js/pdf.js
index 00c0809..9a0df6a 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -63,8 +63,27 @@ function generatePDF() {
                     while (parent && parent !== clonedDoc.body) {
                         parent.style.margin = '0';
                         parent.style.padding = '0';
-                        parent.style.display = 'block';
-                        parent.style.position = 'static';
+                        parent.style.display = 'block'; // flex繧定ｧ｣髯､縺鈴壼ｸｸ邵ｦ遨阪∩縺ｫ
+
+                        // height, max-height, overflow縺ｮ蛻ｶ髯舌ｒ螳悟・隗｣髯､・医％繧後〒繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ隕句・繧後ｒ髦ｲ縺撰ｼ・+                        parent.style.height = 'auto';
+                        parent.style.maxHeight = 'none';
+                        parent.style.overflow = 'visible';
+
+                        // 荳逡ｪ螟匁棧縺ｮ繝｢繝ｼ繝繝ｫ閭梧勹縺縺代・蟾ｦ荳翫↓邨ｶ蟇ｾ蝗ｺ螳壹＠逶ｴ縺呻ｼ医＆繧ゅ↑縺・→荳九↓關ｽ縺｡縺ｦ逋ｽ邏吶↓縺ｪ繧具ｼ・+                        if (parent.id === 'previewModal') {
+                            parent.style.position = 'absolute';
+                            parent.style.top = '0';
+                            parent.style.left = '0';
+                            parent.style.width = '794px';
+                            parent.style.background = '#fff';
+                        } else {
+                            // 縺昴ｌ莉･螟悶・荳ｭ髢薙さ繝ｳ繝・リ縺ｯstatic縺ｧ螳牙・縺ｫ豬√＠霎ｼ繧
+                            parent.style.position = 'static';
+                            parent.style.width = 'auto';
+                            parent.style.maxWidth = 'none';
+                        }
+
                         parent.style.transform = 'none';
                         parent = parent.parentElement;
                     }

commit e4859528abf306719c2dbcea674c499261b6b94c
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Sat Feb 28 14:21:24 2026 +0900

    fix: PDF縺檎區邏吶↓縺ｪ繧句撫鬘後ｒ繝励Ξ繝薙Η繝ｼDOM縺ｮ逶ｴ謗･謠冗判縺ｸ謌ｻ縺吶％縺ｨ縺ｧ隗｣豎ｺ縺励∝承隕句・繧悟撫鬘後・onclone蜀・〒縺ｮ margin: 0 auto; 縺ｮ蠑ｷ蛻ｶ蜑企勁・医そ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ隗｣髯､・峨↓繧医▲縺ｦ譬ｹ譛ｬ隗｣豎ｺ

diff --git a/js/pdf.js b/js/pdf.js
index 630284f..00c0809 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -15,35 +15,17 @@ function generatePDF() {
             filename = `${dateStr}_${plateSerial}_霆頑､懆ｦ狗ｩ肴嶌`;
         }
 
-        // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ・-        const sourceElement = document.getElementById('previewContent');
+        // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ暦ｼ域里蟄倥・DOM繧堤峩謗･繧ｭ繝｣繝励メ繝｣縺吶ｋ・・+        const element = document.getElementById('previewContent');
 
-        if (!sourceElement || !sourceElement.innerHTML) {
+        if (!element || !element.innerHTML) {
             alert('繝励Ξ繝薙Η繝ｼ蜀・ｮｹ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲ょ・縺ｫ繝励Ξ繝薙Η繝ｼ繧定｡ｨ遉ｺ縺励※縺上□縺輔＞縲・);
             return;
         }
 
-        // 譌｢蟄倥・繝｢繝ｼ繝繝ｫ蜀・・DOM繧偵◎縺ｮ縺ｾ縺ｾ繧ｭ繝｣繝励メ繝｣縺吶ｋ縺ｨ逕ｻ髱｢荳翫・繧ｻ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ繧・-        // Bootstrap縲√ヵ繝ｬ繝・け繧ｹ繝懊ャ繧ｯ繧ｹ縺ｮ菴咏區縺ｪ縺ｩ繧檀tml2canvas縺悟ｷｻ縺崎ｾｼ繧薙〒
-        // 繝ｬ繧､繧｢繧ｦ繝亥ｴｩ繧鯉ｼ亥承蛻・ｌ繝ｻ隰弱・蟾ｦ繝槭・繧ｸ繝ｳ・峨ｒ蠑輔″襍ｷ縺薙☆縺溘ａ縲・-        // 螳悟・縺ｫ繧ｯ繝ｪ繝ｼ繝ｳ縺ｪ縲窟4繧ｵ繧､繧ｺ(794px)縺ｮ騾乗・縺ｪ莉ｮ諠ｳ繧ｳ繝ｳ繝・リ縲阪ｒ菴懊▲縺ｦ繧ｭ繝｣繝励メ繝｣縺輔○繧九・-        const pdfContainer = document.createElement('div');
-        pdfContainer.style.position = 'absolute';
-        pdfContainer.style.top = '0px';
-        pdfContainer.style.left = '0px';
-        pdfContainer.style.zIndex = '999999'; // 逕ｻ髱｢縺ｮ譛蜑埼擇縺ｫ荳譎ら噪縺ｫ陦ｨ遉ｺ縺励※遒ｺ螳溘↓謦ｮ蠖ｱ縺輔○繧・-        pdfContainer.style.width = '794px'; // 96dpi縺ｧ縺ｮA4讓ｪ蟷・・霑台ｼｼ蛟､縺ｫ螳悟・蝗ｺ螳・-        pdfContainer.style.backgroundColor = '#ffffff';
-        pdfContainer.style.margin = '0';
-        pdfContainer.style.padding = '0';
-
-        // 繝励Ξ繝薙Η繝ｼ縺ｮ蜀・ｮｹ繧偵さ繝斐・
-        pdfContainer.innerHTML = sourceElement.innerHTML;
-        document.body.appendChild(pdfContainer);
-
         // html2pdf縺ｮ繧ｪ繝励す繝ｧ繝ｳ
         const opt = {
-            margin: 0, // 菴呵ｨ医↑繝槭・繧ｸ繝ｳ縺ｯ菴懊ｉ縺咾SS縺ｮpadding縺ｫ莉ｻ縺帙ｋ
+            margin: 0, // 繝槭・繧ｸ繝ｳ縺ｯ繧ｼ繝ｭ・・SS蛛ｴ縺ｮpadding: 40px縺ｫ縺吶∋縺ｦ莉ｻ縺帙ｋ・・             filename: filename + '.pdf',
             image: { type: 'jpeg', quality: 0.98 },
             html2canvas: {
@@ -52,7 +34,41 @@ function generatePDF() {
                 logging: false,
                 scrollX: 0,
                 scrollY: 0,
-                windowWidth: 794 // 繧ｭ繝｣繝励メ繝｣蟷・ｒA4逶ｸ蠖薙↓蝗ｺ螳・+                windowWidth: 794, // 繧ｭ繝｣繝励メ繝｣縺ｮ讓ｪ蟷・ｒA4逶ｸ蠖・794px)縺ｫ蝗ｺ螳・+                onclone: function (clonedDoc) {
+                    // PDF逕滓・逕ｨ縺ｮ繧ｯ繝ｭ繝ｼ繝ｳDOM蜀・〒縲∫判髱｢縺ｮ荳ｭ螟ｮ陦ｨ遉ｺ逕ｨ縺ｫ菴ｿ繧上ｌ縺ｦ縺・ｋ margin: 0 auto; 縺ｪ縺ｩ縺ｮ
+                    // 菴吝・縺ｪ繝ｬ繧､繧｢繧ｦ繝郁ｨｭ螳壹ｒ蠑ｷ蛻ｶ隗｣髯､縺励、4逕ｨ邏呎棧繧貞次轤ｹ(0, 0)縺ｫ繝薙ち豁｢繧√＆縺帙ｋ
+
+                    // 1. 蜷・・繝ｼ繧ｸ・・print-page・峨・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
+                    const pages = clonedDoc.querySelectorAll('.print-page');
+                    pages.forEach(page => {
+                        page.style.margin = '0';
+                        page.style.boxSizing = 'border-box';
+                    });
+
+                    // 2. 繝励Ξ繝薙Η繝ｼ閾ｪ菴薙・繝槭・繧ｸ繝ｳ繧偵Μ繧ｻ繝・ヨ
+                    const preview = clonedDoc.getElementById('printPreview');
+                    if (preview) {
+                        preview.style.margin = '0';
+                        preview.style.padding = '0';
+                    }
+
+                    // 3. body閾ｪ菴薙・菴咏區繧ょｮ悟・縺ｫ繧ｼ繝ｭ縺ｫ縺励’lex繧・そ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ繧定ｧ｣髯､
+                    clonedDoc.body.style.margin = '0';
+                    clonedDoc.body.style.padding = '0';
+                    clonedDoc.body.style.display = 'block';
+
+                    // 4. 繝｢繝ｼ繝繝ｫ遲峨・蠖ｱ髻ｿ繧呈賜髯､縺吶ｋ縺溘ａ縲∬ｦｪ繝弱・繝峨ｒ驕｡縺｣縺ｦ繝槭・繧ｸ繝ｳ縺ｨ繝代ョ繧｣繝ｳ繧ｰ繧堤┌蜉ｹ蛹・+                    let parent = clonedDoc.getElementById('previewContent').parentElement;
+                    while (parent && parent !== clonedDoc.body) {
+                        parent.style.margin = '0';
+                        parent.style.padding = '0';
+                        parent.style.display = 'block';
+                        parent.style.position = 'static';
+                        parent.style.transform = 'none';
+                        parent = parent.parentElement;
+                    }
+                }
             },
             jsPDF: {
                 unit: 'mm',
@@ -65,18 +81,14 @@ function generatePDF() {
         };
 
         // PDF繧堤函謌舌＠縺ｦ繝繧ｦ繝ｳ繝ｭ繝ｼ繝・-        html2pdf().set(opt).from(pdfContainer).save().then(() => {
+        html2pdf().set(opt).from(element).save().then(() => {
             console.log('PDF菫晏ｭ伜ｮ御ｺ・', filename);
-            document.body.removeChild(pdfContainer); // 莉ｮ諠ｳ繧ｳ繝ｳ繝・リ繧偵♀迚・ｻ倥￠
 
             if (userName) {
                 alert(`PDF菫晏ｭ倥＠縺ｾ縺励◆・―n\n刀 繝輔ぃ繧､繝ｫ蜷・ ${filename}.pdf\n\n庁 繝偵Φ繝・ 繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨ヵ繧ｩ繝ｫ繝縺九ｉ\n縲瑚ｻ頑､懆ｦ狗ｩ阪ｊ繝・・繧ｿ縲阪ヵ繧ｩ繝ｫ繝縺ｫ遘ｻ蜍輔☆繧九→謨ｴ逅・＠繧・☆縺上↑繧翫∪縺吶Ａ);
             }
         }).catch(err => {
             console.error('PDF逕滓・繧ｨ繝ｩ繝ｼ:', err);
-            if (document.body.contains(pdfContainer)) {
-                document.body.removeChild(pdfContainer);
-            }
             alert('PDF逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
             // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: 蜊ｰ蛻ｷ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・             window.print();

commit 6ad256cf5c3625f8f9a9b2ddf524f16d59391b26
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Sat Feb 28 14:07:48 2026 +0900

    fix: PDF蜃ｺ蜉帷判髱｢縺檎悄縺｣逋ｽ縺ｫ縺ｪ繧句撫鬘後・菫ｮ豁｣・井ｻｮ諠ｳA4繧ｳ繝ｳ繝・リ繧築-index:999999縺ｧ荳譎ら噪縺ｫ譛蜑埼擇陦ｨ遉ｺ縺励”tml2canvas縺ｫ遒ｺ螳溘↓謠冗判縺輔○繧具ｼ・
diff --git a/js/pdf.js b/js/pdf.js
index e0993eb..630284f 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -31,7 +31,7 @@ function generatePDF() {
         pdfContainer.style.position = 'absolute';
         pdfContainer.style.top = '0px';
         pdfContainer.style.left = '0px';
-        pdfContainer.style.zIndex = '-9999'; // 逕ｻ髱｢縺ｮ陬丞・縺ｫ髫縺・+        pdfContainer.style.zIndex = '999999'; // 逕ｻ髱｢縺ｮ譛蜑埼擇縺ｫ荳譎ら噪縺ｫ陦ｨ遉ｺ縺励※遒ｺ螳溘↓謦ｮ蠖ｱ縺輔○繧・         pdfContainer.style.width = '794px'; // 96dpi縺ｧ縺ｮA4讓ｪ蟷・・霑台ｼｼ蛟､縺ｫ螳悟・蝗ｺ螳・         pdfContainer.style.backgroundColor = '#ffffff';
         pdfContainer.style.margin = '0';

commit 78b700267ef2846bff06427d8604a3d795e09c9e
Author: okazakiyoshio0823 <okazakiyoshio0823@example.com>
Date:   Sat Feb 28 00:27:20 2026 +0900

    fix: html2canvas縺ｮ繝ｬ繧､繧｢繧ｦ繝亥ｴｩ繧悟ｯｾ遲悶→縺励※縲∫判髱｢荳翫・繝励Ξ繝薙Η繝ｼ繧堤峩謗･繧ｭ繝｣繝励メ繝｣縺帙★邨ｶ蟇ｾ蠎ｧ讓・top:0, left:0)縺ｫ驟咲ｽｮ縺励◆螳悟・蝗ｺ螳壼ｹ・・荳榊庄隕悶さ繝ｳ繝・リ繧偵け繝ｭ繝ｼ繝ｳ蜈・↓縺吶ｋ繧医≧generatePDF繧呈隼菫ｮ

diff --git a/js/pdf.js b/js/pdf.js
index 78e76a7..e0993eb 100644
--- a/js/pdf.js
+++ b/js/pdf.js
@@ -16,62 +16,43 @@ function generatePDF() {
         }
 
         // 繝励Ξ繝薙Η繝ｼ繧ｳ繝ｳ繝・Φ繝・ｒ蜿門ｾ・-        const element = document.getElementById('previewContent');
+        const sourceElement = document.getElementById('previewContent');
 
-        if (!element || !element.innerHTML) {
+        if (!sourceElement || !sourceElement.innerHTML) {
             alert('繝励Ξ繝薙Η繝ｼ蜀・ｮｹ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲ょ・縺ｫ繝励Ξ繝薙Η繝ｼ繧定｡ｨ遉ｺ縺励※縺上□縺輔＞縲・);
             return;
         }
 
+        // 譌｢蟄倥・繝｢繝ｼ繝繝ｫ蜀・・DOM繧偵◎縺ｮ縺ｾ縺ｾ繧ｭ繝｣繝励メ繝｣縺吶ｋ縺ｨ逕ｻ髱｢荳翫・繧ｻ繝ｳ繧ｿ繝ｪ繝ｳ繧ｰ繧・+        // Bootstrap縲√ヵ繝ｬ繝・け繧ｹ繝懊ャ繧ｯ繧ｹ縺ｮ菴咏區縺ｪ縺ｩ繧檀tml2canvas縺悟ｷｻ縺崎ｾｼ繧薙〒
+        // 繝ｬ繧､繧｢繧ｦ繝亥ｴｩ繧鯉ｼ亥承蛻・ｌ繝ｻ隰弱・蟾ｦ繝槭・繧ｸ繝ｳ・峨ｒ蠑輔″襍ｷ縺薙☆縺溘ａ縲・+        // 螳悟・縺ｫ繧ｯ繝ｪ繝ｼ繝ｳ縺ｪ縲窟4繧ｵ繧､繧ｺ(794px)縺ｮ騾乗・縺ｪ莉ｮ諠ｳ繧ｳ繝ｳ繝・リ縲阪ｒ菴懊▲縺ｦ繧ｭ繝｣繝励メ繝｣縺輔○繧九・+        const pdfContainer = document.createElement('div');
+        pdfContainer.style.position = 'absolute';
+        pdfContainer.style.top = '0px';
+        pdfContainer.style.left = '0px';
+        pdfContainer.style.zIndex = '-9999'; // 逕ｻ髱｢縺ｮ陬丞・縺ｫ髫縺・+        pdfContainer.style.width = '794px'; // 96dpi縺ｧ縺ｮA4讓ｪ蟷・・霑台ｼｼ蛟､縺ｫ螳悟・蝗ｺ螳・+        pdfContainer.style.backgroundColor = '#ffffff';
+        pdfContainer.style.margin = '0';
+        pdfContainer.style.padding = '0';
+
+        // 繝励Ξ繝薙Η繝ｼ縺ｮ蜀・ｮｹ繧偵さ繝斐・
+        pdfContainer.innerHTML = sourceElement.innerHTML;
+        document.body.appendChild(pdfContainer);
+
         // html2pdf縺ｮ繧ｪ繝励す繝ｧ繝ｳ
         const opt = {
-            margin: 0, // 繝槭・繧ｸ繝ｳ縺ｯ0! 縺吶∋縺ｦCSS縺ｮpadding縺ｫ莉ｻ縺帙ｋ
+            margin: 0, // 菴呵ｨ医↑繝槭・繧ｸ繝ｳ縺ｯ菴懊ｉ縺咾SS縺ｮpadding縺ｫ莉ｻ縺帙ｋ
             filename: filename + '.pdf',
             image: { type: 'jpeg', quality: 0.98 },
             html2canvas: {
                 scale: 2,
                 useCORS: true,
                 logging: false,
-                windowWidth: 794, // 莉ｮ諠ｳA4讓ｪ繝斐け繧ｻ繝ｫ蟷・↓螳悟・縺ｫ繝ｭ繝・け
-                onclone: function (clonedDoc) {
-                    // 1. 繧ｭ繝｣繝励メ繝｣蟇ｾ雎｡・・reviewContent・峨・蜿門ｾ・-                    const target = clonedDoc.getElementById('previewContent');
-                    if (target) {
-                        // 2. 繧ｿ繝ｼ繧ｲ繝・ヨ閾ｪ霄ｫ縺ｮ繝槭・繧ｸ繝ｳ繝ｻ繝代ョ繧｣繝ｳ繧ｰ繧偵Μ繧ｻ繝・ヨ縺輸4蟷・ｒ蠑ｷ蛻ｶ
-                        target.style.margin = '0';
-                        target.style.padding = '0';
-                        target.style.width = '794px';
-                        target.style.boxSizing = 'border-box';
-
-                        // 蜀・Κ縺ｮprintPreview繧ｳ繝ｳ繝・リ繧ゅ・繝ｼ繧ｸ繝ｳ繧定ｧ｣髯､
-                        const preview = clonedDoc.getElementById('printPreview');
-                        if (preview) {
-                            preview.style.margin = '0';
-                            preview.style.width = '794px';
-                        }
-
-                        // 3. 隕ｪ隕∫ｴ・医Δ繝ｼ繝繝ｫ縺ｮ譫邨・∩縺ｪ縺ｩ・峨ｒ縺吶∋縺ｦ驕｡縺｣縺ｦ繝ｬ繧､繧｢繧ｦ繝亥宛邏・ｒ邊臥輔☆繧・-                        // ・・lexbox縺ｫ繧医ｋ荳ｭ螟ｮ蟇・○縺ｪ縺ｩ縺ｮ繧ｪ繝輔そ繝・ヨ隱､邂励ｒ螳悟・縺ｫ謗帝勁縺吶ｋ縺溘ａ・・-                        let parent = target.parentElement;
-                        while (parent && parent !== clonedDoc.body) {
-                            parent.style.margin = '0';
-                            parent.style.padding = '0';
-                            parent.style.width = 'auto';
-                            parent.style.maxWidth = 'none';
-                            parent.style.position = 'static';
-                            parent.style.transform = 'none';
-                            parent.style.display = 'block'; // flex繧・rid繧定ｧ｣髯､
-                            parent.style.overflow = 'visible';
-                            parent.style.border = 'none';
-                            parent = parent.parentElement;
-                        }
-
-                        // Body縺ｮ菴咏區繧ゅぞ繝ｭ縺ｫ
-                        clonedDoc.body.style.margin = '0';
-                        clonedDoc.body.style.padding = '0';
-                        clonedDoc.body.style.display = 'block';
-                    }
-                }
+                scrollX: 0,
+                scrollY: 0,
+                windowWidth: 794 // 繧ｭ繝｣繝励メ繝｣蟷・ｒA4逶ｸ蠖薙↓蝗ｺ螳・             },
             jsPDF: {
                 unit: 'mm',
@@ -84,15 +65,18 @@ function generatePDF() {
         };
 
         // PDF繧堤函謌舌＠縺ｦ繝繧ｦ繝ｳ繝ｭ繝ｼ繝・-        html2pdf().set(opt).from(element).save().then(() => {
+        html2pdf().set(opt).from(pdfContainer).save().then(() => {
             console.log('PDF菫晏ｭ伜ｮ御ｺ・', filename);
+            document.body.removeChild(pdfContainer); // 莉ｮ諠ｳ繧ｳ繝ｳ繝・リ繧偵♀迚・ｻ倥￠
 
-            // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ繝偵Φ繝医ｒ陦ｨ遉ｺ・医ヶ繝ｩ繧ｦ繧ｶ縺ｮ蛻ｶ髯舌〒菫晏ｭ伜・繝輔か繝ｫ繝縺ｯ逶ｴ謗･謖・ｮ壹〒縺阪↑縺・◆繧・ｼ・             if (userName) {
                 alert(`PDF菫晏ｭ倥＠縺ｾ縺励◆・―n\n刀 繝輔ぃ繧､繝ｫ蜷・ ${filename}.pdf\n\n庁 繝偵Φ繝・ 繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨ヵ繧ｩ繝ｫ繝縺九ｉ\n縲瑚ｻ頑､懆ｦ狗ｩ阪ｊ繝・・繧ｿ縲阪ヵ繧ｩ繝ｫ繝縺ｫ遘ｻ蜍輔☆繧九→謨ｴ逅・＠繧・☆縺上↑繧翫∪縺吶Ａ);
             }
         }).catch(err => {
             console.error('PDF逕滓・繧ｨ繝ｩ繝ｼ:', err);
+            if (document.body.contains(pdfContainer)) {
+                document.body.removeChild(pdfContainer);
+            }
             alert('PDF逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅヶ繝ｩ繧ｦ繧ｶ縺ｮ蜊ｰ蛻ｷ讖溯・繧偵♀隧ｦ縺励￥縺縺輔＞縲・);
             // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: 蜊ｰ蛻ｷ繝繧､繧｢繝ｭ繧ｰ繧帝幕縺・             window.print();
