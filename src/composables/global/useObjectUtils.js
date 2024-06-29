/**
 * It returns a new object that contains only the key/value pairs from the source object that pass the
 * filter function.
 *
 * The filter function takes two arguments:
 *
 * src: The source object.
 * filterFn: A function that takes two arguments: key and value. It returns true if the key/value pair
 * should be included in the result object, and false otherwise.
 * The filter function returns a new object that contains only the key/value pairs from the source
 * object that pass the filter function
 * @param src - The object to filter
 * @param filterFn - A function that takes two parameters: key and value.
 * @returns An object with the key/value pairs that pass the filter function.
 */
export function filter(src, filterFn) {
  const result = {};
  for (const [key, value] of Object.entries(src)) {
    if (filterFn(key, value)) {
      result[key] = value;
    }
  }
  return result;
}
