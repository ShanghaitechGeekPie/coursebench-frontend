function getElementTop(el) {
    let actualTop = el.offsetTop
    let current = el.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}


export default function useInsitePush(target) {
    setTimeout(() => {
        if (target && document.querySelector(target)) {
            window.scrollTo({
                top: getElementTop(document.querySelector(target)) - 64,
                behavior: "smooth"
            });
        }
    }, 100)
}