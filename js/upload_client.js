// 写真アップロード機能
window.currentUploadedPhotos = []; // グローバル変数として公開

async function uploadSelectedPhoto() {
    const fileInput = document.getElementById('vehiclePhotoUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('写真を選択してください。');
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
        // API_BASE_URL の決定 (file:// プロトコル対応)
        const isLocal = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseUrl = isLocal ? 'http://localhost:5000/api' : '/api';

        const response = await fetch(`${baseUrl}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();

        // 成功したらリストに追加
        window.currentUploadedPhotos.push(data.url);
        renderUploadedPhotos();

        fileInput.value = ''; // クリア
    } catch (error) {
        console.error('Error:', error);
        alert('エラー: アップロードに失敗しました。サーバーが起動しているか確認してください。');
    }
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
        // URLが相対パス(/uploads/...)の場合と絶対パスの場合に対応
        const src = url.startsWith('http') ? url : `http://localhost:5000${url}`;
        img.src = src;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.border = '1px solid #ddd';
        img.style.borderRadius = '4px';
        img.onclick = () => window.open(src, '_blank'); // クリックで拡大
        img.style.cursor = 'zoom-in';

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
