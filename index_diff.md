diff --git a/index.html b/index.html
index 3307cc7..8eb8e11 100644
--- a/index.html
+++ b/index.html
@@ -144,9 +144,8 @@
             /* 繝励Ξ繝薙Η繝ｼ繝｢繝ｼ繝繝ｫ縺ｨ縺昴・繧ｳ繝ｳ繝・Φ繝・□縺代ｒ蜊ｰ蛻ｷ蟇ｾ雎｡縺ｫ縺吶ｋ */
             #previewModal {
                 display: block !important;
-                position: absolute !important;
-                top: 0 !important;
-                left: 0 !important;
+                position: static !important;
+                /* 邨ｶ蟇ｾ驟咲ｽｮ縺ｫ縺吶ｋ縺ｨ繝悶Λ繧ｦ繧ｶ蜊ｰ蛻ｷ譎ゅ↓謾ｹ繝壹・繧ｸ縺輔ｌ縺・譫夂岼莉･髯阪′逋ｽ邏吶↓縺ｪ繧九◆繧∽ｿｮ豁｣ */
                 width: 100% !important;
                 height: auto !important;
                 background: white !important;
@@ -158,32 +157,22 @@
             /* 蜊ｰ蛻ｷ繝励Ξ繝薙Η繝ｼ鬆伜沺縺ｮ陦ｨ遉ｺ */
             #printPreview {
                 display: block !important;
-                position: absolute;
-                top: 0;
-                left: 0;
-                width: 100%;
-                margin: 0;
-                padding: 0;
-                border: none;
-                box-shadow: none;
+                max-width: 1000px;
+                margin: 0 auto;
                 background-color: white;
             }
 
-            /* 蝗ｺ螳壹・繝ｼ繧ｸ繝ｬ繧､繧｢繧ｦ繝育畑 */
+            /* 蝗ｺ螳壹・繝ｼ繧ｸ繝ｬ繧､繧｢繧ｦ繝育畑 (螳悟・縺ｫ794px = A4 繝斐け繧ｻ繝ｫ蝗ｺ螳・ */
             .print-page {
-                width: 100%;
-                /* A4鬮倥＆: 邏・123px - 菴咏區縺ｪ縺ｩ繧定・・縺励※隱ｿ謨ｴ
-                   1115px縺縺ｨ繧ｮ繝ｪ繧ｮ繝ｪ縺吶℃縺ｦ谺｡繝壹・繧ｸ縺後≠縺上％縺ｨ縺後≠繧九◆繧√・
-                   蟆代＠菴呵｣輔ｒ謖√▲縺ｦ蟆上＆縺上☆繧・(1123px - 50px遞句ｺｦ) */
-                height: 1080px;
+                width: 794px;
+                height: 1123px;
+                margin: 0 auto;
+                background: #fff;
                 page-break-after: always;
                 position: relative;
-                /* 蜊ｰ蛻ｷ譎ゅ・蜀・Κ菴咏區 */
-                padding: 40px 50px;
+                /* 蜊ｰ蛻ｷ譎ゅ・蜀・Κ菴咏區・医ヵ繝・ち繝ｼ逕ｨ縺ｪ縺ｩ縺ｮ髫咎俣繧堤｢ｺ菫晢ｼ・*/
+                padding: 40px;
                 box-sizing: border-box;
-                display: flex;
-                flex-direction: column;
-                /* overflow: hidden; 縺ｯ縺ｿ蜃ｺ縺励ｒ遒ｺ隱阪〒縺阪ｋ繧医≧縺ｫ荳譌ｦ螟悶☆縺薙→繧よ､懆ｨ弱□縺後√Ξ繧､繧｢繧ｦ繝育ｶｭ謖√・縺溘ａ谿九☆ */
                 overflow: hidden;
             }
 
@@ -196,7 +185,7 @@
                 display: flex;
                 justify-content: space-between;
                 align-items: flex-end;
-                margin-bottom: 30px;
+                margin-bottom: 20px;
                 border-bottom: 2px solid #333;
                 padding-bottom: 10px;
             }
@@ -242,14 +231,12 @@
 
             /* 邏・ｬｾ繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ・域怙邨ゅ・繝ｼ繧ｸ逕ｨ・・*/
             .terms-section {
-                margin-top: auto;
-                /* 繝壹・繧ｸ荳矩Κ縺ｫ謚ｼ縺嶺ｸ九￡繧・*/
+                clear: both;
+                margin-top: 30px;
                 border: 2px solid #555;
                 padding: 20px;
                 font-size: 0.85em;
                 background-color: #fff;
-                flex-grow: 1;
-                /* 谿九ｊ縺ｮ繧ｹ繝壹・繧ｹ繧貞沂繧√ｋ */
             }
 
             /* 繝｢繝ｼ繝繝ｫ髢｢騾｣縺ｮ蠑ｷ蛻ｶ荳頑嶌縺阪Μ繧ｻ繝・ヨ・亥ｿｵ縺ｮ縺溘ａ・・*/
