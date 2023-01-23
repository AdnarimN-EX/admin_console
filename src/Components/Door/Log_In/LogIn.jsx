import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useAdminLogin } from '../../../Hooks/useAdminLogin';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin, isLoading, errors } = useAdminLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await adminLogin(username, password);
  };

  function LoadingIndicate() {
    if (isLoading === true)
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
  }

  return (
    <Container style={{ width: 400, paddingTop: 200 }}>
      <Form id="log-in-admin" className="log-in-admin" onSubmit={handleSubmit}>
        <div className="col-md-12 text-center">
          <h3>Admin Login</h3>
        </div>
        <Form.Group className="mb-2">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <div className="col-md-12 text-center">
          <Button type="submit">Login</Button>
          <div>
            {isLoading ? LoadingIndicate(isLoading) : LoadingIndicate(false)}
          </div>
          {errors && <div className="error">{errors}</div>}
        </div>
      </Form>
    </Container>
  );
}
