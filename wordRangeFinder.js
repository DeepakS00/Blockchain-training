const binarySearch = (sortedArray, key) => {
  let start = 0;
  let end = sortedArray.length - 1;
  let mid;

  const target = key.toLowerCase();

  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    const middleValue = sortedArray[mid].toLowerCase();

    if (middleValue === target) {
      return mid;
    } else if (middleValue < target) {
      start = mid + 1;
    } else end = mid - 1;
  }
  if (sortedArray[mid].toLowerCase() < target) {
    return mid + 1;
  } else {
    return mid;
  }
};

const wordRangeFinder = (sortedArray, word1, word2) => {
  const index1 = binarySearch(sortedArray, word1);
  const index2 = binarySearch(sortedArray, word2);
  return `${index1}-${index2}`;
};
