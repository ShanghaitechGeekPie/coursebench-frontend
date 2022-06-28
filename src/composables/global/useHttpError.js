function isInvalidRequest(response) {
    return /^40\d+$/.test(new String(response.status))
}

function isBackendError(response) {
    return /^50\d+$/.test(new String(response.status))
}

function isNetworkError(response) {
    return (!isBackendError(response)) 
        && (!isInvalidRequest(response))
        && response.status != 200
}

export {
    isInvalidRequest, 
    isBackendError, 
    isNetworkError
}