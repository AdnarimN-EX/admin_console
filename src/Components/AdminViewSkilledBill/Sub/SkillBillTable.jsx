import React from 'react';
import { Container, Table } from 'react-bootstrap';
import VerifyBill from '../VerifyBill';
import ViewOneSkillBill from '../ViewOneSkillBill';

export default function SkillBillTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.skilled_id.fname}</td>
                <td key={index}>{items.skilled_id.lname}</td>
                <td className="mr-auto">
                  <ViewOneSkillBill props={items} />
                  <VerifyBill props={items} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
