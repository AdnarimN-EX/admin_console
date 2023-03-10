import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import SkilledWorkerTable from './SubComponent/SkilledWorkerTable';

export default function ViewAllSkilled() {
  const { admin } = useAuthContext();
  const [skilledList, setSkilledList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/admin/getAll/Skilled`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setSkilledList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Skilled Worker List</h1>
      {<p>{error}</p>}
      <SkilledWorkerTable props={skilledList} />
    </Container>
  );
}
