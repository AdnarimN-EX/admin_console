import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import BarangayTable from './Sub/BarangayTable';

export default function ViewAllBrgy() {
  const { admin } = useAuthContext();
  const [brgyList, setBrgyList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/barangay/getAll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setBrgyList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Barangay List</h1>
      {<p>{error}</p>}
      <div className="text-center">
        <BarangayTable props={brgyList} />
      </div>
    </Container>
  );
}
