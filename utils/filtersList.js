function sortByProperty(property, order = true) {
    return function (a, b) {
        if (order) {
      if (a[property] > b[property]) return -1;
      else if (a[property] < b[property]) return 1;
      return 0;
    } else {
        if (a[property] > b[property]) return 1;
        else if (a[property] < b[property]) return -1;
        return 0;
      }
    };
  }

export const showOnlyTop = (limit = 50, bookList, property, order = true) => {
  let result = bookList.sort(sortByProperty(property, order));
  const limitedResult = [];
  for (let i = 0; i < limit && i < bookList.length; i++) {
    limitedResult.push(result[i]);
  }
  return limitedResult;
};
