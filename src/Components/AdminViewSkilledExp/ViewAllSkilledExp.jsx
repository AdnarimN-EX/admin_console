import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import SkilledExperienceTable from './Sub/SkilledExperienceTable';

export default function ViewAllSkilledExp() {
  const { admin } = useAuthContext();
  const [expList, setExpList] = useState([]);
  const [skilled_id, setSkiled_Id] = useState();
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(
        `${url}/api/admin/getAll/SkilledExp/detail`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setExpList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);

  console.log('hello');
  console.log(expList);

  return (
    <Container>
      <h1>Skilled Experience List</h1>
      {<p>{error}</p>}

      <div className="text-center">
        <SkilledExperienceTable props={expList} />
      </div>
    </Container>
  );
}
