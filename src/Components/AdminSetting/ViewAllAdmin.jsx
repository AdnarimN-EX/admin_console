import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import AdminTable from './SubComponent/AdminTable';

export default function ViewAllAdmin() {
  const { admin } = useAuthContext();
  const [adminList, setAdminList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/admin/getAll/admin`, {
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
        <AdminTable props={adminList} />
      </div>
    </Container>
  );
}
