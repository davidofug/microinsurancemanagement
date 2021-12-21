
import React from 'react';
import { Table } from 'react-bootstrap'

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <Table bordered hover striped responsive style={{"border": "1px solid #000"}} cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          {data[0] && columns.map((heading) => <th>{heading}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}