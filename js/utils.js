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

export function merge(first, second) {
  let result = {};
  for (let key in second) {
    result[key] = second[key];
  }
  for (let key in first) {
    result[key] = first[key];
  }
  return result;
}
