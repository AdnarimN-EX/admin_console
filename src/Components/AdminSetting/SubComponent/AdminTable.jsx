import { Button, Container, Table } from 'react-bootstrap';
import DeleteAdmin from '../DeleteAdmin';
import EditAdmin from '../EditAdmin';
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
                  <ViewOneAdmin props={items}></ViewOneAdmin>
                  <EditAdmin props={items}></EditAdmin>
                  <DeleteAdmin props={items}></DeleteAdmin>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
