/**
 * Set a piece of data to cookie
 * @param {String | Symbol} key 
 * @param {String} value 
 */
function setCookie(key, value) {
    document.cookie = `${key}=${value}; max-age=${60 * 60 * 24}`;
}

/**
 * Set cookie from an object
 * @param {Object, with String values} object 
 */
function setCookies(obj) {
    const keys = Object.getOwnPropertyNames(obj).filter(key => key !== '__ob__');
    for (let key of keys) {
        setCookie(key, obj[key])
    }
}

/**
 * Get a piece of data from cookie
 * @param {String} key 
 * @returns String
 */
function getCookie(key) {
    key = key + "="
    let cookies = decodeURIComponent(document.cookie).split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(key) == 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return ""
}

/**
 * Get cookie from an array
 * @param {Array} keys 
 * @returns Object
 */
function getCookies(keys) {
    let res = {}
    for (let key of keys) {
        res[key] = getCookie(key)
    }
    return res
}

export {
    setCookie, 
    setCookies, 
    getCookie,
    getCookies
}