export function get(object, path) {
  const arr = path.split('.');
  for (let i = 0; i < arr.length; i++) {
    if (object && object[arr[i]]) {
      object = object[arr[i]];
    } else {
      return null;
    }
  }
  return object;
}