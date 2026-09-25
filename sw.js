// Service Worker
// アプリ本体をキャッシュしておき、2回目以降はサーバーの応答を待たずに開けるようにする。
// Renderの無料プランはスリープから復帰するのに20秒以上かかるため、
// 画面だけでも即座に出ることがスマホでの使い勝手を大きく左右する。

const CACHE_NAME = 'shaken-app-v2';

// アプリの外枠。これだけあれば見積の作成・検索・印刷はオフラインでも動く
const APP_SHELL = [
    './',
    './index.html',
    './login.html',
    './manifest.json',
    './css/style.css',
    './js/data.js',
    './js/api.js',
    './js/cardb.js',
    './js/main.js',
    './js/wareki.js',
    './js/upload_client.js',
    './js/pdf.js',
    './js/backup.js',
    './js/sync.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            // 1つでも取得に失敗すると全体が失敗するため、個別に入れる
            .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // APIは必ず最新を取りに行く。キャッシュすると古い見積が出てしまう
    if (url.pathname.startsWith('/api/')) return;

    // アプリ本体はキャッシュ優先（表示の速さを最優先）。
    // 裏で新しい版を取りに行き、次回の起動から反映させる
    event.respondWith(
        caches.match(req).then(cached => {
            const network = fetch(req)
                .then(res => {
                    if (res && res.status === 200 && res.type === 'basic') {
                        const copy = res.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
                    }
                    return res;
                })
                .catch(() => cached); // オフラインならキャッシュで返す

            return cached || network;
        })
    );
});
