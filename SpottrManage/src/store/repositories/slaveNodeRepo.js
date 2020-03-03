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
    },
    update(id, payload) {
        return repo.patch(`${resource}/${id}`, payload)
    },
    delete(id) {
        // deletes happen from the parent spottrnode, hence the different resource
        return repo.delete(`spottrnodes/${id}`)
    }
}