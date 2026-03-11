// API Base URL setting
// GitHub Pages検出、またはURLパラメータで ?demo=true がある場合
const urlParams = new URLSearchParams(window.location.search);
// デモモードはURLパラメータで明示された場合のみ有効にする（GitHub Pagesでも本番につなぐため）
const isDemoMode = urlParams.get('demo') === 'true';
const isLocal = typeof window !== 'undefined' && (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// デモモード（?demo=true）の場合はダミーAPIを使用
if (isDemoMode) {
    console.log('🚀 Running in Mock API Mode (Demo)');

    // fetchをオーバーライドしてモック化
    const originalFetch = window.fetch;
    window.fetch = async (url, options) => {
        console.log(`[MockAPI] Request: ${url}`, options);

        // 1. ログイン (Login)
        if (url.includes('/auth/login')) {
            const body = JSON.parse(options.body);

            // 初回ログインシミュレーション (admin/admin)
            if (body.username === 'admin' && body.password === 'admin') {
                return new Response(JSON.stringify({
                    requirePasswordChange: true,
                    userId: 'mock-user-id-123',
                    username: 'admin'
                }), { status: 200 });
            }

            // 通常ログインシミュレーション (その他)
            return new Response(JSON.stringify({
                token: 'mock-jwt-token-demo-mode',
                user: { id: 'mock-user', username: body.username }
            }), { status: 200 });
        }

        // 2. 初回パスワード変更 (Initial Password Change)
        if (url.includes('/auth/initial-password-change')) {
            return new Response(JSON.stringify({
                token: 'mock-jwt-token-after-change',
                message: 'Password changed successfully (Demo)'
            }), { status: 200 });
        }

        // 2.5 LINEログイン (LINE Login)
        if (url.includes('/auth/line-login')) {
            console.log('[MockAPI] LINE Login success');
            return new Response(JSON.stringify({
                token: 'mock-jwt-token-line-login',
                user: { id: 'mock-line-user', username: 'LineUser' }
            }), { status: 200 });
        }

        // 3. その他API呼び出し (Customers, etc)
        if (url.includes('/customers')) {
            if (options.method === 'POST' || options.method === 'PUT') {
                return new Response(JSON.stringify({ message: 'Saved (Demo)' }), { status: 200 });
            }
            // 空リストを返す
            return new Response(JSON.stringify([]), { status: 200 });
        }

        // デフォルト: 404
        return new Response(JSON.stringify({ error: 'Endpoint not mocked in demo mode' }), { status: 404 });
    };
}

// 本番APIのURL（Renderデプロイ済みのURL）
const RENDER_BACKEND_URL = 'https://shaken-app-server.onrender.com/api';

let baseUrl = isLocal ? 'http://localhost:5000/api' : '/api';
// GitHub Pagesなどのホスティング環境ではRenderのバックエンドを使用
if (window.location.hostname.includes('github.io') || window.location.hostname.includes('vercel.app')) {
    baseUrl = RENDER_BACKEND_URL;
}

const API_BASE_URL = baseUrl;

const api = {
    // ヘッダー生成（トークン付与）
    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        // ローカルストレージアクセスでエラーが出ないようガード
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            }
        } catch (e) { console.error('LocalStorage access blocked?', e); }
        return headers;
    },

    // 認証エラーハンドリング
    handleAuthError(res) {
        if (res.status === 401) {
            alert('セッションが切れました。ログインし直してください。');
            try { localStorage.removeItem('authToken'); } catch (e) { }
            window.location.href = 'login.html';
            throw new Error('Unauthorized');
        }
    },

    // サーバーが生きているか確認
    async checkHealth() {
        try {
            // 認証ありかどうかに関わらず、サーバーが応答するかだけ確認したい
            // customersエンドポイントは認証が必要かもしれないので、401でもOKとする
            const res = await fetch(API_BASE_URL + '/customers', { method: 'HEAD', headers: this.getHeaders() });
            if (res.status === 401) return true;
            return true;
        } catch (e) {
            return false;
        }
    },

    // 顧客一覧取得
    async getCustomers() {
        const res = await fetch(`${API_BASE_URL}/customers`, {
            headers: this.getHeaders()
        });

        this.handleAuthError(res);

        if (!res.ok) throw new Error('Failed to fetch customers');
        const customers = await res.json();

        // フロントエンドの形式に変換（マッピング）
        return customers.map(c => {
            const est = (c.Estimates && c.Estimates.length > 0) ? c.Estimates[0] : {};
            const v = est.vehicle_info || {};

            return {
                id: c.id,
                savedAt: c.updatedAt,
                userName: c.name,
                userNameKana: c.name_kana,
                userTel: c.phone,
                userAddress: c.address,
                userEmail: c.email,
                ...v,
                maintenanceItems: est.maintenance_items || [],
                _customerId: c.id,
                _estimateId: est.id,
                photoUrls: est.photo_urls || []
            };
        });
    },

    // 顧客・見積もり保存
    async saveCustomer(data) {
        const isServerId = typeof data.id === 'string' && data.id.length > 20;

        const payload = {
            ...data,
            name: data.userName || data.customerName,
            name_kana: data.userNameKana,
            phone: data.userTel,
            address: data.userAddress,
            email: data.userEmail
        };

        const headers = this.getHeaders();
        let res;

        if (isServerId) {
            // Update
            res = await fetch(`${API_BASE_URL}/customers/${data.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(payload)
            });
        } else {
            // Create
            res = await fetch(`${API_BASE_URL}/customers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
        }

        this.handleAuthError(res);

        if (!res.ok) throw new Error('Failed to save data');
        return await res.json();
    },

    // 削除
    async deleteCustomer(id) {
        const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        this.handleAuthError(res);

        if (!res.ok) throw new Error('Failed to delete');
        return true;
    },

    // ログアウト
    logout() {
        if (confirm('ログアウトしますか？')) {
            try {
                localStorage.removeItem('authToken');
                sessionStorage.clear();
            } catch (e) { }
            
            // 現在のURLからディレクトリパスを取得してlogin.htmlへ遷移する（GitHub Pages等のサブディレクトリ運用対応）
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            window.location.replace(basePath + '/login.html?logout=true&t=' + new Date().getTime());
        }
    },

    // パスワード変更
    async changePassword(currentPassword, newPassword) {
        const res = await fetch(`${API_BASE_URL}/auth/password`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ currentPassword, newPassword })
        });

        this.handleAuthError(res);

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Password update failed');
        }
        return await res.json();
    },

    // LINEログイン
    async lineLogin(idToken) {
        const res = await fetch(`${API_BASE_URL}/auth/line-login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ idToken })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'LINE login failed');
        }
        return await res.json();
    },

    // LINEアカウント連携
    async linkLineAccount(idToken) {
        const res = await fetch(`${API_BASE_URL}/auth/line-link`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ idToken })
        });

        this.handleAuthError(res);

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Link LINE failed');
        }
        return await res.json();
    }
};

// 起動時にログインチェック
try {
    const token = localStorage.getItem('authToken');
    // login.html以外にいて、トークンがない、かつローカルファイルまたはLocalhostで実行中
    if (!token && !window.location.href.includes('login.html')) {
        // 即座にリダイレクト
        window.location.href = 'login.html';
    }
} catch (e) {
    console.error('Auto-redirect failed:', e);
}

// グローバルに公開
window.shakenApi = api;
