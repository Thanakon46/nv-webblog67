import Api from '@/services/Api';

export default {
    // ดึงข้อมูล cap ทั้งหมด
    getAllCaps() {
        return Api().get('caps');
    },

    // ดึง cap ตาม id
    getCapById(id) {
        return Api().get(`cap/${id}`);
    },

    // สร้าง cap ใหม่
    createCap(data) {
        return Api().post('cap', data);
    },

    // อัปเดต cap
    updateCap(id, data) {
        return Api().put(`cap/${id}`, data);
    },

    // ลบ cap
    deleteCap(id) {
        return Api().delete(`cap/${id}`);
    }
};
