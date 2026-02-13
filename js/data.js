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
            { name: "24ヶ月法定点検基本料金", wage: 15000 },
            { name: "保安確認検査料", wage: 12000 },
            { name: "完成検査料", wage: 8000 },
            { name: "書類作成代行料", wage: 5000 }
        ]
    },
    oil: {
        name: "オイル関連", items: [
            { name: "エンジンオイル交換（〜3L）", parts: 1500, wage: 1500, isFluid: true },
            { name: "エンジンオイル交換（〜4L）", parts: 2000, wage: 2000, isFluid: true },
            { name: "エンジンオイル交換（〜5L）", parts: 2500, wage: 2500, isFluid: true },
            { name: "オイルフィルター交換", parts: 1500, wage: 1000 },
            { name: "ATF交換", parts: 5000, wage: 3000, isFluid: true },
            { name: "CVTフルード交換", parts: 7000, wage: 3000, isFluid: true },
            { name: "ミッションオイル交換", parts: 3000, wage: 2000, isFluid: true },
            { name: "デフオイル交換", parts: 2500, wage: 1500, isFluid: true },
            { name: "パワーステアリングフルード交換", parts: 2000, wage: 2500, isFluid: true },
            { name: "4WDオイル（トランスファー）交換", parts: 3500, wage: 2500, isFluid: true }
        ]
    },
    brake: {
        name: "ブレーキ関連", items: [
            { name: "ブレーキフルード交換", parts: 2000, wage: 4000, isFluid: true },
            { name: "ブレーキパッド交換（フロント左右）", parts: 10000, wage: 8000 },
            { name: "ブレーキパッド交換（リア左右）", parts: 8000, wage: 8000 },
            { name: "ブレーキシュー交換（左右）", parts: 7000, wage: 8000 },
            { name: "ブレーキローター交換（1枚）", parts: 8000, wage: 4000 },
            { name: "サイドブレーキ調整", wage: 3000 }
        ]
    },
    cooling: {
        name: "冷却系", items: [
            { name: "LLC（冷却水）交換", parts: 2000, wage: 3000, isFluid: true },
            { name: "エンジンクーラント補充", parts: 500, wage: 500, isFluid: true },
            { name: "ラジエターキャップ交換", parts: 1000, wage: 500 },
            { name: "サーモスタット交換", parts: 3000, wage: 5000 },
            { name: "ラジエターホース交換", parts: 2000, wage: 4000 }
        ]
    },
    belt: {
        name: "ベルト関連", items: [
            { name: "ファンベルト交換", parts: 3000, wage: 3000 },
            { name: "エアコンベルト交換", parts: 3000, wage: 3000 },
            { name: "タイミングベルト交換", parts: 15000, wage: 25000 },
            { name: "タイミングベルト交換（WP含む）", parts: 25000, wage: 30000 }
        ]
    },
    electrical: {
        name: "電装関連", items: [
            { name: "バッテリー交換（40B19）", parts: 6000, wage: 2000 },
            { name: "バッテリー交換（55B24）", parts: 10000, wage: 2000 },
            { name: "バッテリー交換（75D23）", parts: 16000, wage: 2000 },
            { name: "スパークプラグ交換（4本）", parts: 3000, wage: 3000 },
            { name: "ヘッドライトバルブ交換（1個）", parts: 1000, wage: 1000 }
        ]
    },
    wiper: {
        name: "ワイパー関連", items: [
            { name: "ワイパーゴム交換（フロント左右）", parts: 1500, wage: 500 },
            { name: "ワイパーブレード交換（フロント左右）", parts: 3000, wage: 1000 },
            { name: "ワイパーゴム交換（リア）", parts: 800, wage: 200 },
            { name: "ウォッシャー液補充", parts: 300 }
        ]
    },
    filter: {
        name: "フィルター関連", items: [
            { name: "エアクリーナエレメント交換", parts: 2500, wage: 1000 },
            { name: "エアコンフィルター交換", parts: 2000, wage: 1000 },
            { name: "燃料フィルター交換", parts: 3000, wage: 3000 }
        ]
    },
    tire: {
        name: "タイヤ関連", items: [
            { name: "タイヤローテーション", wage: 3000 },
            { name: "ホイールバランス調整（4本）", wage: 4000 },
            { name: "パンク修理（1本）", wage: 2500 },
            { name: "ドライブシャフトブーツ交換", parts: 4000, wage: 8000 }
        ]
    },
    other: {
        name: "その他", items: [
            { name: "下廻りスチーム洗浄", wage: 3500 },
            { name: "下廻り防錆塗装", parts: 3000, wage: 5000 },
            { name: "発炎筒交換", parts: 800 },
            { name: "ヘッドライト光軸調整", wage: 3000 },
            { name: "洗車", wage: 2000 }
        ]
    },
    diagnosis: {
        name: "診断・見積", items: [
            { name: "下回り見積り", price: 0 },
            { name: "車検見積(エンジンルーム、下回り、足回り目視点検)", price: 0 },
            { name: "ダイアグノーシスコード診断費用", wage: 3300 },
            { name: "診断機接続費用", wage: 2200 },
            { name: "エンジンチェックランプ確認費用", wage: 2200 }
        ]
    },
    aiming: {
        name: "エーミング・キャリブレーション", items: [
            { name: "フロントカメラエーミング費用", wage: 16500 },
            { name: "フロントミリ波レーダーエーミング費用", wage: 22000 },
            { name: "フロントレーザーレーダーエーミング費用", wage: 16500 },
            { name: "フロントコーナーセンサーエーミング費用", wage: 11000 },
            { name: "リヤコーナーセンサーエーミング費用", wage: 11000 },
            { name: "キャリブレーション(前)", wage: 16500 },
            { name: "キャリブレーション(後)", wage: 16500 },
            { name: "キャリブレーション(右)", wage: 11000 },
            { name: "キャリブレーション(左)", wage: 11000 }
        ]
    }
};

const TAX_RATE = 0.10;
