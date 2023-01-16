import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditAdmin from '../EditAdmin';

export default function AdminTable({ props }) {
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
                <td className="mr-auto">
                  <Button variant="info" className="m-1">
                    View
                  </Button>
                  <Button variant="warning" className="m-1">
                    Update
                  </Button>
                  <Button variant="danger" className="m-1">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
