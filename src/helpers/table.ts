export const columnTemplate = [
  {
    Header: 'POSITION',
    accessor: 'logo',
  },
  {
    Header: 'LOGO',
    accessor: 'name',
  },
  {
    Header: 'NAME',
    accessor: 'numOfPoints',
  },
  {
    Header: 'POINTS',
  },
];

export const sortedData = (data: any) => {
  return data.sort((a: any, b: any) =>
    a.numOfPoints > b.numOfPoints ? -1 : 1
  );
};
