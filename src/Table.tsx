import React, { useMemo,useState } from "react";
import { useTable,useGlobalFilter  } from "react-table";
import { IUser } from "./Types";
import './App.css'
type Props = {
  data: IUser[];
};
const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Street",
    accessor: "address.street",
  },
]; //if its static use this one, if its variable-> UseMemo
function Table(props: Props) {
  //catching the data. Purpose is to only have 1 instance.
  const data = useMemo(() => props.data, [props.data]);
  const [searchValue, setSearchValue] = useState('');
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data }, useGlobalFilter);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    setGlobalFilter(value); // Update the search value in the table state
  };
  const {
    // ...
    state: { globalFilter }, // Access the globalFilter from state
  } = useTable({ columns, data }, useGlobalFilter);
  return (
    <div className="table-container">
         <div className="search-container">
        <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search here" className="search-input" />
        </div>
    <table style={{marginTop:0,border:0}} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
export default Table;
