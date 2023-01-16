import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useSubAdminSignUp } from '../../Hooks/useSubAdminSignUp';

export default function AddAdmin() {
  const { admin } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMName] = useState('');
  const [lname, setLname] = useState('');
  const [contact, setCon] = useState('');

  const addAdmin = async () => {
    const response = await fetch(`${url}/api/admin/signup `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        username,
        password,
        fname,
        mname,
        lname,
        contact,
      }),
    });

    if (response.ok) {
      alert('Created');
    }
    if (!response.ok) {
      alert('Fail');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password, fname, mname, lname, contact);

    await addAdmin(username, password, fname, mname, lname, contact);
  };

  return (
    <Container style={{ width: 800, paddingTop: 100 }}>
      <h3>Add Admin</h3>
      <Form id="add-admin" onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-2">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              type="text"
              id="newUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                id="newFname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label> Middle Name (optional)</Form.Label>
              <Form.Control
                type="text"
                id="newMname"
                value={mname}
                onChange={(e) => setMName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Form.Group className="mb-2">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              id="newFname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contact *</Form.Label>
            <Form.Control
              type="text"
              id="newContact"
              value={contact}
              onChange={(e) => setCon(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
        </Row>
        <div className="btn-center">
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </Container>
  );
}
