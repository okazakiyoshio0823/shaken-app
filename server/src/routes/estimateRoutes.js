const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const SyncedEstimate = require('../models/SyncedEstimate');

const MAX_ESTIMATES = 500; // 同期1回あたりの上限（画面側は100件保持）

router.use(checkAuth);

// 双方向同期
// 画面側の全見積を受け取り、サーバー側と突き合わせて新しい方を残し、
// マージ後の一覧を返す。端末が2台程度・1日10件規模を想定した素朴な方式。
router.post('/sync', async (req, res) => {
    try {
        const incoming = Array.isArray(req.body.estimates) ? req.body.estimates : [];
        const deletedIds = Array.isArray(req.body.deletedIds) ? req.body.deletedIds : [];

        if (incoming.length > MAX_ESTIMATES) {
            return res.status(400).json({ message: '見積の件数が多すぎます' });
        }

        // 1. 受け取った見積を取り込む（savedAtが新しい方を採用）
        for (const item of incoming) {
            if (!item || item.id === undefined || item.id === null) continue;

            const id = String(item.id);
            const savedAt = item.savedAt ? new Date(item.savedAt) : new Date();
            if (isNaN(savedAt.getTime())) continue;

            const existing = await SyncedEstimate.findByPk(id);

            // サーバー側の方が新しければ何もしない
            if (existing && new Date(existing.savedAt) >= savedAt) continue;

            const values = {
                id,
                customerName: item.customerName || '',
                plateNumber: item.plateNumber || '',
                carName: item.carName || '',
                grandTotal: item.grandTotal || '',
                documentType: item.documentType || 'estimate',
                savedAt,
                data: item.data || {},
                deleted: false
            };

            if (existing) {
                await existing.update(values);
            } else {
                await SyncedEstimate.create(values);
            }
        }

        // 2. 削除された見積に印を付ける
        for (const rawId of deletedIds) {
            const id = String(rawId);
            const existing = await SyncedEstimate.findByPk(id);
            if (existing && !existing.deleted) {
                await existing.update({ deleted: true });
            }
        }

        // 3. マージ後の一覧を返す（新しい順）
        const all = await SyncedEstimate.findAll({ order: [['savedAt', 'DESC']] });

        const estimates = all
            .filter(e => !e.deleted)
            .map(e => ({
                id: e.id,
                customerName: e.customerName,
                plateNumber: e.plateNumber,
                carName: e.carName,
                grandTotal: e.grandTotal,
                documentType: e.documentType,
                savedAt: e.savedAt,
                data: e.data
            }));

        res.json({
            estimates,
            deletedIds: all.filter(e => e.deleted).map(e => e.id),
            syncedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('同期エラー:', error);
        res.status(500).json({ message: '同期に失敗しました' });
    }
});

module.exports = router;
