const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Renderはプロキシ経由で届くため、これが無いと全員が同じIPに見え、回数制限を全員で分け合ってしまう
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow images to be loaded
}));
app.use(cors());
app.use(express.json({ limit: '10mb' })); // バックアップJSONが既定の100kbを超えるため引き上げ
app.use(express.urlencoded({ extended: true }));

// Serve Uploads securely
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    // PCとスマホを同じ店のWi-Fi（同じIP）で使い、画面を開くたびに同期するので100では足りない
    max: 1000,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// 死活監視（Renderのスリープ防止pingに使う）。認証不要・DB非依存で即座に返す
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/backup', require('./routes/backupRoutes'));
app.use('/api/estimates', require('./routes/estimateRoutes'));

// Start server FIRST so Render always sees an open port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // After server is up, try to connect and sync the DB
    sequelize.sync().then(async () => {
        console.log('✅ Database synced successfully');

        // Auto-seed admin user if not present
        try {
            const bcrypt = require('bcrypt');
            const User = require('./models/User');
            const existing = await User.findOne({ where: { username: 'admin' } });
            if (!existing) {
                const hash = await bcrypt.hash('admin', 10);
                await User.create({
                    username: 'admin',
                    password_hash: hash,
                    email: 'admin@example.com',
                    role: 'admin',
                    is_initial_password: true
                });
                console.log('✅ Admin user created');
            } else {
                console.log('Admin user already exists');
            }
        } catch (seedErr) {
            console.error('Seed error (non-fatal):', seedErr.message);
        }
    }).catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });
});
