import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // Convert an array to a lodash wraper for chaning methods
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}