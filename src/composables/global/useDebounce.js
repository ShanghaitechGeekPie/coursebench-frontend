export default (callback, delay) => {
    let timeoutID = null
    return function () {
        const args = arguments
        const that = this
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => { callback.apply(that, args) }, delay)
    }
}