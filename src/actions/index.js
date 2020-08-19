export const changeFilter = (filter) => ({
  type: "CHANGE_FILTER",
  filter,
});
export const NamesFilters = {
  SHOW_ALL: "SHOW_ALL",
  WITHOUT_TRANSFERS: "WITHOUT_TRANSFERS",
  ONE_TRANSFER: "ONE_TRANSFER",
  TWO_TRANSFER: "TWO_TRANSFER",
  THREE_TRANSFER: "THREE_TRANSFER",
};
