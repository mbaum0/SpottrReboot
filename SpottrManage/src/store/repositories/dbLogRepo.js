import repo from "./repo";

const resource = "/dblogs";
export default {
    fetchAll() {
        console.log('Fetching all database logs')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}