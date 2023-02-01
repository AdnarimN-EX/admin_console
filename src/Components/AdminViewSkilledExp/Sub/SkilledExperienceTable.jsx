import React from 'react';
import { Container, Table } from 'react-bootstrap';
import VerifyEXP from '../VerifyEXP';
import ViewOneSkilledExp from '../ViewOneSkilledExp';

export default function SkilledExperienceTable({ props }) {
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
                  <ViewOneSkilledExp props={items} />
                  <VerifyEXP props={items} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
