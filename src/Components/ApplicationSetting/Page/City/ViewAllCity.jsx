import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../../../Data/Url';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import AddCity from './AddCity';
import CityTable from './Sub/CityTable';

export default function ViewAllCity() {
  const { admin } = useAuthContext();
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/city/getAll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCityList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>City List</h1>
      {<p>{error}</p>}
      <AddCity />
      <div className="text-center">
        <CityTable props={cityList} />
      </div>
    </Container>
  );
}
