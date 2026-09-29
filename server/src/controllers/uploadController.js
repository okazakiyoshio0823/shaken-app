const multer = require('multer');
const AuditLog = require('../models/AuditLog');
const Photo = require('../models/Photo');

// ディスクには書かず、受け取った画像はそのままDBへ入れる
const storage = multer.memoryStorage();

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
        return cb(null, true);
    }
    cb(new Error('Only images are allowed (jpeg, png, gif, webp)'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Implementation
exports.uploadMiddleware = upload.single('photo');

exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const photo = await Photo.create({
            mimeType: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer
        });

        await AuditLog.create({
            action: 'UPLOAD_PHOTO',
            user_id: req.user && req.user.id,
            details: { photoId: photo.id, size: req.file.size }
        });

        res.json({ message: 'File uploaded successfully', url: `/api/photos/${photo.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 写真を返す。お客様の車の写真なので、ログインしている人にしか見せない
exports.getPhoto = async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.set('Content-Type', photo.mimeType);
        res.set('Cache-Control', 'private, max-age=86400');
        res.send(photo.data);
    } catch (error) {
        // IDの形がUUIDでないとPostgresがエラーを返すので、見つからない扱いにする
        res.status(404).json({ error: 'Not found' });
    }
};
