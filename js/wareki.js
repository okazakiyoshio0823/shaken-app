// ============================================================
// 和暦（Wareki）入力機能
// ============================================================

/**
 * 和暦→西暦 変換関数
 * @param {string} era - 年号（'令和', '平成', '昭和'）
 * @param {number} year - 和暦の年
 * @param {number} month - 月（1-12）
 * @param {number} day - 日（1-31）
 * @returns {Date|null} 西暦のDateオブジェクト、無効な場合はnull
 */
function convertWarekiToSeireki(era, year, month, day) {
    if (!era || !year || !month || !day) return null;

    let seirekiYear;

    switch (era) {
        case '令和':
            seirekiYear = 2018 + parseInt(year);
            break;
        case '平成':
            seirekiYear = 1988 + parseInt(year);
            break;
        case '昭和':
            seirekiYear = 1925 + parseInt(year);
            break;
        default:
            return null;
    }

    const date = new Date(seirekiYear, parseInt(month) - 1, parseInt(day));

    // 有効な日付かチェック
    if (date.getMonth() !== parseInt(month) - 1) {
        return null;
    }

    return date;
}

/**
 * 西暦→和暦 変換関数
 * @param {Date|string} date - DateオブジェクトまたはYYYY-MM-DD形式の文字列
 * @returns {Object|null} {era, year, month, day} または null
 */
function convertSeirekiToWareki(date) {
    if (!date) return null;

    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return null;

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    let era, warekiYear;

    if (year >= 2019) {
        era = '令和';
        warekiYear = year - 2018;
    } else if (year >= 1989) {
        era = '平成';
        warekiYear = year - 1988;
    } else if (year >= 1926) {
        era = '昭和';
        warekiYear = year - 1925;
    } else {
        return null; // 昭和より前は未対応
    }

    return { era, year: warekiYear, month, day };
}

/**
 * 日付入力モードを切り替え（西暦 ⇔ 和暦）
 * @param {string} fieldId - フィールドIDのプレフィックス（例: 'firstRegistration'）
 * @param {string} mode - 'seireki' または 'wareki'
 */
function toggleDateInputMode(fieldId, mode) {
    const seirekiInput = document.getElementById(fieldId);
    const warekiDiv = document.getElementById(fieldId + 'Wareki');
    const toggleButtons = document.querySelectorAll(`button[data-mode]`);

    // ボタンのアクティブ状態を更新
    toggleButtons.forEach(btn => {
        if (btn.getAttribute('data-mode') === mode && btn.closest('label')?.textContent.includes('初度登録年月日')) {
            btn.classList.add('active');
            btn.style.background = '#4CAF50';
            btn.style.color = 'white';
        } else if (btn.closest('label')?.textContent.includes('初度登録年月日')) {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.color = '#000';
        }
    });

    if (mode === 'seireki') {
        // 西暦モード
        seirekiInput.style.display = 'block';
        warekiDiv.style.display = 'none';

        // 和暦の値があれば西暦に変換
        syncWarekiToSeireki(fieldId);
    } else {
        // 和暦モード  
        seirekiInput.style.display = 'none';
        warekiDiv.style.display = 'flex';

        // 西暦の値があれば和暦に変換
        syncSeirekiToWareki(fieldId);

        // 月・日のselectを初期化
        populateDateSelects(fieldId);
    }

    // 設定を保存
    localStorage.setItem(`dateInputMode_${fieldId}`, mode);
}

/**
 * 西暦→和暦へデータ同期
 * @param {string} fieldId - フィールドIDのプレフィックス
 */
function syncSeirekiToWareki(fieldId) {
    const seirekiInput = document.getElementById(fieldId);
    const seirekiValue = seirekiInput.value;

    if (!seirekiValue) return;

    const wareki = convertSeirekiToWareki(seirekiValue);
    if (!wareki) return;

    // 和暦フィールドに値をセット
    document.getElementById(fieldId + 'Era').value = wareki.era;
    document.getElementById(fieldId + 'Year').value = wareki.year;

    // 月・日のselectを更新
    populateDateSelects(fieldId);
    document.getElementById(fieldId + 'Month').value = wareki.month;
    document.getElementById(fieldId + 'Day').value = wareki.day;
}

/**
 * 和暦→西暦へデータ同期
 * @param {string} fieldId - フィールドIDのプレフィックス
 */
function syncWarekiToSeireki(fieldId) {
    const era = document.getElementById(fieldId + 'Era').value;
    const year = document.getElementById(fieldId + 'Year').value;
    const month = document.getElementById(fieldId + 'Month').value;
    const day = document.getElementById(fieldId + 'Day').value;

    if (!era || !year || !month || !day) return;

    const date = convertWarekiToSeireki(era, year, month, day);
    if (!date) return;

    // 西暦フィールドに値をセット (YYYY-MM-DD形式)
    const seirekiValue = date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
    document.getElementById(fieldId).value = seirekiValue;
}

/**
 * 西暦フィールドの変更時に和暦フィールドを同期
 * @param {string} fieldId - フィールドIDのプレフィックス
 */
function onSeirekiChange(fieldId) {
    syncSeirekiToWareki(fieldId);
}

/**
 * 和暦フィールドの変更時に西暦フィールドを同期
 * @param {string} fieldId - フィールドIDのプレフィックス
 */
function onWarekiChange(fieldId) {
    // 年が変更されたら月・日のselectを更新（うるう年対応）
    populateDateSelects(fieldId);
    syncWarekiToSeireki(fieldId);
}

/**
 * 月・日のselectオプションを動的生成
 * @param {string} fieldId - フィールドIDのプレフィックス
 */
function populateDateSelects(fieldId) {
    const monthSelect = document.getElementById(fieldId + 'Month');
    const daySelect = document.getElementById(fieldId + 'Day');

    // 月のオプション（1-12）
    if (monthSelect && monthSelect.options.length === 1) {
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            monthSelect.appendChild(option);
        }
    }

    // 日のオプション（1-31、月に応じて調整）
    if (daySelect) {
        const selectedMonth = parseInt(monthSelect.value);
        const currentDay = daySelect.value;

        daySelect.innerHTML = '<option value="">日</option>';

        let maxDays = 31;
        if (selectedMonth) {
            if ([4, 6, 9, 11].includes(selectedMonth)) {
                maxDays = 30;
            } else if (selectedMonth === 2) {
                // うるう年の判定（簡易版）
                const era = document.getElementById(fieldId + 'Era').value;
                const year = parseInt(document.getElementById(fieldId + 'Year').value);
                let seirekiYear;

                switch (era) {
                    case '令和': seirekiYear = 2018 + year; break;
                    case '平成': seirekiYear = 1988 + year; break;
                    case '昭和': seirekiYear = 1925 + year; break;
                }

                if (seirekiYear && ((seirekiYear % 4 === 0 && seirekiYear % 100 !== 0) || seirekiYear % 400 === 0)) {
                    maxDays = 29;
                } else {
                    maxDays = 28;
                }
            }
        }

        for (let i = 1; i <= maxDays; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // 以前選択されていた日を復元（可能な範囲で）
        if (currentDay && parseInt(currentDay) <= maxDays) {
            daySelect.value = currentDay;
        }
    }
}

// ページ読み込み時に保存された設定を復元
document.addEventListener('DOMContentLoaded', () => {
    const fieldId = 'firstRegistration';
    const savedMode = localStorage.getItem(`dateInputMode_${fieldId}`) || 'seireki';

    // 月・日のselectを初期化
    populateDateSelects(fieldId);

    // 保存されたモードを適用
    if (savedMode === 'wareki') {
        toggleDateInputMode(fieldId, 'wareki');
    }
});
