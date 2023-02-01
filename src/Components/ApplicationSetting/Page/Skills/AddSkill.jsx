import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import DeleteSkill from './DeleteSkill';
import EditSkill from './EditSkill';

export default function AddSkill() {
  const { admin } = useAuthContext();
  const [skill, setSkill] = useState();
  const [skillName, setSkillName] = useState([]);

  const [error, setError] = useState('');

  //to get all cities
  useEffect(() => {
    const dataFetchSkills = async () => {
      const response = await fetch(`${url}/api/adminSkill/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setSkillName(json);
      }
      if (!response.ok) {
        setError(json.messg);
      }
    };
    dataFetchSkills();
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
    const json = await response.json();

    if (response.ok) {
      alert('Created');
      setSkill('');
    }
    if (!response.ok) {
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(skill);
    await addSkill(skill);
  };

  console.log(error);

  return (
    <>
      <Container className="addSkill">
        <Container className="text-center">
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
      </Container>
      <Container className="text-center">
        <h2>Skill Options</h2>
        {<h2 className="danger">{error}</h2>}

        <Row>
          {skillName.map((items) => (
            <Col sm={6} md={6} lg={6} className="mb-3">
              <Card className="text-center">
                <Card.Title>{items.skill}</Card.Title>
                <Card.Body>
                  <div className="mr-auto">
                    <EditSkill props={items}></EditSkill>
                    <DeleteSkill props={items}></DeleteSkill>
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
