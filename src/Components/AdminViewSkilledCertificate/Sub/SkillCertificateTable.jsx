import React from 'react';
import { Container, Table } from 'react-bootstrap';
import VerifyCert from '../VerifyCert';
import ViewOneSkilledCertificate from '../ViewOneSkilledCertificate';

export default function SkillCertificateTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Skill</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.skilled_id.fname}</td>
                <td key={index}>{items.categorySkill}</td>
                <td className="mr-auto">
                  <ViewOneSkilledCertificate props={items} />
                  <VerifyCert props={items} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
