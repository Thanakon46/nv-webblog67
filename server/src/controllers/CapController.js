const db = require('../models'); // นำเข้า model
const Cap = db.Cap; // ใช้ model Cap

// สร้าง cap ใหม่
exports.create = async (req, res) => {
    try {
        const cap = await Cap.create({
            band: req.body.band,
            pictures: req.body.pictures,
            content: req.body.content,
            category: req.body.category,
            status: req.body.status
        });
        res.status(201).send(cap);
    } catch (err) {
        res.status(500).send({
            message: err.message || "เกิดข้อผิดพลาดในการสร้าง cap"
        });
    }
};

// ดึง cap ทั้งหมด
exports.findAll = async (req, res) => {
    try {
        const caps = await Cap.findAll();
        res.status(200).send(caps);
    } catch (err) {
        res.status(500).send({
            message: err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล cap"
        });
    }
};

// ดึง cap โดย id
exports.findOne = async (req, res) => {
    try {
        const cap = await Cap.findByPk(req.params.id);
        if (cap) {
            res.status(200).send(cap);
        } else {
            res.status(404).send({
                message: `ไม่พบ cap ที่มี id = ${req.params.id}`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล cap"
        });
    }
};

// อัปเดต cap
exports.update = async (req, res) => {
    try {
        const [updated] = await Cap.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCap = await Cap.findByPk(req.params.id);
            res.status(200).send(updatedCap);
        } else {
            res.status(404).send({
                message: `ไม่พบ cap ที่มี id = ${req.params.id}`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "เกิดข้อผิดพลาดในการอัปเดต cap"
        });
    }
};

// ลบ cap
exports.delete = async (req, res) => {
    try {
        const deleted = await Cap.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).send({
                message: "ลบ cap สำเร็จ"
            });
        } else {
            res.status(404).send({
                message: `ไม่พบ cap ที่มี id = ${req.params.id}`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "เกิดข้อผิดพลาดในการลบ cap"
        });
    }
};
