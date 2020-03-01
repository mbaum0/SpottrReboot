import repo from "./repo"

const resource = "/spottrsyncs"
export default {
    fetchAll() {
        console.log('Fetching all spottr syncs')
        return repo.get(`${resource}`)
    },
    fetchOne(id) {
        return repo.get(`${resource}/${id}`)
    },
    update(id, payload) {
        return repo.patch(`${resource}/${id}`, payload)
    },
    delete(id) {
        return repo.delete(`${resource}/${id}`)
    }
}