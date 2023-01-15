import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';

import './add.css';

export default function AddSkill() {
  const [newSkill, setNewSkill] = useState();

  return (
    <>
      <Container className="addSkill">
        <Form>
          <Form.Group>
            <Form.Label>Add New Skill</Form.Label>
            <Form.Control
              id="addSkill"
              type="text"
              onChange={(e) => setNewSkill(e.target.value)}
              value={newSkill}
            ></Form.Control>
          </Form.Group>
          <div className="btn-center">
            <Button type="submit">Add New Skill</Button>
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
    </>
  );
}
