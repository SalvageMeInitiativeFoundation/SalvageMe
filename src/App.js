import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Books from "./pages/Books/Books";
import BookDetailPage from "./pages/Books/BookDetailPage";
import CreateDonation from "./pages/Books/CreateDonation";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Donate from "./pages/donate";
import Request from "./pages/request";
import PrivateRoute from "./components/privateRoute";
import LandingPage from "./pages/Landing/LandingPage";
import PasswordReset from './pages/Auth/PasswordReset';
import UserContextProvider from "./context/userContext/userContext";
import "./index.css";
// import 'rsuite/dist/rsuite.min.css';
import Technology from './pages/Home/Technology';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [activePage, setActivePage] = useState("/");

  const path = window.location.pathname;

  useEffect(() => {
    // console.log("PATH ", path);
    setActivePage(path);
  }, [path]);

  return (
    
      <UserContextProvider>
        <BrowserRouter>
         <ToastContainer/>
          {activePage === '/' ? <></> : <NavBar />} 
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home setPath={setActivePage}/>} />
            <Route path="/about" element={<About />} /> 
            <Route path='/services/technology' element={<Technology/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            {/* <Route path="/request" element={<Books />} />  */}
            {/* <Route path="/donate" element={<CreateDonation />} /> */}
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/request" element={<PrivateRoute />}>
              <Route path="/request" element={<Request/>} />
            </Route>
            <Route path="/donate" element={<PrivateRoute />}>
              <Route path="/donate" element={<Donate />} />
            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/password-reset/:token/:id" element={<PasswordReset/>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    
  );
}

export default App;
