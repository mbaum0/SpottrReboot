import repo from "./repo";

const resource = "/parkinglots";
export default {
    fetchAll() {
        console.log('Fetching all parking lots')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    },
    update(id, payload) {
        return repo.patch(`${resource}/${id}`, payload)
    }
}