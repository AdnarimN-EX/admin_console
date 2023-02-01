import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import AdminRoleTable from './SubComponent/AdminRoleTable';

export default function ViewAllAdminRoles() {
  const { admin } = useAuthContext();
  const [adminList, setAdminList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/roleCapability/getAll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setAdminList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Admin List</h1>
      {<p>{error}</p>}

      <div className="text-center">
        <AdminRoleTable props={adminList} />
      </div>
    </Container>
  );
}
