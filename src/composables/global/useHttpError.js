const isInvalidRequest = (response) => {
  return response && /^40\d+$/.test(new String(response.status))
}

const isBackendError = (response) => {
  return response && /^50\d+$/.test(new String(response.status))
}

const isNetworkError = (response) => {
  return (!response) || 
    ((!isBackendError(response))
      && (!isInvalidRequest(response))
      && response.status != 200)
}

export { isInvalidRequest, isBackendError, isNetworkError }
