import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountAdminSetting from './Components/AccountSettings/AccountAdminSetting';
import AdminRoleAccessSetting from './Components/AdminRoleSetting/AdminRoleAccessSetting';

import AddAdmin from './Components/AdminSetting/AddAdmin';
import ViewAllAdmin from './Components/AdminSetting/ViewAllAdmin';
import ViewAllSkilled from './Components/AdminViewSkilled/ViewAllSkilled';
import ViewAllSkillBill from './Components/AdminViewSkilledBill/ViewAllSkillBill';
import ViewAllSkilledCertificate from './Components/AdminViewSkilledCertificate/ViewAllSkilledCertificate';
import ViewAllSkilledExp from './Components/AdminViewSkilledExp/ViewAllSkilledExp';
import ApplicationSetting from './Components/ApplicationSetting/ApplicationSetting';
//
import LogIn from './Components/Door/Log_In/LogIn';
import HomePage from './Components/Home/HomePage';
import Navigationbar from './Components/Navbar/Navigationbar';
import SkilledWorkerPage from './Components/SkillData/SkilledWorkerPage';
import { useAuthContext } from './Hooks/useAuthContext';

function App() {
  const { admin } = useAuthContext();
  return (
    <Router>
      <header>
        <Navigationbar />
      </header>
      <main>
        <Routes>
          {!admin && <Route path="/" element={<LogIn />}></Route>}

          {admin && <Route path="/" element={<HomePage />}></Route>}

          {admin && (
            <Route path="/skilled" element={<SkilledWorkerPage />}></Route>
          )}
          {admin && (
            <Route path="/appsetting" element={<ApplicationSetting />}></Route>
          )}
          {admin && <Route path="/adminCreate" element={<AddAdmin />}></Route>}

          {admin && (
            <Route path="/viewAllAdmin" element={<ViewAllAdmin />}></Route>
          )}

          {admin && (
            <Route path="/viewSkilled" element={<ViewAllSkilled />}></Route>
          )}
          {admin && (
            <Route
              path="/viewSkilledExperience"
              element={<ViewAllSkilledExp />}
            ></Route>
          )}
          {admin && (
            <Route
              path="/viewSkilledCertificate"
              element={<ViewAllSkilledCertificate />}
            ></Route>
          )}
          {admin && (
            <Route
              path="/viewSkilledBill"
              element={<ViewAllSkillBill />}
            ></Route>
          )}

          {admin && (
            <Route
              path="/roleSettings"
              element={<AdminRoleAccessSetting />}
            ></Route>
          )}
          {admin && (
            <Route
              path="/accountSetting"
              element={<AccountAdminSetting />}
            ></Route>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
