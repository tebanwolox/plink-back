exports.orderArraysAsc = (array, orderBy) =>
  array.sort((prev, next) => (prev[orderBy] > next[orderBy] ? 1 : -1));

exports.orderArrayDesc = (array, orderBy) =>
  array.sort((prev, next) => (prev[orderBy] < next[orderBy] ? 1 : -1));
