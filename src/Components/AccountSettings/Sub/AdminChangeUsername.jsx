import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { url } from '../../../Data/Url';
import { useAuthContext } from '../../../Hooks/useAuthContext';

export default function AdminChangeUsername() {
  const { admin } = useAuthContext();
  const [username, setUsername] = useState();

  useEffect(() => {
    const dataFetchUserName = async () => {
      const response = await fetch(`${url}/api/admin/get/oneAdminInfo`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUsername(json.username);
      } else {
        console.log('notSkill');
      }
    };
    dataFetchUserName();
  }, [admin.token]);

  const updateUsernameAdmin = async (username, oldpass, newpass) => {
    const response = await fetch(`${url}/api/admin/update/oneAdminUserName`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify({ username, oldpass, newpass }),
    });
    if (response.ok) {
      alert('Username Updated');
    } else {
      alert('Not Ok');
    }
  };

  const handleUpdateUsernameAdmin = async (e) => {
    e.preventDefault();
    await updateUsernameAdmin(username);
  };

  return (
    <>
      <div className="info_detail">
        <Form id="user_username_change" onSubmit={handleUpdateUsernameAdmin}>
          <Container className="skilled-info-update">
            <Form.Group>
              <Form.Control
                id="username"
                size="sm"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="text-center">
              <Button type="submit" form="user_username_change">
                Update Username
              </Button>
            </div>
          </Container>
        </Form>
      </div>
    </>
  );
}
