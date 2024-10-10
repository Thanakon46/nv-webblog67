import Api from '@/services/Api'
export default {
    index() {
        return Api().get('caps')
    },
    show(capId) {
        return Api().get('cap/' + capId)
    },
    post(cap) {
        return Api().post('cap', cap)
    },
    put(cap) {
        return Api().put('cap/' + cap.id, cap)
    },
    delete(cap) {
        return Api().delete('cap/' + cap.id, cap)
    },
}