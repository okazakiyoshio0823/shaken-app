// ============================================
// 社員アカウント（管理者だけ）
// 社員のアカウントを作る／パスワードを忘れた社員に仮パスワードを再発行する。
// 仮パスワードでログインすると、本人が自分のユーザー名とパスワードを決める画面になる
// ============================================

// ログイン情報（JWT）の中身から、管理者かどうかを見る。画面の出し分けだけに使い、
// 実際の権限はサーバー（authRoutes.js の requireAdmin）が確かめる
function currentUserRole() {
    try {
        const token = localStorage.getItem('authToken');
        const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(payload)).role || '';
    } catch (e) {
        return '';
    }
}

// 読み間違えやすい文字（0とO、1とlとI）を除いた10文字
function makeTemporaryPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    const bytes = crypto.getRandomValues(new Uint8Array(10));
    return Array.from(bytes, b => chars[b % chars.length]).join('');
}

function accountHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
    };
}

async function loadAccountList() {
    const list = document.getElementById('accountList');
    list.innerHTML = '<div style="color:#999;padding:10px;">読み込み中...</div>';
    try {
        const res = await fetch(`${API_BASE_URL}/auth/users`, { headers: accountHeaders() });
        if (!res.ok) throw new Error(res.status);
        const users = await res.json();
        list.innerHTML = users.map(u => `
            <div style="display:flex;justify-content:space-between;gap:8px;padding:8px 10px;border-bottom:1px solid #eee;">
                <span style="font-weight:600;word-break:break-all;">${escapeHtml(u.username)}</span>
                <span style="font-size:0.85em;color:#666;white-space:nowrap;">
                    ${u.role === 'admin' ? '管理者' : '社員'}・${u.is_initial_password ? '<span style="color:#e65100;">仮パスワードのまま</span>' : '使用中'}
                </span>
            </div>`).join('');
    } catch (e) {
        list.innerHTML = '<div style="color:#c00;padding:10px;">一覧を読み込めませんでした。ログインし直してください。</div>';
    }
}

async function createAccount() {
    const input = document.getElementById('newAccountName');
    const username = input.value.trim();
    const result = document.getElementById('accountResult');
    if (!username) {
        alert('ユーザー名を入れてください（例: tanaka）');
        return;
    }

    const password = makeTemporaryPassword();
    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: accountHeaders(),
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || res.status);

        result.style.display = 'block';
        result.innerHTML = `
            <div style="font-weight:600;margin-bottom:6px;">${data.reissued ? '仮パスワードを再発行しました' : 'アカウントを作りました'}</div>
            <div>ユーザー名: <b>${escapeHtml(username)}</b></div>
            <div>仮パスワード: <b style="font-family:monospace;font-size:1.2em;letter-spacing:1px;">${password}</b></div>
            <div style="font-size:0.85em;color:#666;margin-top:6px;">
                この2つを本人に伝えてください。この画面を閉じると仮パスワードは二度と表示されません。<br>
                本人が最初にログインすると、自分のユーザー名とパスワードを決める画面になります。
            </div>`;
        input.value = '';
        loadAccountList();
    } catch (e) {
        alert('作れませんでした: ' + e.message);
    }
}

function showAccountModal() {
    document.getElementById('accountResult').style.display = 'none';
    document.getElementById('accountModal').classList.add('active');
    loadAccountList();
}

function closeAccountModal() {
    // 仮パスワードを画面に残さない
    document.getElementById('accountResult').innerHTML = '';
    document.getElementById('accountModal').classList.remove('active');
}

window.addEventListener('load', () => {
    const btn = document.getElementById('accountBtn');
    if (btn && currentUserRole() === 'admin') btn.style.display = '';
});
