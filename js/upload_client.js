// 写真アップロード機能
// 写真はサーバーのDB（Supabase）に入れ、見るときもログインが必要（/api/photos/<id>）
window.currentUploadedPhotos = []; // グローバル変数として公開

const PHOTO_MAX_SIDE = 1600;   // 長い辺をこの大きさまで縮める（スマホの写真は4000px以上ある）
const PHOTO_QUALITY = 0.8;

function getPhotoAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// アップロード前にJPEGへ縮める。DBの容量（無料枠500MB）を食いつぶさないため
async function shrinkPhoto(file) {
    let bitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch (e) {
        return file; // 読めない形式はそのまま送り、サーバーの判定に任せる
    }

    const scale = Math.min(1, PHOTO_MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', PHOTO_QUALITY));
    return blob && blob.size < file.size ? blob : file;
}

async function uploadSelectedPhoto() {
    const fileInput = document.getElementById('vehiclePhotoUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('写真を選択してください。');
        return;
    }

    try {
        const photo = await shrinkPhoto(file);
        const formData = new FormData();
        formData.append('photo', photo, photo === file ? file.name : 'photo.jpg');

        // 接続先は api.js の API_BASE_URL に合わせる
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: getPhotoAuthHeaders(),
            body: formData
        });

        if (response.status === 401) {
            alert('ログインの有効期限が切れています。ログインし直してから、もう一度アップロードしてください。');
            return;
        }
        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();

        // 成功したらリストに追加
        window.currentUploadedPhotos.push(data.url);
        renderUploadedPhotos();

        fileInput.value = ''; // クリア
        alert('写真をアップロードしました。\n「💾 このお客様を保存」を押すと、お客様の情報と一緒に残ります。');
    } catch (error) {
        console.error('Error:', error);
        alert('エラー: アップロードに失敗しました。サーバーにつながっているか確認してください。');
    }
}

// 写真のURL（/api/photos/<id>）を、ログイン情報付きで取り出して表示できる形にする
const photoObjectUrls = {};

async function loadPhotoSrc(url) {
    if (url.startsWith('http')) return url;
    if (photoObjectUrls[url]) return photoObjectUrls[url];

    const full = API_BASE_URL.replace(/\/api$/, '') + url;
    const res = await fetch(full, { headers: getPhotoAuthHeaders() });
    if (!res.ok) throw new Error('写真を取得できませんでした: ' + res.status);

    photoObjectUrls[url] = URL.createObjectURL(await res.blob());
    return photoObjectUrls[url];
}

function renderUploadedPhotos() {
    const container = document.getElementById('uploadedPhotosList');
    if (!container) return;

    container.innerHTML = '';

    window.currentUploadedPhotos.forEach((url, index) => {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.className = 'photo-item';

        const img = document.createElement('img');
        img.alt = '読み込み中...';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.border = '1px solid #ddd';
        img.style.borderRadius = '4px';
        img.style.cursor = 'zoom-in';

        loadPhotoSrc(url).then(src => {
            img.src = src;
            img.onclick = () => window.open(src, '_blank'); // クリックで拡大
        }).catch(err => {
            // Renderに置いていた頃の写真（/uploads/...）は、再起動で消えてしまっている
            console.error(err);
            img.alt = '写真が見つかりません';
            img.style.cursor = 'default';
            img.title = '写真が見つかりません（以前の保存場所から消えています）';
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.style.position = 'absolute';
        delBtn.style.top = '-5px';
        delBtn.style.right = '-5px';

        delBtn.style.background = 'red';
        delBtn.style.color = 'white';
        delBtn.style.border = 'none';
        delBtn.style.borderRadius = '50%';
        delBtn.style.cursor = 'pointer';
        delBtn.style.width = '20px';
        delBtn.style.height = '20px';
        delBtn.onclick = () => {
            window.currentUploadedPhotos.splice(index, 1);
            renderUploadedPhotos();
        };

        div.appendChild(img);
        div.appendChild(delBtn);
        container.appendChild(div);
    });
}

// グローバル公開
window.uploadSelectedPhoto = uploadSelectedPhoto;
window.renderUploadedPhotos = renderUploadedPhotos;
