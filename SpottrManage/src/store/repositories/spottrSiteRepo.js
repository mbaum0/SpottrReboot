import repo from "./repo";

const resource = "/spottrsites";
export default {
    fetchAll() {
        console.log('Fetching all spottr sites')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}