import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import DeleteSkill from '../Skills/DeleteSkill';
import EditSkill from '../Skills/EditSkill';
import DeleteProvince from './DeleteProvince';
import EditProvince from './EditProvince';

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
        <Container className="text-center">
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
              <Button type="submit">Add New Skill</Button>
            </div>
          </Form>
        </Container>
      </Container>
      <Container className="text-center">
        <h2>All Provinces</h2>
        <Row>
          {curPro.map((items) => (
            <Col sm={6} md={6} lg={6} className="mb-3">
              <Card className="text-center">
                <Card.Title>{items.province}</Card.Title>
                <Card.Body>
                  <div className="mr-auto">
                    <EditProvince props={items}></EditProvince>
                    <DeleteProvince props={items}></DeleteProvince>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
