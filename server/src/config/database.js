const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL manually to avoid special-character encoding issues
    const dbUrl = new URL(process.env.DATABASE_URL);
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: dbUrl.hostname,
        port: parseInt(dbUrl.port, 10) || 5432,
        username: dbUrl.username,
        password: decodeURIComponent(dbUrl.password),
        database: dbUrl.pathname.replace(/^\//, ''),
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../database.sqlite'),
        logging: console.log
    });
}

module.exports = sequelize;
