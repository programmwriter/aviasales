export const sortByPrice = (list) => {
  const tempList = [...list];
  return tempList.sort((first, second) =>
    first.price > second.price ? 1 : -1
  );
};
export const sortByDuration = (list) => {
  const tempList = [...list];
  return tempList.sort((first, second) =>
    first.segments[0].duration > second.segments[0].duration ? 1 : -1
  );
};

export const sortByTransfers = (list) => {
  const tempList = [...list];
  return tempList.sort((first, second) =>
    first.price > second.price ? 1 : -1
  );
};
