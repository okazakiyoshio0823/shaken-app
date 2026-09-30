// ============================================
// 法定費用の料金表（重量税・自賠責・検査手数料）と計算
//
// 国の料金は年に1〜2回変わる。料金ごとに「いつから有効か（from）」を持たせ、
// 車検の日付（車検満了日。未入力なら今日）で自動で切り替える。
// 改定が発表されたら、該当する表の末尾に { from: '改定日', ... } を1行足し、checkedOn を更新する。
// 出典はすべて国（国土交通省）と損害保険料率算出機構の公式資料。
// ============================================

const LEGAL_FEES = {
    checkedOn: '2026-09-30',   // 最後に国の資料と照らし合わせた日

    sources: {
        jibaiseki: 'https://www.giroj.or.jp/publication/cali_table.html',
        inspectionFee: 'https://www.mlit.go.jp/jidosha/content/001986066.pdf',
        weightTax: 'https://www.mlit.go.jp/jidosha/content/001884517.pdf'
    },

    // ----------------------------------------
    // 車両の区分。重量税・自賠責・検査手数料のどの表を使うかを決める
    //   weight:     重量税の表（下の weightTax のキー）
    //   weightBy:   重量税を何で決めるか vehicle=車両重量 / gross=車両総重量 / fixed=重さに関係なし
    //   jibaiseki:  自賠責の表のキー。関数のときは最大積載量で選ぶ
    //   inspection: 持込検査の手数料の区分 plate=ナンバーの分類番号で普通/小型を見分ける
    //   ageRule:    13年・18年経過の数え方 registered=登録車 / kei=軽自動車
    //   eco:        エコカー減税の対象になりうるか
    // ----------------------------------------
    categories: {
        passenger: { label: '乗用（自家用・3/5/7ナンバー）', weight: 'passenger', weightBy: 'vehicle', jibaiseki: 'passenger', inspection: 'plate', ageRule: 'registered', eco: true },
        kei: { label: '軽自動車（自家用・黄色ナンバー）', weight: 'kei', weightBy: 'fixed', jibaiseki: 'kei', inspection: 'kei', ageRule: 'kei', eco: true },
        keiBusiness: { label: '軽自動車（事業用・黒ナンバー）', weight: 'keiBusiness', weightBy: 'fixed', jibaiseki: 'kei', inspection: 'kei', ageRule: 'kei', eco: true },
        smallCargo: { label: '小型貨物（自家用・4ナンバー）', weight: 'truckPrivate', weightBy: 'gross', jibaiseki: 'smallCargoPrivate', inspection: 'small', ageRule: 'registered', eco: true },
        smallCargoBusiness: { label: '小型貨物（事業用・緑4ナンバー）', weight: 'truckBusiness', weightBy: 'gross', jibaiseki: 'smallCargoBusiness', inspection: 'small', ageRule: 'registered', eco: true },
        cargo: { label: '普通貨物（自家用・1ナンバー）', weight: 'truckPrivate', weightBy: 'gross', jibaiseki: maxLoad => maxLoad > 2000 ? 'cargoPrivateOver2t' : 'cargoPrivateUnder2t', inspection: 'normal', ageRule: 'registered', eco: true },
        cargoBusiness: { label: '普通貨物（事業用・緑1ナンバー）', weight: 'truckBusiness', weightBy: 'gross', jibaiseki: maxLoad => maxLoad > 2000 ? 'cargoBusinessOver2t' : 'cargoBusinessUnder2t', inspection: 'normal', ageRule: 'registered', eco: true },
        special: { label: '特種用途（自家用・8ナンバー／キャンピングカー等）', weight: 'special', weightBy: 'gross', jibaiseki: 'specialOther', inspection: 'plate', ageRule: 'registered', eco: true },
        motorcycle: { label: '小型二輪（250cc超のバイク）', weight: 'motorcycle', weightBy: 'fixed', jibaiseki: 'motorcycle', inspection: 'motorcycle', ageRule: 'registered', eco: false }
    },

    // ----------------------------------------
    // 自動車重量税（継続検査）。出典: 国土交通省「2026年5月1日からの自動車重量税の税額表」
    // eco=エコカー（本則税率） normal=13年未満 over13=13年経過 over18=18年経過
    // per: 何kgごとの税額か。rows がある表は車両総重量の上限ごとの額（kg）
    // 年数（1/2/3）ごとに持つ。3年は新車の初回（乗用・軽のみ）
    // ----------------------------------------
    weightTax: {
        passenger: {
            per: 500,
            1: { eco: 2500, normal: 4100, over13: 5700, over18: 6300 },
            2: { eco: 5000, normal: 8200, over13: 11400, over18: 12600 },
            3: { eco: 7500, normal: 12300, over13: 12300, over18: 12300 }
        },
        kei: {
            2: { eco: 5000, normal: 6600, over13: 8200, over18: 8800 },
            3: { eco: 7500, normal: 9900, over13: 9900, over18: 9900 }
        },
        keiBusiness: {
            2: { eco: 5000, normal: 5200, over13: 5400, over18: 5600 }
        },
        // 車両総重量8トン以下のトラック（自家用）。2.5トン以下は1トンあたりが安い
        truckPrivate: {
            rows: [
                { upTo: 1000, 1: { eco: 2500, normal: 3300, over13: 4100, over18: 4400 } },
                { upTo: 2000, 1: { eco: 5000, normal: 6600, over13: 8200, over18: 8800 } },
                { upTo: 2500, 1: { eco: 7500, normal: 9900, over13: 12300, over18: 13200 } },
                { upTo: 3000, 1: { eco: 7500, normal: 12300, over13: 17100, over18: 18900 } },
                { upTo: 4000, 1: { eco: 10000, normal: 16400, over13: 22800, over18: 25200 } },
                { upTo: 5000, 1: { eco: 12500, normal: 20500, over13: 28500, over18: 31500 } },
                { upTo: 6000, 1: { eco: 15000, normal: 24600, over13: 34200, over18: 37800 } },
                { upTo: 7000, 1: { eco: 17500, normal: 28700, over13: 39900, over18: 44100 } },
                { upTo: 8000, 1: { eco: 20000, normal: 32800, over13: 45600, over18: 50400 } }
            ],
            // 8トン超（1トンあたり・1年）
            over8t: { per: 1000, 1: { eco: 2500, normal: 4100, over13: 5700, over18: 6300 } }
        },
        truckBusiness: {
            rows: [
                { upTo: 1000, 1: { eco: 2500, normal: 2600, over13: 2700, over18: 2800 } },
                { upTo: 2000, 1: { eco: 5000, normal: 5200, over13: 5400, over18: 5600 } },
                { upTo: 2500, 1: { eco: 7500, normal: 7800, over13: 8100, over18: 8400 } },
                { upTo: 3000, 1: { eco: 7500, normal: 7800, over13: 8100, over18: 8400 } },
                { upTo: 4000, 1: { eco: 10000, normal: 10400, over13: 10800, over18: 11200 } },
                { upTo: 5000, 1: { eco: 12500, normal: 13000, over13: 13500, over18: 14000 } },
                { upTo: 6000, 1: { eco: 15000, normal: 15600, over13: 16200, over18: 16800 } },
                { upTo: 7000, 1: { eco: 17500, normal: 18200, over13: 18900, over18: 19600 } },
                { upTo: 8000, 1: { eco: 20000, normal: 20800, over13: 21600, over18: 22400 } }
            ],
            over8t: { per: 1000, 1: { eco: 2500, normal: 2600, over13: 2700, over18: 2800 } }
        },
        // 特種用途車（自家用）。車両総重量1トンごと
        special: {
            per: 1000,
            1: { eco: 2500, normal: 4100, over13: 5700, over18: 6300 },
            2: { eco: 5000, normal: 8200, over13: 11400, over18: 12600 }
        },
        // 小型二輪（エコカー減税なし）
        motorcycle: {
            1: { eco: 1900, normal: 1900, over13: 2300, over18: 2500 },
            2: { eco: 3800, normal: 3800, over13: 4600, over18: 5000 }
        }
    },

    // ----------------------------------------
    // 自賠責保険料（離島・沖縄県以外）。保険期間の始まる日で決まる
    // 出典: 損害保険料率算出機構「自動車損害賠償責任保険基準料率」
    //   2023年1月届出（2023/4/1〜2026/10/31）、2026年4月届出（2026/11/1〜）
    // ----------------------------------------
    jibaiseki: [
        {
            from: '2023-04-01',
            passenger: { 12: 11500, 13: 12010, 24: 17650, 25: 18160, 36: 23690, 37: 24190 },
            kei: { 12: 11440, 13: 11950, 24: 17540, 25: 18040, 36: 23520, 37: 24010 },
            smallCargoPrivate: { 12: 12850, 13: 13480, 24: 20340, 25: 20950 },
            smallCargoBusiness: { 12: 15830, 13: 16700, 24: 26240, 25: 27090 },
            cargoPrivateUnder2t: { 12: 16900, 13: 17860, 24: 28370, 25: 29300 },
            cargoPrivateOver2t: { 12: 18230, 13: 19290, 24: 30980, 25: 32030 },
            cargoBusinessUnder2t: { 12: 17790, 13: 18810, 24: 30110, 25: 31120 },
            cargoBusinessOver2t: { 12: 24100, 13: 25640, 24: 42610, 25: 44130 },
            specialOther: { 12: 12670, 13: 13280, 24: 19980, 25: 20580 },
            motorcycle: { 12: 7010, 13: 7150, 24: 8760, 25: 8910, 36: 10490, 37: 10630 }
        },
        {
            from: '2026-11-01',
            passenger: { 12: 12250, 13: 12770, 24: 18560, 25: 19070, 36: 24690, 37: 25180 },
            kei: { 12: 12300, 13: 12830, 24: 18660, 25: 19170, 36: 24830, 37: 25330 },
            smallCargoPrivate: { 12: 13710, 13: 14350, 24: 21430, 25: 22060 },
            smallCargoBusiness: { 12: 16670, 13: 17550, 24: 27270, 25: 28130 },
            cargoPrivateUnder2t: { 12: 17930, 13: 18910, 24: 29750, 25: 30710 },
            cargoPrivateOver2t: { 12: 19130, 13: 20220, 24: 32130, 25: 33180 },
            cargoBusinessUnder2t: { 12: 18680, 13: 19730, 24: 31240, 25: 32260 },
            cargoBusinessOver2t: { 12: 25180, 13: 26750, 24: 44050, 25: 45570 },
            specialOther: { 12: 13770, 13: 14410, 24: 21550, 25: 22180 },
            motorcycle: { 12: 7730, 13: 7890, 24: 9640, 25: 9800, 36: 11510, 37: 11660 }
        }
    ],

    // ----------------------------------------
    // 継続検査の手数料（印紙・証紙代の合計）
    //   designatedOSS    指定工場（保安基準適合証）でOSS申請
    //   designatedWindow 指定工場（保安基準適合証）で窓口申請
    //   carryIn          持込検査（認証工場）
    // 出典: 国土交通省「自動車の登録・検査の法定手数料変更について（令和8年4月1日）」
    // ----------------------------------------
    inspectionFee: [
        {
            from: '2023-01-01',
            designatedOSS: { normal: 1600, small: 1600, kei: 1600, motorcycle: 1200 },
            designatedWindow: { normal: 1800, small: 1800, kei: 1800, motorcycle: 1200 },
            carryIn: { normal: 2300, small: 2200, kei: 2200, motorcycle: 1800 }
        },
        {
            from: '2026-04-01',
            designatedOSS: { normal: 1850, small: 1850, kei: 1850, motorcycle: 1500 },
            designatedWindow: { normal: 2100, small: 2100, kei: 2100, motorcycle: 1500 },
            carryIn: { normal: 2600, small: 2500, kei: 2500, motorcycle: 2100 }
        }
    ],

    // 店で決めている手数料
    reservationFee: 500,       // 検査予約手数料
    agencyFeeExTax: 10000      // 代行手数料（税抜。消費税を足して入れる）
};

// 車検の期間（年）と、ふつう入る自賠責の月数
const SHAKEN_TERMS = {
    continue: { years: 2, jibaisekiMonths: 24, label: '継続車検（2年）' },
    continue1: { years: 1, jibaisekiMonths: 12, label: '継続車検（1年）' },
    new: { years: 3, jibaisekiMonths: 37, label: '新車（初回3年）' }
};

// 料金表から、date（YYYY-MM-DD）の時点で有効なものを選ぶ
function pickFeeByDate(list, date) {
    let picked = list[0];
    list.forEach(row => { if (row.from <= date) picked = row; });
    return picked;
}

function getVehicleCategory(key) {
    return LEGAL_FEES.categories[key] || LEGAL_FEES.categories.passenger;
}

// 自賠責。表に無い月数（例: 貨物の36か月）は null を返す
function calculateJibaiseki(categoryKey, months, date, maxLoadKg) {
    const cat = getVehicleCategory(categoryKey);
    const tableKey = typeof cat.jibaiseki === 'function' ? cat.jibaiseki(maxLoadKg || 0) : cat.jibaiseki;
    const row = pickFeeByDate(LEGAL_FEES.jibaiseki, date);
    const fee = row[tableKey] && row[tableKey][months];
    return fee === undefined ? null : fee;
}

// 検査手数料。plateClass はナンバーの分類番号（5・4・7で始まれば小型）
function calculateInspectionFee(categoryKey, plateClass, factoryType, useOSS, date) {
    const cat = getVehicleCategory(categoryKey);
    let kind = cat.inspection;
    if (kind === 'plate') kind = /^[457]/.test(String(plateClass || '').trim()) ? 'small' : 'normal';
    const row = pickFeeByDate(LEGAL_FEES.inspectionFee, date);
    const table = factoryType === 'certified' ? row.carryIn : (useOSS ? row.designatedOSS : row.designatedWindow);
    return table[kind];
}

// 重量税の経過年数（国土交通省「13・18年経過する自動車の経過年数の考え方」）
//   登録車・小型二輪: 初度登録年月から12年10ヶ月たった月から「13年経過」（18年も同じく17年10ヶ月）
//   軽自動車:         初度検査の年から13年たった年の11月1日から「13年経過」
// firstRegistration, date は YYYY-MM-DD
function calculateVehicleAgeClass(firstRegistration, date, ageRule = 'registered') {
    const [fy, fm] = String(firstRegistration).split('-').map(Number);
    const [ry, rm] = String(date).split('-').map(Number);
    if (!fy || !ry || !rm) return '';

    if (ageRule === 'kei') {
        const passed = years => ry > fy + years || (ry === fy + years && rm >= 11);
        if (passed(18)) return 'over18';
        if (passed(13)) return 'over13';
        return 'normal';
    }

    if (!fm) return '';
    const months = (ry - fy) * 12 + (rm - fm);
    if (months >= 18 * 12 - 2) return 'over18';
    if (months >= 13 * 12 - 2) return 'over13';
    return 'normal';
}

// 重量税。eco: 'exempt'=免税 / 'eco'=本則税率 / それ以外=経過年数の税率
// 表に無い組み合わせ（例: 軽の1年）は null を返す
function calculateWeightTax({ categoryKey, years, vehicleWeightKg, grossWeightKg, ageClass, eco }) {
    if (eco === 'exempt') return 0;
    const cat = getVehicleCategory(categoryKey);
    const table = LEGAL_FEES.weightTax[cat.weight];
    const col = eco === 'eco' && cat.eco ? 'eco' : (ageClass || 'normal');

    if (table.rows) {
        if (!grossWeightKg) return null;
        // トラックは1年の表しかない（2年は1年の2倍）
        const mult = years;
        const row = table.rows.find(r => grossWeightKg <= r.upTo);
        if (row) return row[1][col] * mult;
        const units = Math.ceil(grossWeightKg / table.over8t.per);
        return table.over8t[1][col] * units * mult;
    }

    const rate = table[years];
    if (!rate) return null;
    if (cat.weightBy === 'fixed') return rate[col];
    const kg = cat.weightBy === 'gross' ? grossWeightKg : vehicleWeightKg;
    if (!kg) return null;
    return rate[col] * Math.ceil(kg / table.per);
}
