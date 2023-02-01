import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import SkillBillTable from './Sub/SkillBillTable';

export default function ViewAllSkillBill() {
  const { admin } = useAuthContext();
  const [billList, setBillList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(
        `${url}/api/admin/getAll/skilledBill/detail`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setBillList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Skilled Bill List</h1>
      {<p>{error}</p>}

      <div className="text-center">
        <SkillBillTable props={billList} />
      </div>
    </Container>
  );
}
