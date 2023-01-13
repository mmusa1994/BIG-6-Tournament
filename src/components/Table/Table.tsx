import React from 'react';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { useTable } from 'react-table';
import { ITable } from '../../types/types';

const Table: React.FC<ITable> = ({ columns, data, allMatchPlayed }) => {
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
              className={`border-b border-white last:border-b-0
                  ${allMatchPlayed && ' first:bg-yellow-700'}`}
              {...row.getRowProps()}
            >
              <td className="text-xs font-bold">
                {allMatchPlayed && i === 0 ? (
                  <span className="flex h-full justify-center">
                    <TrophyIcon className="w-5 h-5" />
                  </span>
                ) : (
                  i + 1
                )}
              </td>
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

export default Table;
