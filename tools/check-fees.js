// 法定費用の計算（js/fees.js）が国の公式資料の値と合っているかを確かめる。
// 料金表を更新したら必ず実行する: node tools/check-fees.js
// 改定後の新しい金額を足したときは、ここにも確認を足す
const fs = require('fs');
const vm = require('vm');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(require('path').join(__dirname, '../js/fees.js'), 'utf8') + ';this.LEGAL_FEES=LEGAL_FEES;', ctx);
const { calculateJibaiseki: J, calculateInspectionFee: I, calculateVehicleAgeClass: A, calculateWeightTax: W } = ctx;

const cases = [
    // 自賠責（損保料率機構の基準料率表）
    ['自賠責 乗用24 10/31', J('passenger', 24, '2026-10-31'), 17650],
    ['自賠責 乗用24 11/1', J('passenger', 24, '2026-11-01'), 18560],
    ['自賠責 乗用25 11/1', J('passenger', 25, '2026-11-01'), 19070],
    ['自賠責 乗用12 10/31', J('passenger', 12, '2026-10-31'), 11500],
    ['自賠責 乗用37 11/1', J('passenger', 37, '2026-11-01'), 25180],
    ['自賠責 軽24 11/1', J('kei', 24, '2026-11-01'), 18660],
    ['自賠責 軽事業24 11/1', J('keiBusiness', 24, '2026-11-01'), 18660],
    ['自賠責 小型貨物自家12 11/1', J('smallCargo', 12, '2026-11-01'), 13710],
    ['自賠責 小型貨物事業13 10/31', J('smallCargoBusiness', 13, '2026-10-31'), 16700],
    ['自賠責 普通貨物自家 積載1.5t 12', J('cargo', 12, '2026-11-01', 1500), 17930],
    ['自賠責 普通貨物自家 積載3t 12', J('cargo', 12, '2026-11-01', 3000), 19130],
    ['自賠責 普通貨物事業 積載3t 12 旧', J('cargoBusiness', 12, '2026-10-31', 3000), 24100],
    ['自賠責 特種 24 11/1', J('special', 24, '2026-11-01'), 21550],
    ['自賠責 二輪 24 10/31', J('motorcycle', 24, '2026-10-31'), 8760],
    ['自賠責 貨物36（表に無い）', J('smallCargo', 36, '2026-11-01'), null],
    // 検査手数料（国交省 令和8年4月1日）
    ['印紙 乗用 指定OSS', I('passenger', '500', 'designated', true, '2026-04-01'), 1850],
    ['印紙 乗用 指定窓口', I('passenger', '300', 'designated', false, '2026-04-01'), 2100],
    ['印紙 乗用 持込 3ナンバー', I('passenger', '300', 'certified', false, '2026-04-01'), 2600],
    ['印紙 乗用 持込 5ナンバー', I('passenger', '500', 'certified', false, '2026-04-01'), 2500],
    ['印紙 軽 持込', I('kei', '580', 'certified', false, '2026-04-01'), 2500],
    ['印紙 小型貨物 持込', I('smallCargo', '400', 'certified', false, '2026-04-01'), 2500],
    ['印紙 普通貨物 持込', I('cargo', '100', 'certified', false, '2026-04-01'), 2600],
    ['印紙 二輪 OSS', I('motorcycle', '', 'designated', true, '2026-04-01'), 1500],
    ['印紙 乗用 OSS 改定前', I('passenger', '300', 'designated', true, '2026-03-31'), 1600],
    // 経過年数（国交省の例：2012年6月初度登録 → 2025年4月1日から13年経過、軽2012年 → 2025年11月1日から）
    ['経過 登録車 2012-06 → 2025-03', A('2012-06-15', '2025-03-31'), 'normal'],
    ['経過 登録車 2012-06 → 2025-04', A('2012-06-15', '2025-04-01'), 'over13'],
    ['経過 登録車 2007-06 → 2025-04', A('2007-06-01', '2025-04-01'), 'over18'],
    ['経過 軽 2012 → 2025-10', A('2012-06-01', '2025-10-31', 'kei'), 'normal'],
    ['経過 軽 2012 → 2025-11', A('2012-06-01', '2025-11-01', 'kei'), 'over13'],
    ['経過 軽 2012 → 2026-03', A('2012-12-01', '2026-03-01', 'kei'), 'over13'],
    // 重量税（国交省 2026年5月1日からの税額表・継続検査）
    ['重量税 乗用1.5t 2年', W({ categoryKey: 'passenger', years: 2, vehicleWeightKg: 1500, ageClass: 'normal', eco: 'none' }), 24600],
    ['重量税 乗用1.5t 2年 13年', W({ categoryKey: 'passenger', years: 2, vehicleWeightKg: 1500, ageClass: 'over13', eco: 'none' }), 34200],
    ['重量税 乗用1.5t 2年 エコ', W({ categoryKey: 'passenger', years: 2, vehicleWeightKg: 1500, ageClass: 'over13', eco: 'eco' }), 15000],
    ['重量税 乗用1.5t 1年', W({ categoryKey: 'passenger', years: 1, vehicleWeightKg: 1500, ageClass: 'normal', eco: '' }), 12300],
    ['重量税 乗用 免税', W({ categoryKey: 'passenger', years: 2, vehicleWeightKg: 1500, ageClass: 'normal', eco: 'exempt' }), 0],
    ['重量税 軽 2年 18年', W({ categoryKey: 'kei', years: 2, ageClass: 'over18', eco: 'none' }), 8800],
    ['重量税 軽事業 2年', W({ categoryKey: 'keiBusiness', years: 2, ageClass: 'normal', eco: '' }), 5200],
    ['重量税 小型貨物自家 総2.45t 1年', W({ categoryKey: 'smallCargo', years: 1, grossWeightKg: 2450, ageClass: 'normal', eco: '' }), 9900],
    ['重量税 小型貨物自家 総2.45t 1年 13年', W({ categoryKey: 'smallCargo', years: 1, grossWeightKg: 2450, ageClass: 'over13', eco: '' }), 12300],
    ['重量税 普通貨物自家 総3.5t 1年', W({ categoryKey: 'cargo', years: 1, grossWeightKg: 3500, ageClass: 'normal', eco: '' }), 16400],
    ['重量税 普通貨物事業 総7.9t 1年', W({ categoryKey: 'cargoBusiness', years: 1, grossWeightKg: 7900, ageClass: 'over18', eco: '' }), 22400],
    ['重量税 普通貨物自家 総10.5t 1年', W({ categoryKey: 'cargo', years: 1, grossWeightKg: 10500, ageClass: 'normal', eco: '' }), 45100],
    ['重量税 特種 総3.2t 2年', W({ categoryKey: 'special', years: 2, grossWeightKg: 3200, ageClass: 'normal', eco: '' }), 32800],
    ['重量税 二輪 2年 13年', W({ categoryKey: 'motorcycle', years: 2, ageClass: 'over13', eco: 'eco' }), 4600],
    ['重量税 軽の1年（表に無い）', W({ categoryKey: 'kei', years: 1, ageClass: 'normal', eco: '' }), null]
];

let ng = 0;
cases.forEach(([label, got, want]) => {
    const ok = got === want;
    if (!ok) ng++;
    console.log(ok ? 'OK' : 'NG', label.padEnd(34), got, ok ? '' : `(期待 ${want})`);
});
console.log(ng ? `${ng}件 NG` : `全${cases.length}件 OK`);
