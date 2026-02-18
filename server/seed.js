const bcrypt = require('bcrypt');
const User = require('./src/models/User');
const { sequelize } = require('./src/config/database');

async function seedDatabase() {
    try {
        console.log('Starting database seed...');

        // Sync database
        await sequelize.sync();
        console.log('Database synced');

        // Check if admin user exists
        const existingAdmin = await User.findOne({ where: { username: 'admin' } });

        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin', 10);
        await User.create({
            username: 'admin',
            password_hash: hashedPassword,
            email: 'admin@example.com',
            role: 'admin',
            is_initial_password: true
        });

        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin');
        console.log('⚠️  Please change this password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
