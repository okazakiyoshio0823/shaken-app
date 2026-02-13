const Customer = require('../models/Customer');
const Estimate = require('../models/Estimate');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            order: [['updatedAt', 'DESC']],
            include: [{ model: Estimate, limit: 1, order: [['createdAt', 'DESC']] }] // 最新の見積もりも含める
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single customer
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: [Estimate]
        });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new customer
exports.createCustomer = async (req, res) => {
    try {
        // フロントエンドのデータ構造に合わせて調整
        const data = req.body;

        // 顧客データの作成
        const customer = await Customer.create({
            name: data.userName || data.customerName, // フロントエンドの揺れに対応
            name_kana: data.userNameKana || data.name_kana,
            phone: data.userTel || data.phone,
            address: data.userAddress || data.address,
            email: data.userEmail || data.email,
            // 以下のフィールドはCustomerモデルに足りない可能性があるが、
            // 現状のモデル定義(Customer.js)を見るとカラムが限られている。
            // 拡張が必要だが、一旦JSONとして保存するか、モデルを拡張する必要がある。
            // 今回はモデル拡張せずに、必要なデータは個別に保存し、
            // 車両情報などはEstimate(見積もり)側に寄せる方針か、
            // あるいはCustomerモデルに車両情報をJSONで持たせると楽。
        });

        // 合わせて見積もり(車両情報・整備内容)も保存
        if (data.plateSerial) { // 車両情報がある場合
            await Estimate.create({
                CustomerId: customer.id,
                vehicle_info: {
                    plateRegion: data.plateRegion,
                    plateClass: data.plateClass,
                    plateHiragana: data.plateHiragana,
                    plateSerial: data.plateSerial,
                    carName: data.carName,
                    carModel: data.carModel,
                    chassisNumber: data.chassisNumber,
                    typeDesignationNumber: data.typeDesignationNumber,
                    categoryClassificationNumber: data.categoryClassificationNumber,
                    firstRegistration: data.firstRegistration,
                    mileage: data.mileage,
                    vehicleWeight: data.vehicleWeight,
                    vehicleAge: data.vehicleAge,
                    shakenExpiryDate: data.shakenExpiryDate
                },
                maintenance_items: data.maintenanceItems || [],
                total_amount: 0, // 必要なら計算して入れる
                status: 'saved',
                photo_urls: []
            });
        }

        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        await customer.update({
            name: data.userName || data.name,
            name_kana: data.userNameKana || data.name_kana,
            phone: data.userTel || data.phone,
            address: data.userAddress || data.address,
            email: data.userEmail || data.email
        });

        // 最新の見積もりを探して更新、なければ作成
        // 簡易実装として、常に新しい見積もりレコードを作る運用もありだが、
        // ここでは「最新の状態を保存」というUXなので、最新レコードを更新する。
        const latestEstimate = await Estimate.findOne({
            where: { CustomerId: id },
            order: [['createdAt', 'DESC']]
        });

        const vehicleInfo = {
            plateRegion: data.plateRegion,
            plateClass: data.plateClass,
            plateHiragana: data.plateHiragana,
            plateSerial: data.plateSerial,
            carName: data.carName,
            carModel: data.carModel,
            chassisNumber: data.chassisNumber,
            typeDesignationNumber: data.typeDesignationNumber,
            categoryClassificationNumber: data.categoryClassificationNumber,
            firstRegistration: data.firstRegistration,
            mileage: data.mileage,
            vehicleWeight: data.vehicleWeight,
            vehicleAge: data.vehicleAge,
            shakenExpiryDate: data.shakenExpiryDate
        };

        if (latestEstimate) {
            await latestEstimate.update({
                vehicle_info: vehicleInfo,
                maintenance_items: data.maintenanceItems || [],
                updatedAt: new Date()
            });
        } else {
            await Estimate.create({
                CustomerId: id,
                vehicle_info: vehicleInfo,
                maintenance_items: data.maintenanceItems || [],
                status: 'saved'
            });
        }

        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        await customer.destroy(); // Cascade設定があればEstimateも消えるが、念のため確認推奨
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
