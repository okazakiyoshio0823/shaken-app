// Updated: 2026-01-24 11:55:00
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

// Enterキーで次の入力欄に移動する機能（Shift+Enterで前へ戻る）
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

    // 有効な入力要素かチェック
    function isValidElement(id) {
        const element = document.getElementById(id);
        if (!element) return false;

        // 所有者フィールドがhiddenの場合はスキップ
        const ownerFields = document.getElementById('ownerFields');
        if ((id === 'ownerName' || id === 'ownerAddress') &&
            ownerFields && ownerFields.style.display === 'none') {
            return false;
        }

        // 要素が表示されていて有効な場合のみ
        return element.offsetParent !== null && !element.disabled;
    }

    // すべての入力要素にイベントリスナーを追加
    inputOrder.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.addEventListener('keydown', (e) => {
            // Enterキーが押された場合
            if (e.key === 'Enter') {
                e.preventDefault();

                // textareaの場合は改行を許可（Ctrl+Enterで次へ）
                if (element.tagName === 'TEXTAREA' && !e.ctrlKey && !e.shiftKey) {
                    return;
                }

                // Shift+Enter: 前の入力要素へ戻る
                if (e.shiftKey) {
                    for (let i = index - 1; i >= 0; i--) {
                        if (isValidElement(inputOrder[i])) {
                            const prevElement = document.getElementById(inputOrder[i]);
                            prevElement.focus();
                            if (prevElement.tagName === 'SELECT') {
                                prevElement.click();
                            }
                            break;
                        }
                    }
                }
                // Enter: 次の入力要素へ進む
                else {
                    for (let i = index + 1; i < inputOrder.length; i++) {
                        if (isValidElement(inputOrder[i])) {
                            const nextElement = document.getElementById(inputOrder[i]);
                            nextElement.focus();
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

    console.log('Enterキーナビゲーションを初期化しました（Enter=次へ, Shift+Enter=前へ）');
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
        vehicleAge: document.getElementById('vehicleAge').value,
        // 追加保存項目
        shakenType: document.getElementById('shakenType').value,
        shakenExpiryDate: document.getElementById('shakenExpiryDate').value,
        maintenanceItems: maintenanceItems.slice(),
        notes: document.getElementById('notes').value,
        factoryType: document.getElementById('factoryType').value,
        reservationFee: document.getElementById('reservationFee').value,
        agencyFee: document.getElementById('agencyFee').value
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

    // 追加項目の読み込み
    document.getElementById('shakenType').value = c.shakenType || 'continue';
    document.getElementById('shakenExpiryDate').value = c.shakenExpiryDate || '';
    document.getElementById('notes').value = c.notes || '';
    document.getElementById('factoryType').value = c.factoryType || 'designated';
    document.getElementById('reservationFee').value = c.reservationFee || '';
    document.getElementById('agencyFee').value = c.agencyFee || '';

    // 整備項目の復元
    if (c.maintenanceItems && Array.isArray(c.maintenanceItems)) {
        maintenanceItems = c.maintenanceItems.slice();
        renderMaintenanceTable();
        calculateTotals();
    }

    updateLegalFees();
    updateShakenExpiryDisplay();
    closeCustomerListModal();
    alert('読み込みました');
}

function deleteCustomerData(id) {
    if (!confirm('このデータを削除してもよろしいですか？')) return;

    savedCustomers = savedCustomers.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_CUSTOMERS, JSON.stringify(savedCustomers));

    renderCustomerList(document.querySelector('#customerListModal input[type="text"]')?.value || '');
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
    list.innerHTML = MAINTENANCE_CATEGORIES[key].items.map((item, i) => {
        let priceDisplay = '';
        if (item.parts !== undefined || item.wage !== undefined) {
            const p = item.parts || 0;
            const w = item.wage || 0;
            priceDisplay = `¥${(p + w).toLocaleString()} <small>(部${p.toLocaleString()}/工${w.toLocaleString()})</small>`;
        } else {
            priceDisplay = item.price === 0 ? '無料' : '¥' + item.price.toLocaleString();
        }

        return `
        <div class="quick-item" onclick="addQuickItem('${key}', ${i})">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${priceDisplay}</span>
        </div>
    `}).join('');
}

function showQuickAddModal() {
    showCategory(currentCategory);
    document.getElementById('quickAddModal').classList.add('active');
}
function closeQuickAddModal() {
    document.getElementById('quickAddModal').classList.remove('active');
}

// 新しい項目入力欄はHTML側で更新が必要ですが、
// ここでは既存の入力欄（単価）を「部品＋工賃の合計（もしくは部品代）」として扱うか、
// HTMLを修正して2つの入力欄にするのがベストです。
// 今回は「単価」欄を「部品代」として扱い、工賃は0で追加するようにします。
function addQuickItem(key, idx) {
    const item = MAINTENANCE_CATEGORIES[key].items[idx];
    const parts = item.parts || (item.price || 0);
    const wage = item.wage || 0;

    // 部品と工賃を分けて保持するが、1つの行（アイテム）として追加
    addItemToTable(item.name, 1, parts, wage);

    // 連続で追加できるようにモーダルは閉じない
    // closeQuickAddModal();

    // オプション：追加されたことをユーザーに知らせる軽いフィードバックがあれば親切ですが、
    // まずは要望通り閉じないようにします。
}

function addMaintenanceItem() {
    const name = document.getElementById('newItemName').value.trim();
    const qty = parseInt(document.getElementById('newItemQty').value) || 1;
    // 手動追加の「単価」はとりあえず部品代として扱う（後で編集可能）
    const parts = parseInt(document.getElementById('newItemPrice').value) || 0;

    if (!name) { alert('項目名を入力してください'); return; }
    addItemToTable(name, qty, parts, 0); // 工賃0で追加

    document.getElementById('newItemName').value = '';
    document.getElementById('newItemQty').value = '1';
    document.getElementById('newItemPrice').value = '';
}

function addItemToTable(name, qty, parts, wage) {
    const total = (parts + wage);
    maintenanceItems.push({
        id: Date.now(),
        name,
        qty,
        parts,
        wage,
        subItems: [], // 内訳（追加部品など）用
        taxIncludedPrice: Math.round(total * qty * (1 + TAX_RATE))
    });
    renderMaintenanceTable();
    calculateTotals();
}

function renderMaintenanceTable() {
    const tbody = document.getElementById('maintenanceItems');
    tbody.innerHTML = maintenanceItems.map(item => {
        // メイン項目行
        const mainRow = `
        <tr class="main-row">
            <td>${escapeHtml(item.name)}</td>
            <td class="text-center"><input type="number" class="form-control qty" value="${item.qty}" min="1" onchange="updateItemQty(${item.id}, this.value)"></td>
            <td class="text-right">
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end;">
                        <span style="font-size: 0.8em; color: #666; margin-right: 5px;">部品</span>
                        <input type="number" class="form-control price" value="${item.parts}" min="0" placeholder="0" onchange="updateItemParts(${item.id}, this.value)" style="width: 100px;">
                    </div>
                    <div style="display: flex; align-items: center; justify-content: flex-end;">
                        <span style="font-size: 0.8em; color: #666; margin-right: 5px;">工賃</span>
                        <input type="number" class="form-control price" value="${item.wage}" min="0" placeholder="0" onchange="updateItemWage(${item.id}, this.value)" style="width: 100px;">
                    </div>
                </div>
            </td>
            <td class="text-right">¥${item.taxIncludedPrice.toLocaleString()}</td>
            <td>
                <button class="btn-add-sub" onclick="addSubItem(${item.id})" title="部品明細を追加">＋</button>
                <button class="btn-remove" onclick="removeItem(${item.id})">×</button>
            </td>
        </tr>`;

        // サブ項目行（ある場合）
        const subRows = (item.subItems || []).map((sub, idx) => `
        <tr class="sub-row" style="background-color: #f9f9f9;">
            <td style="padding-left: 30px; font-size: 0.9em;">
                <span style="color:#999;">┗ </span>
                <input type="text" class="form-control form-control-sm" value="${sub.name}" placeholder="部品名" onchange="updateSubItem(${item.id}, ${idx}, 'name', this.value)" style="width: 200px; display: inline-block;">
            </td>
            <td class="text-center">
                <input type="number" class="form-control form-control-sm qty" value="${sub.qty}" min="1" onchange="updateSubItem(${item.id}, ${idx}, 'qty', this.value)" style="width: 60px;">
            </td>
            <td class="text-right">
                <div style="display: flex; align-items: center; justify-content: flex-end;">
                     <span style="font-size: 0.8em; color: #666; margin-right: 5px;">部品</span>
                    <input type="number" class="form-control form-control-sm price" value="${sub.price}" min="0" onchange="updateSubItem(${item.id}, ${idx}, 'price', this.value)" style="width: 100px;">
                </div>
            </td>
            <td class="text-right" style="font-size: 0.9em;">¥${sub.taxIncludedPrice.toLocaleString()}</td>
            <td><button class="btn-remove btn-sm" onclick="removeSubItem(${item.id}, ${idx})">×</button></td>
        </tr>
        `).join('');

        return mainRow + subRows;
    }).join('');
}

// サブ項目（部品明細）を追加
function addSubItem(parentId) {
    const item = maintenanceItems.find(i => i.id === parentId);
    if (!item) return;

    if (!item.subItems) item.subItems = [];
    item.subItems.push({
        name: '',
        qty: 1,
        price: 0,
        taxIncludedPrice: 0
    });
    renderMaintenanceTable();
}

// サブ項目を更新
function updateSubItem(parentId, idx, field, val) {
    const item = maintenanceItems.find(i => i.id === parentId);
    if (!item || !item.subItems || !item.subItems[idx]) return;

    const sub = item.subItems[idx];
    if (field === 'name') sub.name = val;
    if (field === 'qty') sub.qty = parseInt(val) || 1;
    if (field === 'price') sub.price = parseInt(val) || 0;

    sub.taxIncludedPrice = Math.round(sub.price * sub.qty * (1 + TAX_RATE));

    updateItemTotal(item);
}

// サブ項目を削除
function removeSubItem(parentId, idx) {
    const item = maintenanceItems.find(i => i.id === parentId);
    if (!item || !item.subItems) return;

    item.subItems.splice(idx, 1);
    updateItemTotal(item);
}

function updateItemQty(id, val) {
    const item = maintenanceItems.find(i => i.id === id);
    if (item) {
        item.qty = parseInt(val) || 1;
        updateItemTotal(item);
    }
}

function updateItemParts(id, val) {
    const item = maintenanceItems.find(i => i.id === id);
    if (item) {
        item.parts = parseInt(val) || 0;
        updateItemTotal(item);
    }
}

function updateItemWage(id, val) {
    const item = maintenanceItems.find(i => i.id === id);
    if (item) {
        item.wage = parseInt(val) || 0;
        updateItemTotal(item);
    }
}

function updateItemTotal(item) {
    // メイン項目の合計
    const mainTotal = (item.parts || 0) + (item.wage || 0);
    const mainTaxIncluded = Math.round(mainTotal * item.qty * (1 + TAX_RATE));

    // サブ項目の合計
    const subTaxIncluded = (item.subItems || []).reduce((s, sub) => s + sub.taxIncludedPrice, 0);

    // 全体合計（表示用）
    item.taxIncludedPrice = mainTaxIncluded + subTaxIncluded;

    renderMaintenanceTable();
    calculateTotals();
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

    // 基本的な入力項目をクリア
    const ids = [
        'userName', 'userNameKana', 'userAddress', 'userTel', 'userEmail',
        'ownerName', 'ownerAddress',
        'plateRegion', 'plateClass', 'plateHiragana', 'plateSerial',
        'carMaker', 'carName', 'carModel', 'chassisNumber', 'firstRegistration',
        'shakenExpiryDate', 'mileage', 'notes', 'customerMemo',
        'reservationFee', 'agencyFee', 'newItemName', 'newItemQty', 'newItemPrice'
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // セレクトボックス・チェックボックスの初期化
    if (document.getElementById('vehicleWeight')) document.getElementById('vehicleWeight').value = '';
    if (document.getElementById('vehicleAge')) document.getElementById('vehicleAge').value = 'normal';
    if (document.getElementById('useOSS')) document.getElementById('useOSS').checked = true;
    if (document.getElementById('ownerSameAsUser')) {
        document.getElementById('ownerSameAsUser').checked = true;
        toggleOwnerSameAsUser(); // 所有者欄の非表示反映
    }
    if (document.getElementById('shakenType')) document.getElementById('shakenType').value = 'continue';
    if (document.getElementById('factoryType')) document.getElementById('factoryType').value = 'designated';
    if (document.getElementById('carMaker')) document.getElementById('carMaker').value = '';

    // 整備項目リストを空に
    maintenanceItems = [];
    renderMaintenanceTable();
    calculateTotals();

    // 車検満了日表示のリセット
    if (typeof updateShakenExpiryDisplay === 'function') {
        updateShakenExpiryDisplay();
    }
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

    // 書類種別情報を取得
    const docInfo = getDocumentTypeInfo();
    const dateLabel = docInfo.title === '御請求書' ? '請求日' : (docInfo.title === '領収書' ? '領収日' : '発行日');

    // ロゴ表示用HTML
    let logoHtml = '';
    if (typeof currentTheme !== 'undefined' && currentTheme.logo) {
        logoHtml = `<img src="${currentTheme.logo}" style="max-height:80px;margin-bottom:10px;display:block;margin-left:auto;margin-right:auto;">`;
    }

    const maintRows = maintenanceItems.length > 0
        ? maintenanceItems.map(i => {
            // メイン項目
            const mainRow = `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="font-weight:bold;">${escapeHtml(i.name)}</td>
                    <td class="text-right">${i.qty}</td>
                    <td class="text-right">¥${(i.parts || 0).toLocaleString()}</td>
                    <td class="text-right">¥${(i.wage || 0).toLocaleString()}</td>
                    <td class="text-right"><strong>¥${i.taxIncludedPrice.toLocaleString()}</strong></td>
                </tr>`;

            // サブ項目（部品明細）がある場合は表示
            const subRows = (i.subItems && i.subItems.length > 0)
                ? i.subItems.map(sub => `
                    <tr style="color:#555; background-color:#f9f9f9;">
                        <td style="padding-left:20px;">┗ ${escapeHtml(sub.name || '(名称未入力)')}</td>
                        <td class="text-right">${sub.qty}</td>
                        <td class="text-right">¥${sub.price.toLocaleString()}</td>
                        <td class="text-right">-</td>
                        <td class="text-right">¥${sub.taxIncludedPrice.toLocaleString()}</td>
                    </tr>
                `).join('')
                : '';

            return mainRow + subRows;
        }).join('')
        : '<tr><td colspan="5" style="text-align:center;color:#999">整備項目なし</td></tr>';

    return `
        <div class="print-preview" id="printPreview">
            <div class="preview-company">
                ${logoHtml}
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
                <thead>
                    <tr>
                        <th>項目</th>
                        <th class="text-right">数量</th>
                        <th class="text-right" style="width: 15%;">単価</th>
                        <th class="text-right">金額(税込)</th>
                    </tr>
                </thead>
                <tbody>${maintenanceItems.length > 0
            ? maintenanceItems.map(i => `
                    <tr>
                        <td>${escapeHtml(i.name)}</td>
                        <td class="text-right">${i.qty}</td>
                        <td class="text-right">
                            <div style="display:flex;justify-content:flex-end;align-items:center;font-size:0.9em;">
                                <span style="font-size:0.8em;color:#666;margin-right:4px;">部品</span>¥${(i.parts || 0).toLocaleString()}
                            </div>
                            <div style="display:flex;justify-content:flex-end;align-items:center;font-size:0.9em;">
                                <span style="font-size:0.8em;color:#666;margin-right:4px;">工賃</span>¥${(i.wage || 0).toLocaleString()}
                            </div>
                        </td>
                        <td class="text-right">¥${i.taxIncludedPrice.toLocaleString()}</td>
                    </tr>`).join('')
            : '<tr><td colspan="5" style="text-align:center;color:#999">整備項目なし</td></tr>'}
            <tr><td colspan="4" class="text-right" style="border-top:2px solid #ddd;font-weight:bold;">整備費用 小計(税込)</td><td class="text-right" style="border-top:2px solid #ddd;font-weight:bold;font-size:1.1em;">¥${maint.toLocaleString()}</td></tr>
                </tbody>
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

// =============================================
// 車検満了日の自動計算機能
// =============================================

// 初度登録から車検満了日を計算（表示は更新しない）
function calculateShakenExpiry() {
    const firstReg = document.getElementById('firstRegistration').value;
    const shakenType = document.getElementById('shakenType').value;

    if (!firstReg) return null;

    // 日付形式（YYYY-MM-DD）または月形式（YYYY-MM）に対応
    let regDate;
    if (firstReg.length === 7) {
        // YYYY-MM形式の場合
        regDate = new Date(firstReg + '-01');
    } else {
        // YYYY-MM-DD形式の場合
        regDate = new Date(firstReg);
    }
    let expiryDate;

    if (shakenType === 'new') {
        // 新車は初度登録から3年後
        expiryDate = new Date(regDate.getFullYear() + 3, regDate.getMonth(), regDate.getDate());
    } else {
        // 継続車検は初度登録から2年後（次回車検満了日の目安）
        expiryDate = new Date(regDate.getFullYear() + 2, regDate.getMonth(), regDate.getDate());
    }

    // 満了日の前日（車検証記載の満了日）
    expiryDate.setDate(expiryDate.getDate() - 1);

    return expiryDate;
}

// 車検満了日表示更新（直接入力を使用）
function updateShakenExpiryDisplay() {
    const shakenExpiryDate = document.getElementById('shakenExpiryDate').value;
    const shakenType = document.getElementById('shakenType').value;
    const displayEl = document.getElementById('shakenExpiryDisplay');

    if (!shakenExpiryDate) {
        displayEl.innerHTML = '車検満了日を入力してください';
        displayEl.style.background = 'linear-gradient(135deg,#f5f5f5,#e0e0e0)';
        displayEl.style.color = '#333';
        return;
    }

    const expiryDate = new Date(shakenExpiryDate);
    const now = new Date();
    const daysUntil = Math.ceil((expiryDate - now) / (24 * 60 * 60 * 1000));

    const expiryStr = `${expiryDate.getFullYear()}年${expiryDate.getMonth() + 1}月${expiryDate.getDate()}日`;
    const typeLabel = shakenType === 'new' ? '(初回車検)' : '(継続車検)';

    if (daysUntil < 0) {
        displayEl.innerHTML = `<span style="color:#d32f2f;">⚠️ ${expiryStr}<br><small>（期限切れ）${typeLabel}</small></span>`;
        displayEl.style.background = 'linear-gradient(135deg,#ffebee,#ffcdd2)';
        displayEl.style.color = '#d32f2f';
    } else if (daysUntil <= 30) {
        displayEl.innerHTML = `<span style="color:#f57c00;">⚡ ${expiryStr}<br><small>（あと${daysUntil}日）${typeLabel}</small></span>`;
        displayEl.style.background = 'linear-gradient(135deg,#fff3e0,#ffe0b2)';
        displayEl.style.color = '#f57c00';
    } else if (daysUntil <= 60) {
        displayEl.innerHTML = `<span style="color:#ffa000;">📅 ${expiryStr}<br><small>（あと${daysUntil}日）${typeLabel}</small></span>`;
        displayEl.style.background = 'linear-gradient(135deg,#fffde7,#fff9c4)';
        displayEl.style.color = '#ffa000';
    } else {
        displayEl.innerHTML = `✅ ${expiryStr}<br><small>（あと${daysUntil}日）${typeLabel}</small>`;
        displayEl.style.background = 'linear-gradient(135deg,#e8f5e9,#c8e6c9)';
        displayEl.style.color = '#2e7d32';
    }
}

// =============================================
// 領収書・請求書モード（プレビュー生成の拡張）
// =============================================

function getDocumentTypeInfo() {
    const docType = document.getElementById('documentType').value;
    const types = {
        estimate: { title: '車検見積書', icon: '📝', suffix: '御見積金額' },
        invoice: { title: '車検請求書', icon: '📄', suffix: 'ご請求金額' },
        receipt: { title: '車検領収書', icon: '🧾', suffix: '領収金額' }
    };
    return types[docType] || types.estimate;
}

// generatePreviewHtmlを上書きして領収書/請求書に対応
const originalGeneratePreviewHtml = generatePreviewHtml;
generatePreviewHtml = function () {
    const docInfo = getDocumentTypeInfo();
    const originalHtml = originalGeneratePreviewHtml();

    // タイトルを置き換え
    let html = originalHtml.replace('◆ 車検見積書 ◆', `◆ ${docInfo.title} ◆`);

    // 請求書の場合：支払期限を追加
    if (document.getElementById('documentType').value === 'invoice') {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 2週間後
        const dueDateStr = `${dueDate.getFullYear()}年${dueDate.getMonth() + 1}月${dueDate.getDate()}日`;
        html = html.replace('発行日:', `お支払期限: ${dueDateStr}<br>発行日:`);
    }

    // 領収書の場合：領収文言を追加
    if (document.getElementById('documentType').value === 'receipt') {
        html = html.replace('💰 お支払い総額:', '💰 領収金額:');
        html = html.replace('</div>\n            \n            <div class="preview-stamps">',
            '</div>\n            <div style="text-align:center;margin:20px 0;padding:12px;background:#e8f5e9;border-radius:8px;"><strong>上記金額を正に領収いたしました</strong></div>\n            <div class="preview-stamps">');
    }

    return html;
};

// =============================================
// 車検期限リマインダー一覧
// =============================================

function showReminderModal() {
    renderReminderList();
    document.getElementById('reminderModal').classList.add('active');
}

function closeReminderModal() {
    document.getElementById('reminderModal').classList.remove('active');
}

function renderReminderList() {
    const container = document.getElementById('reminderListItems');

    if (savedCustomers.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px;">保存された顧客データがありません</div>';
        return;
    }

    // 車検満了日を計算してソート
    const customersWithExpiry = savedCustomers.map(c => {
        const expiry = calculateExpiryForCustomer(c);
        const daysUntil = expiry ? Math.ceil((expiry - new Date()) / (24 * 60 * 60 * 1000)) : 9999;
        return { ...c, expiryDate: expiry, daysUntil };
    }).sort((a, b) => a.daysUntil - b.daysUntil);

    container.innerHTML = customersWithExpiry.map(c => {
        let statusClass = '';
        let statusText = '';

        if (c.daysUntil < 0) {
            statusClass = 'reminder-expired';
            statusText = `<span style="color:#d32f2f;font-weight:bold;">期限切れ（${Math.abs(c.daysUntil)}日経過）</span>`;
        } else if (c.daysUntil <= 30) {
            statusClass = 'reminder-warning';
            statusText = `<span style="color:#f57c00;font-weight:bold;">あと${c.daysUntil}日</span>`;
        } else if (c.daysUntil <= 60) {
            statusClass = 'reminder-soon';
            statusText = `<span style="color:#1976d2;">あと${c.daysUntil}日</span>`;
        } else if (c.expiryDate) {
            statusText = `あと${c.daysUntil}日`;
        } else {
            statusText = '<span style="color:#999;">登録情報不足</span>';
        }

        const expiryStr = c.expiryDate
            ? `${c.expiryDate.getFullYear()}/${c.expiryDate.getMonth() + 1}/${c.expiryDate.getDate()}`
            : '不明';

        return `
            <div class="reminder-item ${statusClass}" style="padding:12px;margin-bottom:8px;background:#f8f9fa;border-radius:8px;border-left:4px solid ${c.daysUntil < 0 ? '#d32f2f' : c.daysUntil <= 30 ? '#f57c00' : '#4caf50'};">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                    <div>
                        <strong>${escapeHtml(c.userName || c.customerName || '名前未登録')}</strong>
                        <div style="font-size:0.85em;color:#666;">
                            🚗 ${c.plateRegion} ${c.plateClass} ${c.plateHiragana} ${c.plateSerial} | ${escapeHtml(c.carName || '')}
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:0.85em;color:#666;">満了日: ${expiryStr}</div>
                        <div>${statusText}</div>
                    </div>
                    <button class="btn btn-primary" onclick="loadCustomerData(${c.id}); closeReminderModal();" style="font-size:0.85em;padding:6px 12px;">
                        読み込む
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function calculateExpiryForCustomer(customer) {
    if (!customer.firstRegistration) return null;

    const regDate = new Date(customer.firstRegistration + '-01');
    const now = new Date();
    const yearsElapsed = Math.floor((now - regDate) / (365.25 * 24 * 60 * 60 * 1000));

    let expiryDate;
    if (yearsElapsed < 3) {
        expiryDate = new Date(regDate.getFullYear() + 3, regDate.getMonth(), regDate.getDate());
    } else {
        const periodsAfterFirst = Math.floor((yearsElapsed - 3) / 2) + 1;
        expiryDate = new Date(regDate.getFullYear() + 3 + (periodsAfterFirst * 2), regDate.getMonth(), regDate.getDate());
    }
    expiryDate.setDate(expiryDate.getDate() - 1);

    return expiryDate;
}

// =============================================
// LINEで見積書を共有
// =============================================

function shareToLine() {
    const docInfo = getDocumentTypeInfo();
    const userName = document.getElementById('userName').value || 'お客様';
    const plate = getPlateNumber();
    const grand = document.getElementById('grandTotal').textContent;
    const carName = document.getElementById('carName').value || '';
    const companyName = document.getElementById('companyName').value || '';

    // 車検満了日
    const expiryEl = document.getElementById('shakenExpiryDisplay');
    const expiryText = expiryEl ? expiryEl.innerText.replace(/\n/g, ' ') : '';

    // 整備項目リスト
    let maintenanceText = '';
    if (maintenanceItems.length > 0) {
        maintenanceText = '\n🔧 整備内容\n';
        maintenanceItems.forEach(item => {
            maintenanceText += `・${item.name} ×${item.qty} ¥${item.taxIncludedPrice.toLocaleString()}\n`;
        });
        const maintTotal = maintenanceItems.reduce((sum, i) => sum + i.taxIncludedPrice, 0);
        maintenanceText += `整備費用 小計: ¥${maintTotal.toLocaleString()}\n`;
    }

    // 法定費用
    const reserve = parseInt(document.getElementById('reservationFee').value) || 0;
    const agency = parseInt(document.getElementById('agencyFee').value) || 0;
    const legalFeeText = `\n📜 法定費用\n・重量税 ¥${currentLegalFees.weightTax.toLocaleString()}\n・自賠責 ¥${currentLegalFees.jibaiseki.toLocaleString()}\n・印紙代 ¥${currentLegalFees.stamp.toLocaleString()}\n・予備検査料 ¥${reserve.toLocaleString()}\n・代行手数料 ¥${agency.toLocaleString()}\n法定費用 合計: ¥${(currentLegalFees.weightTax + currentLegalFees.jibaiseki + currentLegalFees.stamp + reserve + agency).toLocaleString()}\n`;

    const message = `【${docInfo.title}】

${userName} 様

🚗 車両情報
ナンバー: ${plate}
車名: ${carName}
${expiryText ? `車検満了日: ${expiryText}` : ''}
${maintenanceText}${legalFeeText}
━━━━━━━━━━━━━━━
💰 ${docInfo.suffix}: ${grand}
━━━━━━━━━━━━━━━

${companyName}より`;

    // モバイル判定
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // LINE共有モーダルを表示
    document.getElementById('lineShareText').value = message;
    document.getElementById('lineShareModal').classList.add('active');

    // グローバル変数に保存（ボタンアクション用）
    window.currentLineMessage = message;
    window.currentLineUrl = `https://line.me/R/share?text=${encodeURIComponent(message)}`;
}

function closeLineShareModal() {
    document.getElementById('lineShareModal').classList.remove('active');
}

function copyLineText() {
    const textArea = document.getElementById('lineShareText');
    textArea.select();
    document.execCommand('copy');
    alert('📋 メッセージをコピーしました');
}

function openLineApp() {
    if (window.currentLineUrl) {
        window.open(window.currentLineUrl, '_blank');
    }
}

// 顧客データ保存時に車検満了日も保存
const originalSaveCustomerData = saveCustomerData;
saveCustomerData = function () {
    // 元の保存処理を呼び出し
    const plate = getPlateNumber();
    if (plate === '-') { alert('ナンバープレートを入力してください'); return; }

    const ownerSameAsUser = document.getElementById('ownerSameAsUser').checked;

    const data = {
        id: Date.now(), savedAt: new Date().toISOString(),
        userName: document.getElementById('userName').value,
        userNameKana: document.getElementById('userNameKana').value,
        userAddress: document.getElementById('userAddress').value,
        userTel: document.getElementById('userTel').value,
        userEmail: document.getElementById('userEmail').value,
        ownerSameAsUser: ownerSameAsUser,
        ownerName: ownerSameAsUser ? '' : document.getElementById('ownerName').value,
        ownerAddress: ownerSameAsUser ? '' : document.getElementById('ownerAddress').value,
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
        vehicleAge: document.getElementById('vehicleAge').value,
        shakenType: document.getElementById('shakenType').value // 車検区分を追加
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
};

// 顧客データ読み込み時に車検区分も復元
const originalLoadCustomerData = loadCustomerData;
loadCustomerData = function (id) {
    originalLoadCustomerData(id);
    const c = savedCustomers.find(x => x.id === id);
    if (c && c.shakenType) {
        document.getElementById('shakenType').value = c.shakenType;
    }
    calculateShakenExpiry();
};

// =============================================
// 見積履歴保存機能
// =============================================

const STORAGE_ESTIMATES = 'shaken_estimates';
const STORAGE_TEMPLATES = 'shaken_templates';
let savedEstimates = [];
let savedTemplates = [];

// 初期化時に履歴とテンプレートを読み込む
document.addEventListener('DOMContentLoaded', () => {
    const estimates = localStorage.getItem(STORAGE_ESTIMATES);
    if (estimates) savedEstimates = JSON.parse(estimates);
    const templates = localStorage.getItem(STORAGE_TEMPLATES);
    if (templates) savedTemplates = JSON.parse(templates);
});

// 現在の見積データを取得
function getCurrentEstimateData() {
    return {
        // 会社情報
        companyName: document.getElementById('companyName').value,
        companyTel: document.getElementById('companyTel').value,
        companyAddress: document.getElementById('companyAddress').value,
        // お客様情報
        userName: document.getElementById('userName').value,
        userNameKana: document.getElementById('userNameKana').value,
        userAddress: document.getElementById('userAddress').value,
        userTel: document.getElementById('userTel').value,
        userEmail: document.getElementById('userEmail').value,
        ownerSameAsUser: document.getElementById('ownerSameAsUser').checked,
        ownerName: document.getElementById('ownerName').value,
        ownerAddress: document.getElementById('ownerAddress').value,
        // 車両情報
        plateRegion: document.getElementById('plateRegion').value,
        plateClass: document.getElementById('plateClass').value,
        plateHiragana: document.getElementById('plateHiragana').value,
        plateSerial: document.getElementById('plateSerial').value,
        carMaker: document.getElementById('carMaker').value,
        carName: document.getElementById('carName').value,
        carModel: document.getElementById('carModel').value,
        chassisNumber: document.getElementById('chassisNumber').value,
        firstRegistration: document.getElementById('firstRegistration').value,
        mileage: document.getElementById('mileage').value,
        vehicleWeight: document.getElementById('vehicleWeight').value,
        vehicleAge: document.getElementById('vehicleAge').value,
        factoryType: document.getElementById('factoryType').value,
        useOSS: document.getElementById('useOSS').checked,
        shakenType: document.getElementById('shakenType').value,
        shakenExpiryDate: document.getElementById('shakenExpiryDate').value,
        // 法定費用
        reservationFee: document.getElementById('reservationFee').value,
        agencyFee: document.getElementById('agencyFee').value,
        // 整備項目
        maintenanceItems: [...maintenanceItems],
        // 備考・メモ
        notes: document.getElementById('notes').value,
        customerMemo: document.getElementById('customerMemo')?.value || '',
        // 書類種別
        documentType: document.getElementById('documentType').value
    };
}

// 見積を履歴に保存
function saveEstimateToHistory() {
    const plate = getPlateNumber();
    if (plate === '-') {
        alert('ナンバープレートを入力してください');
        return;
    }

    const data = getCurrentEstimateData();
    const grand = document.getElementById('grandTotal').textContent;

    const estimate = {
        id: Date.now(),
        savedAt: new Date().toISOString(),
        customerName: data.userName || '名前未登録',
        plateNumber: plate,
        carName: data.carName,
        grandTotal: grand,
        documentType: data.documentType,
        data: data
    };

    savedEstimates.unshift(estimate); // 最新を先頭に
    if (savedEstimates.length > 100) savedEstimates.pop(); // 最大100件

    localStorage.setItem(STORAGE_ESTIMATES, JSON.stringify(savedEstimates));
    alert('✅ 見積を履歴に保存しました。PDFを作成します...');

    // PDFとして保存（プレビューを表示してから保存）
    setTimeout(() => {
        // 現在の入力内容を確実に反映するために少し待機
        generatePDF();
    }, 500);
}

// 見積履歴モーダルを表示
function showEstimateHistoryModal() {
    renderEstimateHistory();
    document.getElementById('estimateHistoryModal').classList.add('active');
}

function closeEstimateHistoryModal() {
    document.getElementById('estimateHistoryModal').classList.remove('active');
}

// 履歴一覧をレンダリング
function renderEstimateHistory(search = '') {
    const container = document.getElementById('estimateHistoryItems');
    let list = savedEstimates;

    if (search) {
        const s = search.toLowerCase();
        list = list.filter(e =>
            (e.customerName || '').toLowerCase().includes(s) ||
            (e.plateNumber || '').includes(s) ||
            (e.carName || '').toLowerCase().includes(s) ||
            (e.grandTotal || '').includes(s)
        );
    }

    if (list.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px">保存された見積がありません</div>';
        return;
    }

    const docTypeLabels = { estimate: '📝見積', invoice: '📄請求', receipt: '🧾領収' };

    container.innerHTML = list.map(e => {
        const date = new Date(e.savedAt);
        const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        const docLabel = docTypeLabels[e.documentType] || '📝見積';

        return `
            <div class="estimate-history-item">
                <div class="estimate-info">
                    <div class="estimate-header">
                        <span class="doc-type">${docLabel}</span>
                        <span class="date">${dateStr}</span>
                    </div>
                    <div class="name">${escapeHtml(e.customerName)}</div>
                    <div class="details">🚗 ${escapeHtml(e.plateNumber)} | ${escapeHtml(e.carName || '')} | <strong>${e.grandTotal}</strong></div>
                </div>
                <div class="estimate-actions">
                    <button class="btn btn-primary btn-sm" onclick="loadEstimateFromHistory(${e.id})">読み込む</button>
                    <button class="btn btn-outline btn-sm" onclick="deleteEstimateFromHistory(${e.id})">削除</button>
                </div>
            </div>
        `;
    }).join('');
}

// 履歴から見積を読み込む
function loadEstimateFromHistory(id) {
    const e = savedEstimates.find(x => x.id === id);
    if (!e || !e.data) return;

    const d = e.data;

    // 会社情報
    document.getElementById('companyName').value = d.companyName || '';
    document.getElementById('companyTel').value = d.companyTel || '';
    document.getElementById('companyAddress').value = d.companyAddress || '';

    // お客様情報
    document.getElementById('userName').value = d.userName || '';
    document.getElementById('userNameKana').value = d.userNameKana || '';
    document.getElementById('userAddress').value = d.userAddress || '';
    document.getElementById('userTel').value = d.userTel || '';
    document.getElementById('userEmail').value = d.userEmail || '';
    document.getElementById('ownerSameAsUser').checked = d.ownerSameAsUser !== false;
    document.getElementById('ownerName').value = d.ownerName || '';
    document.getElementById('ownerAddress').value = d.ownerAddress || '';
    toggleOwnerSameAsUser();

    // 車両情報
    document.getElementById('plateRegion').value = d.plateRegion || '';
    document.getElementById('plateClass').value = d.plateClass || '';
    document.getElementById('plateHiragana').value = d.plateHiragana || '';
    document.getElementById('plateSerial').value = d.plateSerial || '';
    document.getElementById('carMaker').value = d.carMaker || '';
    document.getElementById('carName').value = d.carName || '';
    document.getElementById('carModel').value = d.carModel || '';
    document.getElementById('chassisNumber').value = d.chassisNumber || '';
    document.getElementById('firstRegistration').value = d.firstRegistration || '';
    document.getElementById('mileage').value = d.mileage || '';
    document.getElementById('vehicleWeight').value = d.vehicleWeight || '';
    document.getElementById('vehicleAge').value = d.vehicleAge || 'normal';
    document.getElementById('factoryType').value = d.factoryType || 'designated';
    document.getElementById('useOSS').checked = d.useOSS !== false;
    document.getElementById('shakenType').value = d.shakenType || 'continue';
    if (document.getElementById('shakenExpiryDate')) {
        document.getElementById('shakenExpiryDate').value = d.shakenExpiryDate || '';
    }

    // 法定費用
    document.getElementById('reservationFee').value = d.reservationFee || '2200';
    document.getElementById('agencyFee').value = d.agencyFee || '11000';

    // 整備項目
    maintenanceItems = d.maintenanceItems || [];
    renderMaintenanceTable();

    // 備考・メモ
    document.getElementById('notes').value = d.notes || '';
    if (document.getElementById('customerMemo')) {
        document.getElementById('customerMemo').value = d.customerMemo || '';
    }

    // 書類種別
    document.getElementById('documentType').value = d.documentType || 'estimate';

    // 表示更新
    if (typeof updateShakenExpiryDisplay === 'function') updateShakenExpiryDisplay();
    updateLegalFees();
    calculateShakenExpiry();
    calculateTotals();
    closeEstimateHistoryModal();
    alert('✅ 見積を読み込みました');
}

// 履歴から見積を削除
function deleteEstimateFromHistory(id) {
    if (!confirm('この見積を履歴から削除しますか？')) return;
    savedEstimates = savedEstimates.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_ESTIMATES, JSON.stringify(savedEstimates));
    renderEstimateHistory(document.getElementById('estimateHistorySearch')?.value || '');
}

// 履歴検索
function searchEstimateHistory() {
    renderEstimateHistory(document.getElementById('estimateHistorySearch').value);
}

// =============================================
// テンプレート機能
// =============================================

// 現在の見積をテンプレートとして保存
function saveAsTemplate() {
    const name = prompt('テンプレート名を入力してください：', '軽自動車 基本セット');
    if (!name) return;

    const template = {
        id: Date.now(),
        name: name,
        savedAt: new Date().toISOString(),
        maintenanceItems: [...maintenanceItems],
        reservationFee: document.getElementById('reservationFee').value,
        agencyFee: document.getElementById('agencyFee').value,
        notes: document.getElementById('notes').value
    };

    savedTemplates.push(template);
    localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(savedTemplates));
    alert(`✅ テンプレート「${name}」を保存しました`);
}

// テンプレートモーダルを表示
function showTemplateModal() {
    renderTemplateList();
    document.getElementById('templateModal').classList.add('active');
}

function closeTemplateModal() {
    document.getElementById('templateModal').classList.remove('active');
}

// テンプレート一覧をレンダリング
function renderTemplateList() {
    const container = document.getElementById('templateListItems');

    if (savedTemplates.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px">保存されたテンプレートがありません<br><small>見積作成後「テンプレートとして保存」で作成できます</small></div>';
        return;
    }

    container.innerHTML = savedTemplates.map(t => `
        <div class="template-item">
            <div class="template-info">
                <div class="name"><strong>${escapeHtml(t.name)}</strong></div>
                <div class="details">${t.maintenanceItems.length}項目 | 備考: ${t.notes ? '有' : '無'}</div>
            </div>
            <div class="template-actions">
                <button class="btn btn-primary btn-sm" onclick="applyTemplate(${t.id})">適用</button>
                <button class="btn btn-outline btn-sm" onclick="deleteTemplate(${t.id})">削除</button>
            </div>
        </div>
    `).join('');
}

// テンプレートを適用
function applyTemplate(id) {
    const t = savedTemplates.find(x => x.id === id);
    if (!t) return;

    if (maintenanceItems.length > 0) {
        if (!confirm('現在の整備項目をテンプレートの内容で上書きしますか？')) return;
    }

    maintenanceItems = t.maintenanceItems.map(item => ({
        ...item,
        id: Date.now() + Math.random() * 1000
    }));
    renderMaintenanceTable();

    document.getElementById('reservationFee').value = t.reservationFee || '2200';
    document.getElementById('agencyFee').value = t.agencyFee || '11000';
    if (t.notes) document.getElementById('notes').value = t.notes;

    calculateTotals();
    closeTemplateModal();
    alert(`✅ テンプレート「${t.name}」を適用しました`);
}

// テンプレートを削除
function deleteTemplate(id) {
    if (!confirm('このテンプレートを削除しますか？')) return;
    savedTemplates = savedTemplates.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_TEMPLATES, JSON.stringify(savedTemplates));
    renderTemplateList();
}

// =============================================
// QRコード生成機能
// =============================================

// QRコード生成モーダルを表示
function showQRCodeModal() {
    generateEstimateQRCode();
    document.getElementById('qrCodeModal').classList.add('active');
}

function closeQRCodeModal() {
    document.getElementById('qrCodeModal').classList.remove('active');
}

// 見積内容のQRコードを生成
function generateEstimateQRCode() {
    const container = document.getElementById('qrCodeDisplay');
    const docInfo = getDocumentTypeInfo();
    const userName = document.getElementById('userName').value || 'お客様';
    const plate = getPlateNumber();
    const grand = document.getElementById('grandTotal').textContent;
    const carName = document.getElementById('carName').value || '';
    const companyName = document.getElementById('companyName').value || '';

    // QRコードに含めるテキスト（簡潔に）
    const qrText = `【${docInfo.title}】
${userName} 様
🚗 ${plate} ${carName}
💰 ${docInfo.suffix}: ${grand}
${companyName}`;

    // QRコード生成（QRCode.jsライブラリを使用）
    container.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
        new QRCode(container, {
            text: qrText,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
        document.getElementById('qrCodeText').textContent = qrText;
    } else {
        // QRCodeライブラリがない場合はテキストのみ表示
        container.innerHTML = '<div style="padding:20px;background:#f5f5f5;border-radius:8px;"><p style="color:#666;">QRコードライブラリを読み込み中...</p></div>';

        // 動的にライブラリを読み込む
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
        script.onload = () => {
            // 簡易QRコード生成
            const qr = qrcode(0, 'M');
            qr.addData(qrText);
            qr.make();
            container.innerHTML = qr.createImgTag(5, 10);
            document.getElementById('qrCodeText').textContent = qrText;
        };
        document.head.appendChild(script);
    }
}

// =============================================
// 見積書↔請求書↔領収書 切り替え
// =============================================

function getDocumentTypeInfo() {
    const type = document.getElementById('documentType').value;
    switch (type) {
        case 'invoice':
            return { title: '請求書', suffix: 'ご請求額', icon: '📄' };
        case 'receipt':
            return { title: '領収書', suffix: '領収額', icon: '🧾' };
        default:
            return { title: '車検見積書', suffix: 'お見積金額', icon: '📝' };
    }
}

// =============================================
// 車検期限リマインダー表示
// =============================================

function showReminderModal() {
    renderReminderList();
    document.getElementById('reminderModal').classList.add('active');
}

function closeReminderModal() {
    document.getElementById('reminderModal').classList.remove('active');
}

function renderReminderList() {
    const container = document.getElementById('reminderListItems');
    const now = new Date();

    // 全顧客の車検満了日を計算
    const customersWithExpiry = savedCustomers.map(c => {
        if (!c.firstRegistration) return null;

        let regDate;
        if (c.firstRegistration.length === 7) {
            regDate = new Date(c.firstRegistration + '-01');
        } else {
            regDate = new Date(c.firstRegistration);
        }

        const shakenType = c.shakenType || 'continue';
        let expiryDate;
        if (shakenType === 'new') {
            expiryDate = new Date(regDate.getFullYear() + 3, regDate.getMonth(), regDate.getDate());
        } else {
            expiryDate = new Date(regDate.getFullYear() + 2, regDate.getMonth(), regDate.getDate());
        }
        expiryDate.setDate(expiryDate.getDate() - 1);

        const daysUntil = Math.ceil((expiryDate - now) / (24 * 60 * 60 * 1000));

        return {
            ...c,
            expiryDate,
            daysUntil,
            expiryStr: `${expiryDate.getFullYear()}年${expiryDate.getMonth() + 1}月${expiryDate.getDate()}日`
        };
    }).filter(c => c !== null);

    // 日付順にソート
    customersWithExpiry.sort((a, b) => a.expiryDate - b.expiryDate);

    if (customersWithExpiry.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#999;padding:40px">車検期限データがありません<br><small>顧客データを保存すると表示されます</small></div>';
        return;
    }

    container.innerHTML = customersWithExpiry.map(c => {
        let statusClass = '';
        let statusText = '';

        if (c.daysUntil < 0) {
            statusClass = 'expired';
            statusText = '期限切れ';
        } else if (c.daysUntil <= 30) {
            statusClass = 'urgent';
            statusText = `あと${c.daysUntil}日`;
        } else if (c.daysUntil <= 60) {
            statusClass = 'warning';
            statusText = `あと${c.daysUntil}日`;
        } else {
            statusClass = 'normal';
            statusText = `あと${c.daysUntil}日`;
        }

        const plate = `${c.plateRegion} ${c.plateClass} ${c.plateHiragana} ${c.plateSerial}`;

        return `
            <div class="reminder-item ${statusClass}">
                <div class="reminder-info">
                    <div class="name">${escapeHtml(c.userName || c.customerName || '名前未登録')}</div>
                    <div class="details">🚗 ${escapeHtml(plate)} | ${escapeHtml(c.carName || '')}</div>
                    <div class="expiry">📅 ${c.expiryStr}</div>
                </div>
                <div class="reminder-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <button class="btn btn-sm btn-primary" onclick="loadCustomerData(${c.id});closeReminderModal();">選択</button>
                </div>
            </div>
        `;
    }).join('');
}

// =============================================
// カスタムテーマ設定機能
// =============================================

const STORAGE_THEME = 'shaken_theme';
let currentTheme = {
    color: '#1a5a8a',
    logo: null // Base64 string
};

// 初期化時にテーマを適用
document.addEventListener('DOMContentLoaded', () => {
    loadThemeSettings();
    checkReminders(); // リマインダーチェックも実行
});

function loadThemeSettings() {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved) {
        currentTheme = JSON.parse(saved);
        applyTheme(currentTheme);
    }
}

function applyTheme(theme) {
    if (theme.color) {
        document.documentElement.style.setProperty('--primary', theme.color);
        // ライトカラーを計算（簡易的）
        document.documentElement.style.setProperty('--primary-light', adjustColor(theme.color, 20));

        // アクティブなボタンの表示更新
        const btns = document.querySelectorAll('.theme-color-btn');
        btns.forEach(btn => {
            // 色コードの比較（大文字小文字の違いを考慮）
            const btnColor = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
            if (btnColor.toLowerCase() === theme.color.toLowerCase()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    if (theme.logo) {
        const preview = document.getElementById('companyLogoPreview');
        const img = preview.querySelector('img');
        img.src = theme.logo;
        preview.style.display = 'block';
    }
}

function showThemeSettingsModal() {
    document.getElementById('themeSettingsModal').classList.add('active');
}

function closeThemeSettingsModal() {
    document.getElementById('themeSettingsModal').classList.remove('active');
}

function setThemeColor(color, btn) {
    currentTheme.color = color;
    document.querySelectorAll('.theme-color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // プレビュー適用
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-light', adjustColor(color, 20));
}

function handleLogoUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        currentTheme.logo = e.target.result;
        const preview = document.getElementById('companyLogoPreview');
        const img = preview.querySelector('img');
        img.src = currentTheme.logo;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function clearCompanyLogo() {
    currentTheme.logo = null;
    document.getElementById('companyLogoPreview').style.display = 'none';
    document.getElementById('companyLogoInput').value = '';
}

function saveThemeSettings() {
    localStorage.setItem(STORAGE_THEME, JSON.stringify(currentTheme));
    alert('✅ デザイン設定を保存しました');
    closeThemeSettingsModal();
}

// 色を明るくするヘルパー関数
function adjustColor(color, amount) {
    if (!color.startsWith('#')) return color;
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
    const b = Math.min(255, (num & 0x0000FF) + amount);
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// =============================================
// 車検満了日リマインダー自動チェック
// =============================================

function checkReminders() {
    const now = new Date();
    // 期限切れまたは30日以内の顧客がいるかチェック
    const urgentCustomers = savedCustomers.filter(c => {
        if (!c.firstRegistration) return false;
        let regDate;
        if (c.firstRegistration.length === 7) regDate = new Date(c.firstRegistration + '-01');
        else regDate = new Date(c.firstRegistration);

        const shakenType = c.shakenType || 'continue';
        let expiryDate;
        if (shakenType === 'new') expiryDate = new Date(regDate.getFullYear() + 3, regDate.getMonth(), regDate.getDate());
        else expiryDate = new Date(regDate.getFullYear() + 2, regDate.getMonth(), regDate.getDate());
        expiryDate.setDate(expiryDate.getDate() - 1);

        const daysUntil = Math.ceil((expiryDate - now) / (24 * 60 * 60 * 1000));
        return daysUntil <= 30;
    });

    if (urgentCustomers.length > 0) {
        const btn = document.querySelector('button[onclick="showReminderModal()"]');
        if (btn) {
            btn.innerHTML = `🔔 車検期限 <span style="background:#e74c3c;color:white;border-radius:10px;padding:2px 8px;font-size:0.8em;font-weight:bold;margin-left:4px;">${urgentCustomers.length}</span>`;
            // 簡易アニメーションとして色を変更
            btn.style.background = 'linear-gradient(135deg, #e67e22, #d35400)';
            btn.style.boxShadow = '0 0 10px rgba(230, 126, 34, 0.5)';
        }
    }
}

// =============================================
// 車検証JSONインポート機能
// =============================================

function showJsonImportModal() {
    // リセット状態
    document.getElementById('jsonImportResult').style.display = 'none';
    document.getElementById('jsonImportError').style.display = 'none';
    document.getElementById('jsonFileInput').value = '';
    document.getElementById('jsonImportModal').classList.add('active');

    // ドラッグ＆ドロップ設定
    const dropZone = document.getElementById('jsonDropZone');
    dropZone.ondragover = (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#1a5a8a';
        dropZone.style.background = '#f0f7ff';
    };
    dropZone.ondragleave = (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.background = 'transparent';
    };
    dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.background = 'transparent';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processJsonFile(files[0]);
        }
    };
}

function closeJsonImportModal() {
    document.getElementById('jsonImportModal').classList.remove('active');
}

function handleJsonFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processJsonFile(file);
    }
}

function processJsonFile(file) {
    const resultDiv = document.getElementById('jsonImportResult');
    const errorDiv = document.getElementById('jsonImportError');
    const previewEl = document.getElementById('jsonImportPreview');
    const errorText = document.getElementById('jsonImportErrorText');

    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    if (!file.name.endsWith('.json')) {
        errorDiv.style.display = 'block';
        errorText.textContent = 'JSONファイルを選択してください。';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            applyVehicleCertificateData(data);

            // 成功表示
            resultDiv.style.display = 'block';
            const appliedInfo = [];
            if (data['自動車登録番号'] || data['登録番号']) appliedInfo.push(`登録番号: ${data['自動車登録番号'] || data['登録番号']}`);
            if (data['車名']) appliedInfo.push(`車名: ${data['車名']}`);
            if (data['有効期間の満了する日']) appliedInfo.push(`有効期間: ${data['有効期間の満了する日']}`);
            if (data['使用者の氏名又は名称']) appliedInfo.push(`使用者: ${data['使用者の氏名又は名称']}`);
            previewEl.textContent = appliedInfo.join('\n') || 'データを適用しました';

        } catch (err) {
            errorDiv.style.display = 'block';
            errorText.textContent = 'JSONの解析に失敗しました: ' + err.message;
        }
    };
    reader.onerror = () => {
        errorDiv.style.display = 'block';
        errorText.textContent = 'ファイルの読み込みに失敗しました。';
    };
    reader.readAsText(file);
}

function applyVehicleCertificateData(data) {
    // 車検証閲覧アプリのJSONフォーマットに対応
    // 国交省仕様: https://www.mlit.go.jp/jidosha/denshishakennsho.html

    // 登録番号（ナンバープレート）の解析
    const plateNumber = data['自動車登録番号'] || data['登録番号'] || data['車両番号'] || '';
    if (plateNumber) {
        // 例: "品川 500 あ 1234" 形式を分解
        const plateMatch = plateNumber.match(/^(.+?)\s*(\d{1,3})\s*([あ-ん])\s*(\d{1,4})$/);
        if (plateMatch) {
            const plateRegionEl = document.getElementById('plateRegion');
            const plateClassEl = document.getElementById('plateClass');
            const plateHiraganaEl = document.getElementById('plateHiragana');
            const plateSerialEl = document.getElementById('plateSerial');

            if (plateRegionEl) plateRegionEl.value = plateMatch[1].trim();
            if (plateClassEl) plateClassEl.value = plateMatch[2];
            if (plateHiraganaEl) {
                const hiragana = plateMatch[3];
                const options = plateHiraganaEl.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === hiragana) {
                        plateHiraganaEl.selectedIndex = i;
                        break;
                    }
                }
            }
            if (plateSerialEl) plateSerialEl.value = plateMatch[4];
        }
    }

    // 車名
    if (data['車名']) {
        const carNameEl = document.getElementById('carName');
        if (carNameEl) carNameEl.value = data['車名'];
    }

    // 型式
    if (data['型式']) {
        const carModelEl = document.getElementById('carModel');
        if (carModelEl) carModelEl.value = data['型式'];
    }

    // 車台番号
    if (data['車台番号']) {
        const chassisEl = document.getElementById('chassisNumber');
        if (chassisEl) chassisEl.value = data['車台番号'];
    }

    // 車両重量
    if (data['車両重量'] || data['車両総重量']) {
        const weightStr = data['車両重量'] || data['車両総重量'];
        const weightMatch = weightStr.match(/(\d+)/);
        if (weightMatch) {
            const weightKg = parseInt(weightMatch[1]);
            const weightClassEl = document.getElementById('weightClass');
            if (weightClassEl) {
                if (weightKg <= 500) weightClassEl.value = '~500';
                else if (weightKg <= 1000) weightClassEl.value = '~1000';
                else if (weightKg <= 1500) weightClassEl.value = '~1500';
                else if (weightKg <= 2000) weightClassEl.value = '~2000';
                else if (weightKg <= 2500) weightClassEl.value = '~2500';
                else weightClassEl.value = '~3000';
                weightClassEl.dispatchEvent(new Event('change'));
            }
        }
    }

    // 初度登録年月
    if (data['初度登録年月'] || data['初度検査年月']) {
        const regDate = data['初度登録年月'] || data['初度検査年月'];
        const firstRegEl = document.getElementById('firstRegistration');
        if (firstRegEl) {
            const convertedDate = convertJapaneseDate(regDate);
            if (convertedDate) {
                firstRegEl.value = convertedDate;
                firstRegEl.dispatchEvent(new Event('change'));
            }
        }
    }

    // 使用者情報
    if (data['使用者の氏名又は名称']) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.value = data['使用者の氏名又は名称'];
    }
    if (data['使用者の住所']) {
        const userAddressEl = document.getElementById('userAddress');
        if (userAddressEl) userAddressEl.value = data['使用者の住所'];
    }

    // 所有者情報
    if (data['所有者の氏名又は名称']) {
        const ownerNameEl = document.getElementById('ownerName');
        if (ownerNameEl) ownerNameEl.value = data['所有者の氏名又は名称'];
    }
    if (data['所有者の住所']) {
        const ownerAddressEl = document.getElementById('ownerAddress');
        if (ownerAddressEl) ownerAddressEl.value = data['所有者の住所'];
    }

    // 法定費用を再計算
    if (typeof calculateLegalFees === 'function') {
        calculateLegalFees();
    }

    // 2秒後にモーダルを自動で閉じる
    setTimeout(() => {
        closeJsonImportModal();
    }, 2000);
}

// 和暦→西暦変換ヘルパー
function convertJapaneseDate(dateStr) {
    if (!dateStr) return null;

    // 既に西暦形式の場合
    const westernMatch = dateStr.match(/(\d{4})[年\-\/](\d{1,2})/);
    if (westernMatch) {
        return `${westernMatch[1]}-${westernMatch[2].padStart(2, '0')}`;
    }

    // 和暦変換
    const eraPatterns = [
        { pattern: /令和(\d+)年(\d{1,2})/, base: 2018 },
        { pattern: /平成(\d+)年(\d{1,2})/, base: 1988 },
        { pattern: /昭和(\d+)年(\d{1,2})/, base: 1925 }
    ];

    for (const era of eraPatterns) {
        const match = dateStr.match(era.pattern);
        if (match) {
            const year = era.base + parseInt(match[1]);
            const month = match[2].padStart(2, '0');
            return `${year}-${month}`;
        }
    }

    return null;
}


