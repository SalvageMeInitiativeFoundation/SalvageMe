import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import BookDetailPage from "./pages/Books/BookDetailPage";
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

  const getInitialSeconds = () => {
    const targetDate = new Date("2025-06-17").getTime();
    const today = new Date().getTime();
    const differenceInSeconds = Math.floor((targetDate - today) / 1000);
    return differenceInSeconds;
  };

  return (
    
      <UserContextProvider>
        <BrowserRouter>
         <ToastContainer/>
          {getInitialSeconds()<1 ?<NavBar />: <></> } 
          <Routes>
            <Route path="/" element={getInitialSeconds()<1?<Home /> : <LandingPage differenceInSeconds={getInitialSeconds()} />} />
            <Route path="/about" element={<About />} /> 
            <Route path='/services/' element={<Technology/>}/>
            <Route path='/services/:category' element={<Technology/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            {/* <Route path="/request" element={<Books />} />  */}
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/request" element={<PrivateRoute />}>
              <Route path="/request" element={<Request/>} />
            </Route>
            <Route path="/donate" element={<PrivateRoute />}>
              <Route path="/donate" element={<Donate />} />
            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/passwordReset/:token/:id" element={<PasswordReset/>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    
  );
}

export default App;
