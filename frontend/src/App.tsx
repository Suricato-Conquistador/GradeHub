import { BrowserRouter as Router, Routes, Route } from "react-router"
import Login from "./pages/Login"
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import UserPage from "./pages/User";
import Register from "./pages/Register";
import Preference from "./pages/Preference";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/terms" element={<Preference />} />
      </Routes>
    </Router>
  )
}

export default App;
