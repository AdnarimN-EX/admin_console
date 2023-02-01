import React from 'react';
import { Container, Table } from 'react-bootstrap';
import DeleteAdminRole from '../DeleteAdminRole';
import UpdateAdminRole from '../UpdateAdminRole';

export default function AdminRoleTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Role</th>
            <th>Capability</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.adminInfo_id.username}</td>
                <td key={index}>{items.adminInfo_id.lname}</td>
                <td key={index}>{items.adminInfo_id.fname}</td>
                <td key={index}>{items.role_id.roleName}</td>
                <td key={index}>{items.capability_id.capabilityName}</td>

                <UpdateAdminRole props={items} />
                <DeleteAdminRole props={items} />
                <td className="mr-auto"></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
