export default (callback, delay = 200) => {
    let timeoutID = null
    return function () {
        const args = arguments
        const that = this
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => { callback.apply(that, args) }, delay)
    }
}