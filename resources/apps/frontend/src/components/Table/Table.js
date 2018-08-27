import React from 'react';

import StyleSheet from './Table.scss';

export const TableFilters = ({children}) => {
  return <div className={StyleSheet.tableActions}>{children}</div>;
};

export const Table = ({headers, children}) => {
  return (
    <table className="table table-hover table-bordered bg-white">
      <thead className="thead-light">
        <tr>
          {headers.map(h => {
            return (
              <th scope="col" key={h}>
                {h}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
