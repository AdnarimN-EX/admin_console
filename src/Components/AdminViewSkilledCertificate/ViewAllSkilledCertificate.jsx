import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { url } from '../../Data/Url';
import { useAuthContext } from '../../Hooks/useAuthContext';
import SkillCertificateTable from './Sub/SkillCertificateTable';

export default function ViewAllSkilledCertificate() {
  const { admin } = useAuthContext();
  const [certList, setCertList] = useState([]);
  const [error, setError] = useState('');

  const token = admin.token;

  useEffect(() => {
    const dataFetchAdmin = async () => {
      const response = await fetch(`${url}/api/admin/getAll/Cert/detail`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCertList(json);
      } else {
        setError(json.messg);
      }
    };
    dataFetchAdmin();
  }, [token]);
  return (
    <Container>
      <h1>Skilled Experience List</h1>
      {<p>{error}</p>}

      <div className="text-center">
        <SkillCertificateTable props={certList} />
      </div>
    </Container>
  );
}
