// メインアプリケーションロジック
let maintenanceItems = [];
let currentLegalFees = { weightTax: 0, jibaiseki: 0, stamp: 0 };
let savedCustomers = [];
let currentCategory = 'basic';

const STORAGE_CUSTOMERS = 'shaken_customers';
const STORAGE_COMPANY = 'shaken_company';

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initializeCarMakers();
    initializeCategoryTabs();
    showCategory('basic');
    updateLegalFees();
    calculateTotals();
    initializeEnterKeyNavigation();
});

// Enterキーで次の入力欄に移動する機能
function initializeEnterKeyNavigation() {
    // 入力順序を定義（ID順）
    const inputOrder = [
        // 会社情報
        'companyName', 'companyTel', 'companyAddress',
        // 使用者情報
        'userName', 'userNameKana', 'userAddress', 'userTel', 'userEmail',
        // 所有者情報
        'ownerName', 'ownerAddress',
        // ナンバープレート
        'plateRegion', 'plateClass', 'plateHiragana', 'plateSerial',
        // 車両情報
        'carMaker', 'carNameSelect', 'carModelSelect', 'carModel', 'carName',
        'chassisNumber', 'firstRegistration', 'mileage',
        'vehicleWeight', 'vehicleAge', 'factoryType',
        // 法定費用
        'reservationFee', 'agencyFee',
        // 整備項目追加
        'newItemName', 'newItemQty', 'newItemPrice',
        // 備考
        'notes'
    ];

    // すべての入力要素にイベントリスナーを追加
    inputOrder.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.addEventListener('keydown', (e) => {
            // Enterキーが押された場合
            if (e.key === 'Enter') {
                e.preventDefault();

                // textareaの場合は改行を許可（Ctrl+Enterで次へ）
                if (element.tagName === 'TEXTAREA' && !e.ctrlKey) {
                    return;
                }

                // 次の入力要素を探す
                for (let i = index + 1; i < inputOrder.length; i++) {
                    const nextElement = document.getElementById(inputOrder[i]);
                    if (nextElement) {
                        // 所有者フィールドがhiddenの場合はスキップ
                        const ownerFields = document.getElementById('ownerFields');
                        if ((inputOrder[i] === 'ownerName' || inputOrder[i] === 'ownerAddress') &&
                            ownerFields && ownerFields.style.display === 'none') {
                            continue;
                        }

                        // 要素が表示されていて有効な場合のみフォーカス
                        if (nextElement.offsetParent !== null && !nextElement.disabled) {
                            nextElement.focus();
                            // selectの場合はドロップダウンを開く
                            if (nextElement.tagName === 'SELECT') {
                                nextElement.click();
                            }
                            break;
                        }
                    }
                }
            }
        });
    });

    console.log('Enterキーナビゲーションを初期化しました');
}

// データ読み込み
function loadSavedData() {
    const company = localStorage.getItem(STORAGE_COMPANY);
    if (company) {
        const c = JSON.parse(company);
        document.getElementById('companyName').value = c.name || '';
        document.getElementById('companyTel').value = c.tel || '';
        document.getElementById('companyAddress').value = c.address || '';
    }
    const customers = localStorage.getItem(STORAGE_CUSTOMERS);
    if (customers) savedCustomers = JSON.parse(customers);
}

// 会社情報保存
function saveCompanyInfo() {
    localStorage.setItem(STORAGE_COMPANY, JSON.stringify({
        name: document.getElementById('companyName').value,
        tel: document.getElementById('companyTel').value,
        address: document.getElementById('companyAddress').value
    }));
}

// 顧客データ保存
function saveCustomerData() {
    const plate = getPlateNumber();
    if (plate === '-') { alert('ナンバープレートを入力してください'); return; }

    const ownerSameAsUser = document.getElementById('ownerSameAsUser').checked;

    const data = {
        id: Date.now(), savedAt: new Date().toISOString(),
        // 使用者情報
        userName: document.getElementById('userName').value,
        userNameKana: document.getElementById('userNameKana').value,
        userAddress: document.getElementById('userAddress').value,
        userTel: document.getElementById('userTel').value,
        userEmail: document.getElementById('userEmail').value,
        // 所有者情報
        ownerSameAsUser: ownerSameAsUser,
        ownerName: ownerSameAsUser ? '' : document.getElementById('ownerName').value,
        ownerAddress: ownerSameAsUser ? '' : document.getElementById('ownerAddress').value,
        // 車両情報
        plateRegion: document.getElementById('plateRegion').value,
        plateClass: document.getElementById('plateClass').value,
        plateHiragana: document.getElementById('plateHiragana').value,
        plateSerial: document.getElementById('plateSerial').value,
        carName: document.getElementById('carName').value,
        carModel: document.getElementById('carModel').value,
        chassisNumber: document.getElementById('chassisNumber').value,
        firstRegistration: document.getElementById('firstRegistration').value,
        mileage: document.getElementById('mileage').value,
        vehicleWeight: document.getElementById('vehicleWeight').value,
        vehicleAge: document.getElementById('vehicleAge').value
    };

    const idx = savedCustomers.findIndex(c =>
        c.plateRegion === data.plateRegion && c.plateClass === data.plateClass &&
        c.plateHiragana === data.plateHiragana && c.plateSerial === data.plateSerial
    );
    if (idx >= 0) savedCustomers[idx] = data;
    else savedCustomers.push(data);

    localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(savedCustomers));
    saveCompanyInfo();
    alert('顧客データを保存しました');
}

function showCustomerListModal() {
    renderCustomerList();
    document.getElementById('customerListModal').classList.add('active');
}
function closeCustomerListModal() {
    document.getElementById('customerListModal').classList.remove('active');
}

function renderCustomerList(search = '') {
    const container = document.getElementById('customerListItems');
    let list = savedCustomers;
    if (search) {
        const s = search.toLowerCase();
        list = list.filter(c => (c.userName || c.customerName || '').toLowerCase().includes(s) ||
            (c.plateSerial || '').includes(s) || (c.carName || '').toLowerCase().includes(s));
    }
    list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    if (list.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px">保存されたデータがありません</div>';
        return;
    }
    container.innerHTML = list.map(c => `
        <div class="customer-list-item">
            <div class="customer-info">
                <div class="name">${escapeHtml(c.userName || c.customerName || '名前未登録')}</div>
                <div class="details">🚗 ${c.plateRegion} ${c.plateClass} ${c.plateHiragana} ${c.plateSerial} | ${escapeHtml(c.carName || '')}</div>
            </div>
            <div class="customer-actions">
                <div class="details">🚗 ${c.plateRegion} ${c.plateClass} ${c.plateHiragana} ${c.plateSerial} | ${escapeHtml(c.carName || '')}</div>
            </div>
            <div class="customer-actions">
                <button class="btn btn-primary" onclick="loadCustomerData(${c.id})">読み込む</button>
                <button class="btn btn-outline" onclick="deleteCustomerData(${c.id})">削除</button>
            </div>
        </div>
    `).join('');
}

function loadCustomerData(id) {
    const c = savedCustomers.find(x => x.id === id);
    if (!c) return;

    // 使用者情報
    document.getElementById('userName').value = c.userName || c.customerName || '';
    document.getElementById('userNameKana').value = c.userNameKana || c.customerNameKana || '';
    document.getElementById('userAddress').value = c.userAddress || c.customerAddress || '';
    document.getElementById('userTel').value = c.userTel || c.customerTel || '';
    document.getElementById('userEmail').value = c.userEmail || c.customerEmail || '';

    // 所有者情報
    const ownerSameAsUser = c.ownerSameAsUser !== false && !c.ownerName;
    document.getElementById('ownerSameAsUser').checked = ownerSameAsUser;
    document.getElementById('ownerName').value = c.ownerName || '';
    document.getElementById('ownerAddress').value = c.ownerAddress || '';
    toggleOwnerSameAsUser();

    // 車両情報
    document.getElementById('plateRegion').value = c.plateRegion || '';
    document.getElementById('plateClass').value = c.plateClass || '';
    document.getElementById('plateHiragana').value = c.plateHiragana || '';
    document.getElementById('plateSerial').value = c.plateSerial || '';
    document.getElementById('carName').value = c.carName || '';
    document.getElementById('carModel').value = c.carModel || '';
    document.getElementById('chassisNumber').value = c.chassisNumber || '';
    document.getElementById('firstRegistration').value = c.firstRegistration || '';
    document.getElementById('mileage').value = c.mileage || '';
    document.getElementById('vehicleWeight').value = c.vehicleWeight || '';
    document.getElementById('vehicleAge').value = c.vehicleAge || 'normal';
    updateLegalFees();
    closeCustomerListModal();
}

function deleteCustomerData(id) {
    if (!confirm('この顧客データを削除しますか？')) return;
    savedCustomers = savedCustomers.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(savedCustomers));
    renderCustomerList(document.getElementById('customerSearch').value);
}

function searchCustomers() {
    renderCustomerList(document.getElementById('customerSearch').value);
}

// 車種選択
function initializeCarMakers() {
    const select = document.getElementById('carMaker');
    select.innerHTML = '<option value="">選択してください</option>' +
        getCarMakers().map(m => `<option value="${m}">${m}</option>`).join('');
}

function onMakerChange() {
    const maker = document.getElementById('carMaker').value;
    const nameSelect = document.getElementById('carNameSelect');
    const modelSelect = document.getElementById('carModelSelect');
    nameSelect.innerHTML = '<option value="">選択してください</option>';
    modelSelect.innerHTML = '<option value="">車名を先に選択</option>';
    if (maker) {
        nameSelect.innerHTML += getCarNames(maker).map(n => `<option value="${n}">${n}</option>`).join('');
    }
}

function onCarNameChange() {
    const maker = document.getElementById('carMaker').value;
    const name = document.getElementById('carNameSelect').value;
    const modelSelect = document.getElementById('carModelSelect');
    const carNameInput = document.getElementById('carName');
    modelSelect.innerHTML = '<option value="">選択してください</option>';
    if (maker && name) {
        carNameInput.value = `${maker} ${name}`;
        modelSelect.innerHTML += getCarModels(maker, name).map(m =>
            `<option value="${m.model}" data-weight="${m.weight}" data-kei="${m.isKei || false}">${m.model} (${m.years})</option>`
        ).join('');
    }
}

function onModelChange() {
    const maker = document.getElementById('carMaker').value;
    const name = document.getElementById('carNameSelect').value;
    const model = document.getElementById('carModelSelect').value;
    if (!model) return;
    document.getElementById('carModel').value = model;
    const info = getCarInfoByModel(maker, name, model);
    if (info) {
        const w = document.getElementById('vehicleWeight');
        if (info.isKei) w.value = 'kei';
        else if (info.weight <= 500) w.value = '500';
        else if (info.weight <= 1000) w.value = '1000';
        else if (info.weight <= 1500) w.value = '1500';
        else if (info.weight <= 2000) w.value = '2000';
        else if (info.weight <= 2500) w.value = '2500';
        else w.value = '3000';
        updateLegalFees();
    }
}

// 法定費用
function updateLegalFees() {
    const weight = document.getElementById('vehicleWeight').value;
    const age = document.getElementById('vehicleAge').value;
    const factory = document.getElementById('factoryType').value;
    const oss = document.getElementById('useOSS').checked;

    if (!weight) {
        currentLegalFees = { weightTax: 0, jibaiseki: 0, stamp: 0 };
    } else {
        const isKei = weight === 'kei';
        const weightNum = isKei ? 0 : parseInt(weight);
        currentLegalFees.weightTax = calculateWeightTax(weightNum, age, isKei);
        currentLegalFees.jibaiseki = isKei ? LEGAL_FEES.jibaiseki.kei : LEGAL_FEES.jibaiseki.normal;
        currentLegalFees.stamp = calculateStampFee(isKei, factory, oss);
    }
    document.getElementById('weightTaxDisplay').textContent = `¥${currentLegalFees.weightTax.toLocaleString()}`;
    document.getElementById('jibaisekiDisplay').textContent = `¥${currentLegalFees.jibaiseki.toLocaleString()}`;
    document.getElementById('stampDisplay').textContent = `¥${currentLegalFees.stamp.toLocaleString()}`;
    calculateTotals();
}

// 整備項目
function initializeCategoryTabs() {
    const tabs = document.getElementById('categoryTabs');
    tabs.innerHTML = Object.entries(MAINTENANCE_CATEGORIES).map(([key, cat]) =>
        `<div class="category-tab${key === 'basic' ? ' active' : ''}" onclick="showCategory('${key}')">${cat.name}</div>`
    ).join('');
}

function showCategory(key) {
    currentCategory = key;
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.category-tab:nth-child(${Object.keys(MAINTENANCE_CATEGORIES).indexOf(key) + 1})`).classList.add('active');
    const list = document.getElementById('quickItemsList');
    list.innerHTML = MAINTENANCE_CATEGORIES[key].items.map((item, i) => `
        <div class="quick-item" onclick="addQuickItem('${key}', ${i})">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price === 0 ? '無料' : '¥' + item.price.toLocaleString()}</span>
        </div>
    `).join('');
}

function showQuickAddModal() {
    showCategory(currentCategory);
    document.getElementById('quickAddModal').classList.add('active');
}
function closeQuickAddModal() {
    document.getElementById('quickAddModal').classList.remove('active');
}

function addQuickItem(key, idx) {
    const item = MAINTENANCE_CATEGORIES[key].items[idx];
    addItemToTable(item.name, 1, item.price);
}

function addMaintenanceItem() {
    const name = document.getElementById('newItemName').value.trim();
    const qty = parseInt(document.getElementById('newItemQty').value) || 1;
    const price = parseInt(document.getElementById('newItemPrice').value) || 0;
    if (!name) { alert('項目名を入力してください'); return; }
    addItemToTable(name, qty, price);
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemQty').value = '1';
    document.getElementById('newItemPrice').value = '';
}

function addItemToTable(name, qty, price) {
    maintenanceItems.push({
        id: Date.now(), name, qty, price,
        taxIncludedPrice: Math.round(price * qty * (1 + TAX_RATE))
    });
    renderMaintenanceTable();
    calculateTotals();
}

function renderMaintenanceTable() {
    const tbody = document.getElementById('maintenanceItems');
    tbody.innerHTML = maintenanceItems.map(item => `
        <tr>
            <td>${escapeHtml(item.name)}</td>
            <td class="text-center"><input type="number" class="form-control qty" value="${item.qty}" min="1" onchange="updateItemQty(${item.id}, this.value)"></td>
            <td class="text-right"><input type="number" class="form-control price" value="${item.price}" min="0" onchange="updateItemPrice(${item.id}, this.value)"></td>
            <td class="text-right">¥${item.taxIncludedPrice.toLocaleString()}</td>
            <td><button class="btn-remove" onclick="removeItem(${item.id})">×</button></td>
        </tr>
    `).join('');
}

function updateItemQty(id, val) {
    const item = maintenanceItems.find(i => i.id === id);
    if (item) {
        item.qty = parseInt(val) || 1;
        item.taxIncludedPrice = Math.round(item.price * item.qty * (1 + TAX_RATE));
        renderMaintenanceTable();
        calculateTotals();
    }
}

function updateItemPrice(id, val) {
    const item = maintenanceItems.find(i => i.id === id);
    if (item) {
        item.price = parseInt(val) || 0;
        item.taxIncludedPrice = Math.round(item.price * item.qty * (1 + TAX_RATE));
        renderMaintenanceTable();
        calculateTotals();
    }
}

function removeItem(id) {
    maintenanceItems = maintenanceItems.filter(i => i.id !== id);
    renderMaintenanceTable();
    calculateTotals();
}

function calculateTotals() {
    const maint = maintenanceItems.reduce((s, i) => s + i.taxIncludedPrice, 0);
    const reserve = parseInt(document.getElementById('reservationFee').value) || 0;
    const agency = parseInt(document.getElementById('agencyFee').value) || 0;
    const legal = currentLegalFees.weightTax + currentLegalFees.jibaiseki + currentLegalFees.stamp + reserve + agency;
    const grand = maint + legal;
    document.getElementById('maintenanceSubtotal').textContent = `¥${maint.toLocaleString()}`;
    document.getElementById('legalFeesSubtotal').textContent = `¥${legal.toLocaleString()}`;
    document.getElementById('grandTotal').textContent = `¥${grand.toLocaleString()}`;
}

// フォームクリア
function clearForm() {
    if (!confirm('入力内容をすべてクリアしますか？')) return;
    ['userName', 'userNameKana', 'userAddress', 'userTel', 'userEmail',
        'ownerName', 'ownerAddress',
        'plateRegion', 'plateClass', 'plateHiragana', 'plateSerial', 'carName', 'carModel',
        'chassisNumber', 'firstRegistration', 'mileage', 'notes'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
    document.getElementById('vehicleWeight').value = '';
    document.getElementById('vehicleAge').value = 'normal';
    document.getElementById('useOSS').checked = true;
    document.getElementById('reservationFee').value = '2200';
    document.getElementById('agencyFee').value = '11000';
    maintenanceItems = [];
    renderMaintenanceTable();
    updateLegalFees();
}

// プレビュー
function showPreview() {
    document.getElementById('previewContent').innerHTML = generatePreviewHtml();
    document.getElementById('previewModal').classList.add('active');
}
function closePreviewModal() {
    document.getElementById('previewModal').classList.remove('active');
}

function generatePreviewHtml() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    const companyName = document.getElementById('companyName').value || '○○自動車整備';
    const companyAddress = document.getElementById('companyAddress').value || '';
    const companyTel = document.getElementById('companyTel').value || '';
    const userName = document.getElementById('userName').value || '';
    const userAddress = document.getElementById('userAddress').value || '';
    const userTel = document.getElementById('userTel').value || '';
    const ownerName = document.getElementById('ownerName').value || '';
    const ownerAddress = document.getElementById('ownerAddress').value || '';
    const ownerSameAsUser = document.getElementById('ownerSameAsUser').checked;
    const plate = getPlateNumber();
    const carName = document.getElementById('carName').value || '';
    const carModel = document.getElementById('carModel').value || '';
    const chassisNumber = document.getElementById('chassisNumber').value || '';
    const mileage = document.getElementById('mileage').value || '';
    const ageLabel = { ecocar: 'エコカー', over13: '13年超', over18: '18年超' }[document.getElementById('vehicleAge').value] || '13年未満';
    const notes = document.getElementById('notes').value || '';

    const maint = maintenanceItems.reduce((s, i) => s + i.taxIncludedPrice, 0);
    const reserve = parseInt(document.getElementById('reservationFee').value) || 0;
    const agency = parseInt(document.getElementById('agencyFee').value) || 0;
    const legal = currentLegalFees.weightTax + currentLegalFees.jibaiseki + currentLegalFees.stamp + reserve + agency;
    const grand = maint + legal;

    const maintRows = maintenanceItems.length > 0
        ? maintenanceItems.map(i => `<tr><td>${escapeHtml(i.name)}</td><td class="text-right">${i.qty}</td><td class="text-right">¥${i.price.toLocaleString()}</td><td class="text-right">¥${i.taxIncludedPrice.toLocaleString()}</td></tr>`).join('')
        : '<tr><td colspan="4" style="text-align:center;color:#999">整備項目なし</td></tr>';

    return `
        <div class="print-preview" id="printPreview">
            <div class="preview-company">
                <div class="name">${escapeHtml(companyName)}</div>
                <div class="info">${escapeHtml(companyAddress)}<br>TEL: ${escapeHtml(companyTel)}</div>
            </div>
            <div class="preview-title">◆ 車検見積書 ◆</div>
            <div class="preview-date">発行日: ${dateStr}</div>
            
            <div class="preview-section">👤 お客様情報（使用者）</div>
            <div class="preview-info">
                <div class="preview-info-item"><span class="label">使用者</span><span class="value"><strong>${escapeHtml(userName)}</strong> 様</span></div>
                <div class="preview-info-item"><span class="label">電話番号</span><span class="value">${escapeHtml(userTel)}</span></div>
                <div class="preview-info-item" style="grid-column:1/-1"><span class="label">住所</span><span class="value">${escapeHtml(userAddress)}</span></div>
                ${!ownerSameAsUser ? `<div class="preview-info-item" style="grid-column:1/-1"><span class="label">所有者</span><span class="value">${escapeHtml(ownerName)} (${escapeHtml(ownerAddress)})</span></div>` : ''}
            </div>
            
            <div class="preview-section">🚙 車両情報</div>
            <div class="preview-info">
                <div class="preview-info-item"><span class="label">ナンバー</span><span class="value"><strong>${escapeHtml(plate)}</strong></span></div>
                <div class="preview-info-item"><span class="label">車名</span><span class="value">${escapeHtml(carName)}</span></div>
                <div class="preview-info-item"><span class="label">型式</span><span class="value">${escapeHtml(carModel)}</span></div>
                <div class="preview-info-item"><span class="label">車台番号</span><span class="value">${escapeHtml(chassisNumber)}</span></div>
                <div class="preview-info-item"><span class="label">走行距離</span><span class="value">${mileage ? mileage + ' km' : '-'}</span></div>
                <div class="preview-info-item"><span class="label">経過年数</span><span class="value">${ageLabel}</span></div>
            </div>
            
            <div class="preview-section">🔧 整備内容</div>
            <table class="preview-table">
                <thead><tr><th>項目</th><th class="text-right">数量</th><th class="text-right">単価(税抜)</th><th class="text-right">金額(税込)</th></tr></thead>
                <tbody>${maintRows}</tbody>
                <tfoot><tr><td colspan="3" class="text-right">整備費用 小計(税込)</td><td class="text-right">¥${maint.toLocaleString()}</td></tr></tfoot>
            </table>
            
            <div class="preview-section">📋 法定費用・諸費用</div>
            <table class="preview-table">
                <tbody>
                    <tr><td>自動車重量税（1年）</td><td class="text-right">¥${currentLegalFees.weightTax.toLocaleString()}</td></tr>
                    <tr><td>自賠責保険料（24ヶ月）</td><td class="text-right">¥${currentLegalFees.jibaiseki.toLocaleString()}</td></tr>
                    <tr><td>印紙代</td><td class="text-right">¥${currentLegalFees.stamp.toLocaleString()}</td></tr>
                    <tr><td>検査予約手数料</td><td class="text-right">¥${reserve.toLocaleString()}</td></tr>
                    <tr><td>代行手数料</td><td class="text-right">¥${agency.toLocaleString()}</td></tr>
                </tbody>
                <tfoot><tr><td class="text-right">法定費用・諸費用 小計</td><td class="text-right">¥${legal.toLocaleString()}</td></tr></tfoot>
            </table>
            
            <div class="preview-total">💰 お支払い総額: ¥${grand.toLocaleString()}</div>
            
            ${notes ? `<div class="preview-notes"><strong>備考:</strong><br>${escapeHtml(notes).replace(/\n/g, '<br>')}</div>` : ''}
            
            <div class="preview-stamps">
                <div class="preview-stamp">担当</div>
                <div class="preview-stamp">確認</div>
            </div>
        </div>
    `;
}

function getPlateNumber() {
    const r = document.getElementById('plateRegion').value;
    const c = document.getElementById('plateClass').value;
    const h = document.getElementById('plateHiragana').value;
    const s = document.getElementById('plateSerial').value;
    return (!r && !c && !h && !s) ? '-' : `${r} ${c} ${h} ${s}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =============================================
// 顧客データのファイル保存・読み込み機能
// =============================================

// 顧客データをJSONファイルとしてエクスポート
function exportCustomersToFile() {
    if (savedCustomers.length === 0) {
        alert('保存された顧客データがありません');
        return;
    }

    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        customers: savedCustomers
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '車検見積り顧客.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`${savedCustomers.length}件の顧客データをエクスポートしました`);
}

// JSONファイルから顧客データをインポート
function importCustomersFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (!data.customers || !Array.isArray(data.customers)) {
                    alert('無効なファイル形式です');
                    return;
                }

                const importCount = data.customers.length;
                let addedCount = 0;
                let updatedCount = 0;

                data.customers.forEach(c => {
                    const idx = savedCustomers.findIndex(x =>
                        x.plateRegion === c.plateRegion &&
                        x.plateClass === c.plateClass &&
                        x.plateHiragana === c.plateHiragana &&
                        x.plateSerial === c.plateSerial
                    );
                    if (idx >= 0) {
                        savedCustomers[idx] = c;
                        updatedCount++;
                    } else {
                        savedCustomers.push(c);
                        addedCount++;
                    }
                });

                localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(savedCustomers));
                alert(`インポート完了\n新規追加: ${addedCount}件\n更新: ${updatedCount}件`);
                renderCustomerList();
            } catch (err) {
                alert('ファイルの読み込みに失敗しました: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// =============================================
// 車検証QRコード読み取り機能
// =============================================

let qrScanner = null;

// QRコードスキャナーモーダルを表示
function showQRScannerModal() {
    document.getElementById('qrScannerModal').classList.add('active');
    startQRScanner();
}

// QRコードスキャナーモーダルを閉じる
function closeQRScannerModal() {
    stopQRScanner();
    document.getElementById('qrScannerModal').classList.remove('active');
}

// QRコードスキャナーを開始
async function startQRScanner() {
    const video = document.getElementById('qrVideo');
    const statusEl = document.getElementById('qrStatus');

    try {
        statusEl.textContent = 'カメラを起動中...';

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });

        video.srcObject = stream;
        video.play();
        statusEl.textContent = '車検証のQRコードをカメラに向けてください';

        // QRコード読み取りループ
        qrScanner = setInterval(() => {
            scanQRCode(video);
        }, 500);

    } catch (err) {
        statusEl.textContent = 'カメラにアクセスできません: ' + err.message;
        console.error('Camera error:', err);
    }
}

// QRコードスキャナーを停止
function stopQRScanner() {
    if (qrScanner) {
        clearInterval(qrScanner);
        qrScanner = null;
    }
    const video = document.getElementById('qrVideo');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

// QRコードをスキャン
function scanQRCode(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // jsQR ライブラリを使用（CDNで読み込み）
    if (typeof jsQR !== 'undefined') {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            processQRCodeData(code.data);
        }
    }
}

// QRコードデータを処理（車検証フォーマット）
function processQRCodeData(data) {
    const statusEl = document.getElementById('qrStatus');
    statusEl.textContent = 'QRコードを検出しました！データを処理中...';

    try {
        // 車検証QRコードは特定のフォーマット（/区切り）
        const parts = data.split('/');

        if (parts.length >= 5) {
            // 車検証QRコードの一般的な構造
            // [0]: 登録番号地域
            // [1]: 分類番号
            // [2]: ひらがな
            // [3]: 一連番号
            // [4]: 車体番号
            // [5]: 初度登録年月
            // 等（バリエーションあり）

            autoFillFromQRData(parts);
            stopQRScanner();
            closeQRScannerModal();
            alert('車検証データを読み取りました！');
        } else {
            // JSONフォーマット（電子車検証からのエクスポート）
            try {
                const jsonData = JSON.parse(data);
                autoFillFromJSONData(jsonData);
                stopQRScanner();
                closeQRScannerModal();
                alert('車検証データを読み取りました！');
            } catch {
                statusEl.textContent = '車検証のQRコードを読み取ってください';
            }
        }
    } catch (err) {
        console.error('QR parse error:', err);
        statusEl.textContent = 'QRコードの解析に失敗しました';
    }
}

// QRコードデータから自動入力（従来型車検証）
function autoFillFromQRData(parts) {
    // パーツの数に応じて適切にマッピング
    if (parts[0]) document.getElementById('plateRegion').value = parts[0];
    if (parts[1]) document.getElementById('plateClass').value = parts[1];
    if (parts[2]) document.getElementById('plateHiragana').value = parts[2];
    if (parts[3]) document.getElementById('plateSerial').value = parts[3];
    if (parts[4]) document.getElementById('chassisNumber').value = parts[4];
    if (parts[5]) document.getElementById('firstRegistration').value = parts[5];

    // 重量情報があれば設定
    if (parts.length > 6 && parts[6]) {
        const weight = parseInt(parts[6]);
        if (!isNaN(weight)) {
            document.getElementById('vehicleWeight').value = weight;
            updateLegalFees();
        }
    }
}

// JSONデータから自動入力（電子車検証エクスポート）
function autoFillFromJSONData(data) {
    // 電子車検証閲覧アプリからのエクスポート形式に対応

    // ナンバープレート
    if (data.registrationNumber) {
        const parts = data.registrationNumber.split(' ');
        if (parts[0]) document.getElementById('plateRegion').value = parts[0];
        if (parts[1]) document.getElementById('plateClass').value = parts[1];
        if (parts[2]) document.getElementById('plateHiragana').value = parts[2];
        if (parts[3]) document.getElementById('plateSerial').value = parts[3];
    }

    // 車両情報
    if (data.chassisNumber) document.getElementById('chassisNumber').value = data.chassisNumber;
    if (data.firstRegistrationDate) document.getElementById('firstRegistration').value = data.firstRegistrationDate;
    if (data.vehicleWeight) {
        document.getElementById('vehicleWeight').value = data.vehicleWeight;
        updateLegalFees();
    }
    if (data.vehicleName) document.getElementById('carName').value = data.vehicleName;
    if (data.modelCode) document.getElementById('carModel').value = data.modelCode;

    // 使用者情報（車検証：使用者欄）
    if (data.userName) {
        document.getElementById('userName').value = data.userName;
    }
    if (data.userAddress) {
        document.getElementById('userAddress').value = data.userAddress;
    }

    // 所有者情報（車検証：所有者欄）
    if (data.ownerName) {
        document.getElementById('ownerName').value = data.ownerName;
        // 所有者と使用者が同じかチェック
        if (data.userName && data.ownerName === data.userName) {
            document.getElementById('ownerSameAsUser').checked = true;
        } else {
            document.getElementById('ownerSameAsUser').checked = false;
        }
        toggleOwnerSameAsUser();
    }
    if (data.ownerAddress) {
        document.getElementById('ownerAddress').value = data.ownerAddress;
    }

    // 使用者が未設定なら所有者を使用者にもコピー（従来データ形式の互換性）
    if (!data.userName && data.ownerName) {
        document.getElementById('userName').value = data.ownerName;
    }
    if (!data.userAddress && data.ownerAddress) {
        document.getElementById('userAddress').value = data.ownerAddress;
    }
}

// 電子車検証JSONファイルをインポート
function importVehicleCertificateJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                if (file.name.endsWith('.csv')) {
                    // CSV形式（車検証閲覧アプリから出力）
                    parseVehicleCertificateCSV(event.target.result);
                } else {
                    // JSON形式
                    const data = JSON.parse(event.target.result);
                    autoFillFromJSONData(data);
                    alert('車検証データを読み込みました！');
                }
            } catch (err) {
                alert('ファイルの読み込みに失敗しました: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// CSV形式の車検証データをパース
function parseVehicleCertificateCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) {
        alert('CSVファイルにデータがありません');
        return;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''));

    const data = {};
    headers.forEach((h, i) => {
        data[h] = values[i] || '';
    });

    // よくあるカラム名に対応
    const mapping = {
        '自動車登録番号': 'registrationNumber',
        '登録番号': 'registrationNumber',
        '車台番号': 'chassisNumber',
        '車体番号': 'chassisNumber',
        '初度登録年月': 'firstRegistrationDate',
        '車両重量': 'vehicleWeight',
        '車名': 'vehicleName',
        '型式': 'modelCode',
        '所有者氏名': 'ownerName',
        '所有者名称': 'ownerName',
        '所有者住所': 'ownerAddress',
        '使用者氏名': 'userName',
        '使用者名称': 'userName',
        '使用者住所': 'userAddress'
    };

    const normalizedData = {};
    for (const [key, value] of Object.entries(data)) {
        if (mapping[key]) {
            normalizedData[mapping[key]] = value;
        }
    }

    autoFillFromJSONData(normalizedData);
    alert('車検証CSVデータを読み込みました！');
}

// 所有者「使用者と同じ」チェックボックスの切り替え
function toggleOwnerSameAsUser() {
    const checkbox = document.getElementById('ownerSameAsUser');
    const ownerFields = document.getElementById('ownerFields');

    if (checkbox.checked) {
        ownerFields.style.display = 'none';
        // 使用者の情報を所有者にコピー
        document.getElementById('ownerName').value = document.getElementById('userName').value;
        document.getElementById('ownerAddress').value = document.getElementById('userAddress').value;
    } else {
        ownerFields.style.display = 'block';
    }
}

// プレビュー用に使用者名を取得（従来のcustomerName互換）
function getCustomerNameForPreview() {
    return document.getElementById('userName').value || '';
}
