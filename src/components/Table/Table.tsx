import React from 'react';
import { useTable } from 'react-table';

type Props = {
  columns: any;
  data: any;
  defaultColumn?: any;
};

export const Table: React.FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table className="text-white" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className="border-b border-white last:border-b-0"
              {...row.getRowProps()}
            >
              <td className="text-xs font-bold">{i + 1}</td>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {typeof cell.value === 'string' &&
                    cell.value.includes('http') ? (
                      <img
                        className="h-[50px] w-[50px] m-2 object-contain"
                        src={cell.value}
                        alt="logo"
                      />
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
