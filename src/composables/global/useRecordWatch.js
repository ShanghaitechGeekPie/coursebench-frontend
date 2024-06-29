import { watch } from 'vue';

export default (src, callback, options = {}) => {
  let oldValue = Object.assign({}, src);
  watch(
    src,
    function () {
      callback.apply(this, [oldValue, ...arguments]);
      oldValue = Object.assign({}, src);
    },
    options,
  );
};
