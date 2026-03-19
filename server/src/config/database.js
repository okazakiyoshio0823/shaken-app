const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DB_HOST) {
    // Individual env vars mode (avoids URL encoding issues with special chars in password)
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME || 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else if (process.env.DATABASE_URL) {
    // Fallback: parse URL (works when password has no special chars)
    const dbUrl = new URL(process.env.DATABASE_URL);
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: dbUrl.hostname,
        port: parseInt(dbUrl.port, 10) || 5432,
        username: decodeURIComponent(dbUrl.username),
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
