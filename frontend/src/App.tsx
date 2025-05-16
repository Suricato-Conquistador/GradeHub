import { BrowserRouter as Router, Routes, Route } from "react-router"
import Login from "./pages/Login"
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import User from "./pages/User";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App;
