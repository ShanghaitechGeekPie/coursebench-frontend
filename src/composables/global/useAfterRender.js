/**
 * Sometimes you need to do something after the render is done.
 * Otherwise the DOM will be undefined.
 *
 * @param {Function} callback
 * @param {Boolean} retry
 * @param {Number} timeout
 */

export default (
  callback,
  { retry, timeout } = {
    retry: false,
    timeout: 50,
  },
) => {
  setTimeout(() => {
    callback();
    if (retry) {
      setTimeout(() => {
        callback();
      }, timeout);
    }
  }, timeout);
};
