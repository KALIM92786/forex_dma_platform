import React from "react";

export default function DataTable({ columns, data }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border bg-gray-100 px-4 py-2 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col} className="border px-4 py-2">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
