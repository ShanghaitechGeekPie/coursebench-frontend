function sortCmp(lhs, rhs) {
  if (lhs < rhs) {
    return 1;
  } else if (lhs == rhs) {
    return 0;
  } else {
    return -1;
  }
}

function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

function averageOf(arr) {
  return sumOf(arr) / arr.length
}


export {
  sortCmp, 
  sumOf, 
  averageOf
}