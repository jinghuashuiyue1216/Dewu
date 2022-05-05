function isObjectEmpty(obj) {
  console.log();
  if (obj && Object.keys(obj).length > 0) return false;
  return true;
}

export { isObjectEmpty };
