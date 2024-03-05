module.exports = (arr, targetId) => {
    let i = 0
    for (let id of arr) {
        if (id.equals(targetId)) {
            return i
        }
        i++
    }
    return -1
}