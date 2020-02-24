import repo from "./repo";

const resource = "/preferences";
export default {
    fetchAll() {
        console.log('Fetching all preferences')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}