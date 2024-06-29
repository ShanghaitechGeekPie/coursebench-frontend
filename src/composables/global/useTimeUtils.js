function unixToReadable(unix) {
  return new Date(unix * 1000).toISOString().slice(0, 10);
}

export { unixToReadable };
