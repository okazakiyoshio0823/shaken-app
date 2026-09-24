const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// PCとスマホで見積を共有するための同期用テーブル。
// 画面側（localStorage）の見積オブジェクトをそのまま保持できる形にしてある。
const SyncedEstimate = sequelize.define('SyncedEstimate', {
    // 画面側は Date.now() の数値をIDに使うため、文字列として受ける
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    customerName: {
        type: DataTypes.STRING
    },
    plateNumber: {
        type: DataTypes.STRING
    },
    carName: {
        type: DataTypes.STRING
    },
    grandTotal: {
        type: DataTypes.STRING
    },
    documentType: {
        type: DataTypes.STRING,
        defaultValue: 'estimate'
    },
    // 画面側が保存した日時。どちらが新しいかの判定に使う
    savedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // 見積の中身すべて
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    // 削除は行を消さず印を付ける。消したことを他の端末へ伝えるため
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = SyncedEstimate;
