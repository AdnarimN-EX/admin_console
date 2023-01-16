import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Form, Table } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

import './add.css';

export default function AddProvince() {
  const { admin } = useAuthContext();
  const [curPro, setCurProv] = useState([]);
  const [province, setProvince] = useState();

  useEffect(() => {
    const dataFetchSkillList = async () => {
      const response = await fetch(`${url}/api/province/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCurProv(json);
      }
      if (!response.ok) {
      }
    };
    dataFetchSkillList();
  }, [admin.token, province]);

  const addProvince = async () => {
    const response = await fetch(`${url}/api/province/post `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ province }),
    });

    if (response.ok) {
      alert('Created');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(province);
    await addProvince(province);
    setProvince('');
  };

  return (
    <>
      <Container className="addprov">
        <Form id="add-Province" onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Label>Add New Province</Form.Label>
            <Form.Control
              id="addProv"
              type="text"
              onChange={(e) => setProvince(e.target.value)}
              value={province}
            ></Form.Control>
          </Form.Group>
          <div className="btn-center">
            <Button type="submit">Add New </Button>
          </div>
        </Form>
      </Container>
      <Container className="CRUD">
        <div className="text-center">
          <ButtonGroup>
            <Button variant="secondary">View</Button>
            <Button variant="secondary">Update</Button>
            <Button variant="secondary">Delete</Button>
          </ButtonGroup>
        </div>
      </Container>
      <Container className="text-center">
        <h3>Current Skills</h3>
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
              {curPro.map((items, index) => {
                return (
                  <>
                    <td>{items.province}</td>
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
