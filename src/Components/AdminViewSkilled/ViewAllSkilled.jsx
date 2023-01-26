import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import SkilledWorkerTable from './SubComponent/SkilledWorkerTable';

export default function ViewAllSkilled() {
  const { admin } = useAuthContext();
  const [skilledList, setSkilledList] = useState([]);

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
        setSkilledList(json);
      } else {
        console.log('Eror');
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Admin List</h1>
      <SkilledWorkerTable props={skilledList} />
    </Container>
  );
}
