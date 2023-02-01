import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import ViewAllRoleNames from './SubComponent/ViewAllRoleNames';

export default function AddAdminRoleName() {
  const { admin } = useAuthContext();
  const [roleName, setRoleName] = useState('');
  const [roleNames, setRoleNames] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState();

  const addAdminRoleName = async () => {
    setIsLoading(true);
    setError('');
    const response = await fetch(`${url}/api/role/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        roleName,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      alert('Created');
      setIsLoading(false);
      setRoleName('');
    }
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAdminRoleName(roleName);
  };

  function LoadingIndicate() {
    if (isLoading === true)
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
  }

  //to get all cities
  useEffect(() => {
    const dataFetchRoleName = async () => {
      const response = await fetch(`${url}/api/role/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setRoleNames(json);
      }
      if (!response.ok) {
        setError(json.messg);
      }
    };
    dataFetchRoleName();
  }, [admin.token, roleName]);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Add Role Name</Form.Label>
          <Form.Control
            id="roleName"
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          ></Form.Control>
          <div className="text-center">
            <Button type="submit">Add Role</Button>
          </div>
          <div className="text-center">
            {error}
            {isLoading ? LoadingIndicate(isLoading) : LoadingIndicate(false)}
          </div>
        </Form>
      </Container>
      <Container>
        <ViewAllRoleNames props={roleNames}></ViewAllRoleNames>
      </Container>
    </>
  );
}
