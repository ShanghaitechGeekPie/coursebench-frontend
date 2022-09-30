/**
 * Core function for array sort, it returns 1 if the first argument is less than the second, 0 if they're equal, and -1 if the first
 * argument is greater than the second
 * @param {any} lhs - The left-hand side of the comparison.
 * @param {any} rhs - The right hand side of the comparison.
 * @returns number - the result of the comparison of the two arguments.
 */
export function sortCmp(lhs, rhs) {
  if (lhs < rhs) {
    return 1;
  } else if (lhs == rhs) {
    return 0;
  } else {
    return -1;
  }
}

/**
 * It takes an array and returns the sum of all the items in the array
 * @param {Array} arr - The array to be reduced
 * @returns any - The sum of the array.
 */
export function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

/**
 * Given an array, return the average of those items.
 * @param {Array<any>} arr - An array
 * @returns any - The average of the numbers in the array.
 */
export function averageOf(arr) {
  return sumOf(arr) / arr.length
}


/**
 * It takes an array of numbers and returns an array of numbers that are the same proportions of the
 * original array
 * @param {Array<number>} arr - an array of numbers
 * @returns Array<number> - An array of the same length as the input array, with each element divided by the sum of the
 * input array.
 */
 export function toDistribute(arr) {
  let sum = sumOf(arr)
  if (sum === 0) return arr
  return arr.map((x) =>{
    return x / sum
  })
}

/**
 * It returns true if the two arrays are the same length and all of the elements in the first array are
 * equal to the elements in the second array
 * @param {Array<any>} a - The first array to compare
 * @param {Array<any>} b - The array to compare against
 * @returns boolean - true or false
 */
export function compare(a, b) {
  if (a.length !== b.length) {
    return false
  }
  return !a.map((value, index, array) => {
    return value === b[index]
  }).some(x => x === false)
}