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
});

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

    const data = {
        id: Date.now(), savedAt: new Date().toISOString(),
        customerName: document.getElementById('customerName').value,
        customerNameKana: document.getElementById('customerNameKana').value,
        customerAddress: document.getElementById('customerAddress').value,
        customerTel: document.getElementById('customerTel').value,
        customerEmail: document.getElementById('customerEmail').value,
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
        list = list.filter(c => c.customerName.toLowerCase().includes(s) ||
            c.plateSerial.includes(s) || c.carName.toLowerCase().includes(s));
    }
    list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

    if (list.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px">保存されたデータがありません</div>';
        return;
    }
    container.innerHTML = list.map(c => `
        <div class="customer-list-item">
            <div class="customer-info">
                <div class="name">${escapeHtml(c.customerName || '名前未登録')}</div>
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
    document.getElementById('customerName').value = c.customerName || '';
    document.getElementById('customerNameKana').value = c.customerNameKana || '';
    document.getElementById('customerAddress').value = c.customerAddress || '';
    document.getElementById('customerTel').value = c.customerTel || '';
    document.getElementById('customerEmail').value = c.customerEmail || '';
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
    ['customerName', 'customerNameKana', 'customerAddress', 'customerTel', 'customerEmail',
        'plateRegion', 'plateClass', 'plateHiragana', 'plateSerial', 'carName', 'carModel',
        'chassisNumber', 'firstRegistration', 'mileage', 'notes'].forEach(id =>
            document.getElementById(id).value = '');
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
    const customerName = document.getElementById('customerName').value || '';
    const customerAddress = document.getElementById('customerAddress').value || '';
    const customerTel = document.getElementById('customerTel').value || '';
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
            
            <div class="preview-section">👤 お客様情報</div>
            <div class="preview-info">
                <div class="preview-info-item"><span class="label">お名前</span><span class="value"><strong>${escapeHtml(customerName)}</strong> 様</span></div>
                <div class="preview-info-item"><span class="label">電話番号</span><span class="value">${escapeHtml(customerTel)}</span></div>
                <div class="preview-info-item" style="grid-column:1/-1"><span class="label">ご住所</span><span class="value">${escapeHtml(customerAddress)}</span></div>
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
