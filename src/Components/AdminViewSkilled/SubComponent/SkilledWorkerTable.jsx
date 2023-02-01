import React from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import DeleteAdmin from '../../AdminSetting/DeleteAdmin';
import ViewAllSkilledExp from '../../AdminViewSkilledExp/ViewAllSkilledExp';
import DeleteSkilledWorker from '../DeleteSkilledWorker';
import Verify from '../Verify';
import ViewOneSkilled from '../ViewOneSkilled';

export default function SkilledWorkerTable({ props }) {
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
                  <Container>
                    <Row>
                      <Verify props={items}></Verify>
                      <ViewOneSkilled props={items}></ViewOneSkilled>
                      <DeleteSkilledWorker props={items}></DeleteSkilledWorker>
                    </Row>
                  </Container>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
