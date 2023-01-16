import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AddAdmin from './Components/AdminSetting/AddAdmin';
import ViewAllAdmin from './Components/AdminSetting/ViewAllAdmin';
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
