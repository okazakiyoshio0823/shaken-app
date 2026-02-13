const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'staff'),
        defaultValue: 'staff'
    },
    two_factor_secret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_2fa_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_initial_password: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    last_password_change: {
        type: DataTypes.DATE,
        allowNull: true
    },
    line_user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
});

module.exports = User;
