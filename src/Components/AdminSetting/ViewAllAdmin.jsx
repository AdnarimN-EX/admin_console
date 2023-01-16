import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import AdminTable from './SubComponent/AdminTable';

export default function ViewAllAdmin() {
  const { admin } = useAuthContext();
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/admin/getAll/admin`, {
        headers: {
          authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setAdminList(json);
      } else {
        console.log('NotClient');
      }
    };
    dataFetchAdmin();
  }, [admin.token]);

  console.log(adminList);

  return (
    <Container>
      <h1>Admin List</h1>
      <AdminTable props={adminList} />
    </Container>
  );
}
