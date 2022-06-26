export default (from, to) => {
    const fromPrototype = Object.getPrototypeOf(from)
    const toPrototype = Object.getPrototypeOf(to)
    if (fromPrototype !== toPrototype) {
        throw new Error(`Cannot copy property '${key}' to object '${to}'`)
    }
    if (from instanceof Array) {
        to.splice(0, to.length, ...from)
    } else {
        const attrs = Object.getOwnPropertyNames(from)
        for (let attr of attrs) {
            if (attr != "__ob__") {
                to[attr] = from[attr]
            }
        }
    }

}