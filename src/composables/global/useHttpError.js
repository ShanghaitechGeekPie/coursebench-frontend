const isInvalidRequest = (response) => {
  return response && response.status >= 400 && response.status < 410;
};

const isBackendError = (response) => {
  return response && response.status >= 500 && response.status < 510;
};

const isNetworkError = (response) => {
  return (
    !response ||
    (!isBackendError(response) &&
      !isInvalidRequest(response) &&
      response.status != 200)
  );
};

const isValidErrorMessage = (message) => {
  // Sometimes the backend crashed and all we got is a nginx error page.
  return message && message.indexOf('<html>') != 0; // I am not sure if this is a good way.
};

export {
  isInvalidRequest,
  isBackendError,
  isNetworkError,
  isValidErrorMessage,
};
