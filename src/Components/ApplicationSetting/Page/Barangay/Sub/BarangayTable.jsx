import React from 'react';
import { Container, Table } from 'react-bootstrap';
import DeleteBrgy from '../DeleteBrgy';
import EditBrgy from '../EditBrgy';

export default function BarangayTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>Barangay</th>
            <th>City</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.barangay}</td>
                <td key={index}>{items.city_id.city}</td>
                <td className="mr-auto">
                  <EditBrgy props={items} />
                  <DeleteBrgy props={items} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
