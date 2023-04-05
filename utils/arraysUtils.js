export const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  const neww = (object) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  array1 = new Set(array1.map(neww));
  return array2.every((object) => array1.has(neww(object)));
};

export const flattenArray = (array) => {
  const flat = [];

  array.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flattenArray(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}