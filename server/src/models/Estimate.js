const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./Customer');

const Estimate = sequelize.define('Estimate', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // Store all vehicle info as JSON to be flexible
    vehicle_info: {
        type: DataTypes.JSON,
        allowNull: false
    },
    // Store maintenance items as JSON
    maintenance_items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('draft', 'saved', 'billed'),
        defaultValue: 'draft'
    },
    photo_urls: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

Estimate.belongsTo(Customer);
Customer.hasMany(Estimate);

module.exports = Estimate;
