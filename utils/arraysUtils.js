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

export const filterArray = (array, property) => {
  return array
    .filter((item) => item.name === property)
    .map((s) => {
      return s.value;
    });
};

export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

export const randomize = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array
}

// export const randomize = (array) => {
//   return [...array].sort(() => 0.5 - Math.random());
// };