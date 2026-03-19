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

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow images to be loaded
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads securely
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/customers', require('./routes/customerRoutes'));

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
