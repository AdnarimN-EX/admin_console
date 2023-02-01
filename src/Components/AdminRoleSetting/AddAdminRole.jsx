import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function AddAdminRole() {
  const { admin } = useAuthContext();
  const [role, setRole] = useState([]);
  const [cap, setCap] = useState([]);
  const [adminUserName, setAdminUsername] = useState([]);

  const [role_id, setRoleid] = useState('');
  const [capability_id, setCopability] = useState('');
  const [adminInfo_id, setAdminInfo_id] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState();

  //role
  useEffect(() => {
    const dataFetchRole = async () => {
      const response = await fetch(`${url}/api/role/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setRole(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchRole();
  }, []);
  //capabi
  useEffect(() => {
    const dataFetchCap = async () => {
      const response = await fetch(`${url}/api/capability/getAll`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCap(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchCap();
  }, []);
  //username
  useEffect(() => {
    const dataFetchUser = async () => {
      const response = await fetch(`${url}/api/admin/getAll/admin`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setAdminUsername(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchUser();
  }, []);

  const addAdminRole = async () => {
    setIsLoading(true);
    setError('');
    const response = await fetch(`${url}/api/roleCapability/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        role_id,
        capability_id,
        adminInfo_id,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      alert('Created');
      setIsLoading(false);
    }
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
  };

  function LoadingIndicate() {
    if (isLoading === true)
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
  }
  const test = (e) => {
    console.log(role_id, capability_id, adminInfo_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(role_id, capability_id, adminInfo_id);

    await addAdminRole(role_id, capability_id, adminInfo_id);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Select Role</Form.Label>
        <Form.Select
          id="role"
          value={role_id}
          onChange={(e) => setRoleid(e.target.value)}
        >
          <option>Select</option>
          {role.map((items, index) => {
            return (
              <option key={index} value={items._id}>
                {items.roleName}
              </option>
            );
          })}
        </Form.Select>

        <Form.Label>Select Capability</Form.Label>
        <Form.Select
          id="capability"
          value={capability_id}
          onChange={(e) => setCopability(e.target.value)}
        >
          <option>Select</option>
          {cap.map((items, index) => {
            return (
              <option key={index} value={items._id}>
                {items.capabilityName}
              </option>
            );
          })}
        </Form.Select>

        <Form.Label>Select Admin</Form.Label>
        <Form.Select
          id="id"
          value={adminInfo_id}
          onChange={(e) => setAdminInfo_id(e.target.value)}
        >
          <option>Select</option>
          {adminUserName.map((items, index) => {
            return (
              <option key={index} value={items._id}>
                {items.username}
              </option>
            );
          })}
        </Form.Select>
        <div className="text-center">
          <Button type="submit">Add Role</Button>
        </div>
        <div className="text-center">
          {error}
          {isLoading ? LoadingIndicate(isLoading) : LoadingIndicate(false)}
        </div>
      </Form>
    </Container>
  );
}
