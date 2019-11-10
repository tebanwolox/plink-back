exports.orderArrays = (array, orderBy, orderFor) =>
  orderFor === 'asc'
    ? array.sort((prev, next) => (prev[orderBy] > next[orderBy] ? 1 : -1))
    : array.sort((prev, next) => (prev[orderBy] < next[orderBy] ? 1 : -1));
