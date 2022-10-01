function unicodeToBytes(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = '';
    for (let i = 0; i < charCodes.byteLength; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
}

function bytesToUnicode(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const charCodes = new Uint16Array(bytes.buffer);
    let result = '';
    for (let i = 0; i < charCodes.length; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
}


function setCookie(key, value, expire = 60 * 60 * 24) {
    document.cookie = `${key}=${value}; max-age=${expire}`
}

function setCookies(cookies, expire) {
    for (const key in cookies) {
        setCookie(key, cookies[key], expire)
    }
}

function getCookie(key) {
    const cookies = decodeURIComponent(document.cookie).split("; ")
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=")
        if (cookieKey === key) {
            return cookieValue
        }
    }
    return ""
}

function getCookies(keys) {
    const cookies = {}
    for (const key of keys) {
        cookies[key] = getCookie(key)
    }
    return cookies
}

function setPreset(preset) {
    let dst = getPreset()
    for (let key in preset) {    
        if (typeof preset[key] === "string") {
            dst[key] = unicodeToBytes(preset[key])
        } else {
            dst[key] = preset[key]
        }
    }

    setCookie("preset", btoa(JSON.stringify(dst)), 60 * 60 * 24)
}

function getPreset() {
    const preset = getCookie("preset") ? JSON.parse(atob(getCookie("preset"))) : {}
    const result = {}
    for (let key in preset) {
        if (preset[key] != undefined) {
            if (typeof preset[key] === "string") {
                try {
                    result[key] = bytesToUnicode(preset[key])
                } catch (_) {
                    result[key] = preset[key]
                }
            } else {
                result[key] = preset[key]
            }
        }
    }
    return result
}

function clearPreset() {
    setCookie("preset", "")
}

function hasPreset() {
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