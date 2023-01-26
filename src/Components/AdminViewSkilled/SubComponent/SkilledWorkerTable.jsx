import React from 'react';
import { Container, Table } from 'react-bootstrap';

export default function SkilledWorkerTable(props) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.username}</td>
                <td key={index}>{items.lname}</td>
                <td key={index}>{items.fname}</td>
                <td className="mr-auto"></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
