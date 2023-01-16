import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

import './add.css';

export default function AddSkill() {
  const { admin } = useAuthContext();
  const [curSkill, setCurSkill] = useState([]);
  const [skill, setSkill] = useState();

  useEffect(() => {
    const dataFetchSkillList = async () => {
      const response = await fetch(`${url}/api/adminSkill/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCurSkill(json);
      }
      if (!response.ok) {
      }
    };
    dataFetchSkillList();
  }, [admin.token, skill]);

  const addSkill = async () => {
    const response = await fetch(`${url}/api/adminSkill/post `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ skill }),
    });

    if (response.ok) {
      alert('Created');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(skill);
    await addSkill(skill);
    setSkill('');
  };

  console.log(curSkill);

  return (
    <>
      <Container className="addSkill">
        <Form id="addSkill" onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Label>Add New Skill</Form.Label>
            <Form.Control
              id="addSkill"
              type="text"
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
            ></Form.Control>
          </Form.Group>
          <div className="btn-center">
            <Button type="submit">Add New Skill</Button>
          </div>
        </Form>
      </Container>
      <Container className="text-center">
        <h3>Current Skills</h3>
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
              {curSkill.map((items, index) => {
                return (
                  <>
                    <td>{items.skill}</td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
