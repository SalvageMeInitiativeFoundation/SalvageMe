import "./index.css";
import {BrowserRouter , Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import Donate from "./pages/donate";
import Request from "./pages/request";
import Login from "./pages/login";
import PrivateRoute from "./components/privateRoute";
import PrivateRoute1 from "./components/privateRoute1";



function App() {
  return (
    <>
      
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<PrivateRoute />}>
            <Route path="/request" element={<Request />} />
          </Route>
          <Route path="/donate" element={<PrivateRoute />}>
            <Route path="/donate" element={<Donate />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
