import repo from "./repo";

const resource = "/masternodes";
export default {
    fetchAll() {
        console.log('Fetching all master nodes')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}