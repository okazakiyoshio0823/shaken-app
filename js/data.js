// 法定費用データ（2025年最新版）
const LEGAL_FEES = {
    weightTax: {
        kei: { ecocar: 5000, normal: 6600, over13: 8200, over18: 8800 },
        under500kg: { ecocar: 5000, normal: 8200, over13: 11400, over18: 12600 },
        under1000kg: { ecocar: 10000, normal: 16400, over13: 22800, over18: 25200 },
        under1500kg: { ecocar: 15000, normal: 24600, over13: 34200, over18: 37800 },
        under2000kg: { ecocar: 20000, normal: 32800, over13: 45600, over18: 50400 },
        under2500kg: { ecocar: 25000, normal: 41000, over13: 57000, over18: 63000 },
        under3000kg: { ecocar: 30000, normal: 49200, over13: 68400, over18: 75600 }
    },
    jibaiseki: { normal: 17650, kei: 17540 },
    stamp: {
        normal: { certified: 2300, designated: 1800, designatedOSS: 1600 },
        kei: { window: 2200, oss: 1100 }
    }
};

function calculateWeightTax(weight, vehicleAge, isKei) {
    let category;
    if (isKei) category = LEGAL_FEES.weightTax.kei;
    else if (weight <= 500) category = LEGAL_FEES.weightTax.under500kg;
    else if (weight <= 1000) category = LEGAL_FEES.weightTax.under1000kg;
    else if (weight <= 1500) category = LEGAL_FEES.weightTax.under1500kg;
    else if (weight <= 2000) category = LEGAL_FEES.weightTax.under2000kg;
    else if (weight <= 2500) category = LEGAL_FEES.weightTax.under2500kg;
    else category = LEGAL_FEES.weightTax.under3000kg;
    return category[vehicleAge] || category.normal;
}

function calculateStampFee(isKei, factoryType, useOSS) {
    if (isKei) return useOSS ? LEGAL_FEES.stamp.kei.oss : LEGAL_FEES.stamp.kei.window;
    if (factoryType === 'certified') return LEGAL_FEES.stamp.normal.certified;
    return useOSS ? LEGAL_FEES.stamp.normal.designatedOSS : LEGAL_FEES.stamp.normal.designated;
}

// 整備項目カテゴリ
const MAINTENANCE_CATEGORIES = {
    basic: {
        name: "基本料金", items: [
            { name: "24ヶ月法定点検基本料金", price: 15000 },
            { name: "保安確認検査料", price: 12000 },
            { name: "完成検査料", price: 8000 },
            { name: "書類作成代行料", price: 5000 }
        ]
    },
    oil: {
        name: "オイル関連", items: [
            { name: "エンジンオイル交換（〜3L）", price: 3000 },
            { name: "エンジンオイル交換（〜4L）", price: 4000 },
            { name: "エンジンオイル交換（〜5L）", price: 5000 },
            { name: "オイルフィルター交換", price: 2500 },
            { name: "ATF交換", price: 8000 },
            { name: "CVTフルード交換", price: 10000 },
            { name: "ミッションオイル交換", price: 5000 },
            { name: "デフオイル交換", price: 4000 }
        ]
    },
    brake: {
        name: "ブレーキ関連", items: [
            { name: "ブレーキフルード交換", price: 6000 },
            { name: "ブレーキパッド交換（フロント左右）", price: 18000 },
            { name: "ブレーキパッド交換（リア左右）", price: 16000 },
            { name: "ブレーキシュー交換（左右）", price: 15000 },
            { name: "ブレーキローター交換（1枚）", price: 12000 },
            { name: "サイドブレーキ調整", price: 3000 }
        ]
    },
    cooling: {
        name: "冷却系", items: [
            { name: "LLC（冷却水）交換", price: 5000 },
            { name: "ラジエターキャップ交換", price: 1500 },
            { name: "サーモスタット交換", price: 8000 },
            { name: "ラジエターホース交換", price: 6000 }
        ]
    },
    belt: {
        name: "ベルト関連", items: [
            { name: "ファンベルト交換", price: 6000 },
            { name: "エアコンベルト交換", price: 6000 },
            { name: "タイミングベルト交換", price: 40000 },
            { name: "タイミングベルト交換（WP含む）", price: 55000 }
        ]
    },
    electrical: {
        name: "電装関連", items: [
            { name: "バッテリー交換（40B19）", price: 8000 },
            { name: "バッテリー交換（55B24）", price: 12000 },
            { name: "バッテリー交換（75D23）", price: 18000 },
            { name: "スパークプラグ交換（4本）", price: 6000 },
            { name: "ヘッドライトバルブ交換（1個）", price: 2000 }
        ]
    },
    wiper: {
        name: "ワイパー関連", items: [
            { name: "ワイパーゴム交換（フロント左右）", price: 2000 },
            { name: "ワイパーブレード交換（フロント左右）", price: 4000 },
            { name: "ワイパーゴム交換（リア）", price: 1000 },
            { name: "ウォッシャー液補充", price: 300 }
        ]
    },
    filter: {
        name: "フィルター関連", items: [
            { name: "エアクリーナエレメント交換", price: 3500 },
            { name: "エアコンフィルター交換", price: 3000 },
            { name: "燃料フィルター交換", price: 6000 }
        ]
    },
    tire: {
        name: "タイヤ関連", items: [
            { name: "タイヤローテーション", price: 3000 },
            { name: "ホイールバランス調整（4本）", price: 4000 },
            { name: "パンク修理（1本）", price: 2500 },
            { name: "ドライブシャフトブーツ交換", price: 12000 }
        ]
    },
    other: {
        name: "その他", items: [
            { name: "下廻りスチーム洗浄", price: 3500 },
            { name: "下廻り防錆塗装", price: 8000 },
            { name: "発炎筒交換", price: 800 },
            { name: "ヘッドライト光軸調整", price: 3000 },
            { name: "洗車", price: 2000 }
        ]
    }
};

const TAX_RATE = 0.10;
