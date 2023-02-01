import { Container, Row, Table } from 'react-bootstrap';
import DeleteAdmin from '../DeleteAdmin';
import EditAdmin from '../EditAdmin';
import UpdateAdminPassword from '../UpdateAdminPassword';
import UpdateUsername from '../UpdateUsername';
import ViewOneAdmin from '../ViewOneAdmin';

export default function AdminTable({ props }) {
  return (
    <Container>
      <Table responsive sm>
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {props.map((items, index) => {
            return (
              <tr>
                <td key={index}>{items.username}</td>
                <td key={index}>{items.lname}</td>
                <td key={index}>{items.fname}</td>
                <td className="mr-auto">
                  <Container>
                    <Row>
                      <ViewOneAdmin props={items}></ViewOneAdmin>
                      <EditAdmin props={items}></EditAdmin>
                      <UpdateUsername props={items}></UpdateUsername>
                      <UpdateAdminPassword props={items}></UpdateAdminPassword>
                      <DeleteAdmin props={items}></DeleteAdmin>
                    </Row>
                  </Container>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
