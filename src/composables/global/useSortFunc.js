function sortByValue(lhs, rhs) {
    if (lhs < rhs) {
      return 1;
    } else if (lhs == rhs) {
      return 0;
    } else {
      return -1;
    }
  }

export {
    sortByValue
}