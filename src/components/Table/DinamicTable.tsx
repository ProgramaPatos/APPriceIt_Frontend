import {Column, useGlobalFilter, useSortBy, useTable, useFilters} from "react-table";
import Products from "./product";
import {useMemo} from "react";
import "./stylesTable.scss"; 

interface Product {
    id: string;
    name: string;
    descrption : string;
  }

export default function DinamicTable() { 

  const columns = useMemo<Column<Product>[]>(
        () => [
          {
            Header: "Id", // Noombre en la tabla
            accessor: "id", // Nombre de la variable
            Cell: ({ value }) => <strong>{value}</strong> // RenderisarH
          },
          {
            Header: "Nombre",
            accessor: "name"
          },
          {
            Header: "Description",
            accessor: "descrption"
          }
        ],
        []
      );

    
    const tableInstance = useTable({ columns, data : Products }, 
                          useGlobalFilter,
                          useSortBy);
    
    const {
     
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state

  
    } = tableInstance;

    return (
      <div className="DinamicTable">
        <h1>
          Tabla de productos
        </h1>
        <table className="table" {...getTableProps()}>
        <thead className="thead">
          {headerGroups.map((headerGroup) => (
            <tr className="trHead" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tbody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="trBody" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
}
