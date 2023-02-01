import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

export default function AdminChangePassword() {
  const { admin } = useAuthContext();

  const [username, setUsername] = useState();
  const [oldpass, setOldPassword] = useState();
  const [newpass, setNewPass] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const dataFetchAdminUser = async () => {
      const response = await fetch(`${url}/api/admin/get/oneAdminInfo`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUsername(json.username);
      } else {
        setError(json.error);
      }
    };
    dataFetchAdminUser();
  }, [admin.token]);

  const updatePasswordAdmin = async (username, oldpass, newpass) => {
    const response = await fetch(`${url}/api/admin/update/oneAdminPass`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ username, oldpass, newpass }),
    });
    const json = await response.json();
    if (response.ok) {
      alert('Password Updated');
      setError('');
    } else {
      setError(json.error);
    }
  };

  const handleUpdatePasswordAdmin = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(oldpass);
    console.log(newpass);
    await updatePasswordAdmin(username, oldpass, newpass);
  };

  return (
    <>
      <div className="info_detail">
        <Form id="user_password_change" onSubmit={handleUpdatePasswordAdmin}>
          <Container className="skilled-info-update">
            <Form.Group>
              <Form.Control
                id="username"
                size="sm"
                type="text"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                hidden
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                id="old_password_user"
                size="sm"
                type="password"
                value={oldpass}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                id="new_password_user"
                size="sm"
                type="password"
                value={newpass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" form="user_password_change">
                Update Password
              </Button>
              <div className="text-center">
                {<span className="text-danger">{error}</span>}
              </div>
            </div>
          </Container>
        </Form>
      </div>
    </>
  );
}
