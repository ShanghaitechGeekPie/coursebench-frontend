export default (actionFunc, { 
  retry, 
  timeout 
} = {
  retry: false,
  timeout: 50
}) => {
  setTimeout(() => {
    actionFunc()
    if (retry) {
      setTimeout(() => {
        actionFunc()
      }, timeout)
    }
  }, timeout)
}