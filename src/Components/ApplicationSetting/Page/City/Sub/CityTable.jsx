import React from 'react';
import { Container, Table } from 'react-bootstrap';
import DeleteCity from '../DeleteCity';
import EditCity from '../EditCity';

export default function CityTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>City</th>
            <th>Province </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.city}</td>
                <td key={index}>{items.province_id.province}</td>
                <td className="mr-auto">
                  <EditCity props={items} />
                  <DeleteCity props={items}></DeleteCity>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
