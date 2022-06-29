/**
 * Set a piece of data to cookie
 * @param {String | Symbol} key 
 * @param {String} value 
 */
const setCookie = (key, value) => {
    const expireAge = 60 * 60 * 24
    document.cookie = `${key}=${value}; max-age=${expireAge}`
}

/**
 * Set cookie from an object
 * @param {Object{String | Symbol: String}} object 
 */
const setCookies = (object) => {
    for (let key in object) setCookie(key, object[key])
}

/**
 * Get a piece of data from cookie
 * @param {String | Symbol} key 
 * @returns String
 */
const getCookie = (key) => {
    const cookies = decodeURIComponent(document.cookie).split("; ")
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=")
        if (name === key) {
            return value
        }
    }
    return ""
}

/**
 * Get cookie from an array
 * @param {Array} keys 
 * @returns Object
 */
const getCookies = (keys) => {
    let cookies = {}
    for (let key of keys) {
        cookies[key] = getCookie(key)
    }
    return cookies
}

/**
 * Set preset data to cookie
 * @param {Number | String} id
 * @param {String} nickname 
 */
const setPreset = ({ id = "", nickname = "" }) => {
    const preset = JSON.stringify({ id, nickname })
    setCookie("preset", btoa(preset, "base64"))
}

/**
 * Get preset data from cookie
 * @returns Object { id, nickname }
 */
const getPreset = () => {
    const preset = getCookie("preset")
    if (preset === "") {
        return { id: "", nickname: "" }
    }
    return JSON.parse(atob(preset, "base64"))
}

/**
 * Clear preset data to cookie
 */
const clearPreset = () => {
    setCookie("preset", "")
}

/**
 * Get if the preset is available
 * @returns Boolean
 */
const hasPreset = () => {
    return getCookie("preset") !== ""
}

export {
    setCookie,
    getCookie,
    setCookies,
    getCookies,
    setPreset,
    getPreset,
    clearPreset,
    hasPreset
}