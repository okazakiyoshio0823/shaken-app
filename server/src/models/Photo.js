const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 車両・部品の写真。Renderのディスクは再起動で消えるため、画像そのものをDB（Supabase）に入れる。
// 画面側でアップロード前に縮めるので、1枚あたり数百KB程度
const Photo = sequelize.define('Photo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER
    },
    data: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
});

module.exports = Photo;
