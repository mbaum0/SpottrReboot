import repo from "./repo";

const resource = "/slavenodes";
export default {
    fetchAll() {
        console.log('Fetching all slave nodes')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}