const multer = require('multer');
const path = require('path');
const AuditLog = require('../models/AuditLog');

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Safe filename: timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    }
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

        // Log upload action
        // Note: In real app, get user ID from req.user
        await AuditLog.create({
            action: 'UPLOAD_PHOTO',
            details: { filename: req.file.filename, size: req.file.size }
        });

        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ message: 'File uploaded successfully', url: fileUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
