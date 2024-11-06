import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './component/LoginPage';
import AdminPage from './component/AdminPage';
import AddEmployee from './component/AddEmployee';


function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<AdminPage   />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
        </Routes>
      </Router>
    )
}
export default App;
