export default (data, orderBy = 'name', order = 'desc') => {
  if (!data) return [];

  const orderDesc = order === 'desc' ? -1 : 1;
  const orderAsc = order === 'desc' ? 1 : -1;

  return data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDesc;
    if (a[orderBy] > b[orderBy]) return orderAsc;
    return 0;
  });
};
