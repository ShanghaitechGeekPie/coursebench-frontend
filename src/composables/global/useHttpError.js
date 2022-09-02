const isInvalidRequest = (response) => {
  return response && (response.status >= 400 && response.status < 410)
}

const isBackendError = (response) => {
  return response && (response.status >= 500 && response.status < 510)
}

const isNetworkError = (response) => {
  return (!response) || 
    ((!isBackendError(response))
      && (!isInvalidRequest(response))
      && response.status != 200)
}

export { isInvalidRequest, isBackendError, isNetworkError }
