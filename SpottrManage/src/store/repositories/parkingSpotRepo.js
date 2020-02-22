import repo from "./repo";

const resource = "/parkingspots";
export default {
    fetchAll() {
        console.log('Fetching all parking spots')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    create(payload) {
        return repo.post(`${resource}`, payload)
    }
}