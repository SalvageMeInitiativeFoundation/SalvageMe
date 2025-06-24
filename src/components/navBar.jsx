import React, { useContext,useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";
import styled from "styled-components";


function NavBar() {
   const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const { removeLocalUser, getLocalUser, setUser, user } =
    useContext(UserContext);

  const LogoutUser = (e) => {
    e.preventDefault();
    removeLocalUser();
    toast.success("Logout Successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
    // console.log('===============LoggingOut==============')
    //  console.log(user);
  };

  const location = useLocation();

  const pathName = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };

  return (
    <>
      <div className="NavBarContainer">
        <header className="navBarHeader">
          <Link to="/">
            <h2>
              Salvage<span>Me</span>
            </h2>
          </Link>

           <NavbarToggle className="navbar-toggle" onClick={handleToggleNav}>
          <span className="navbar-toggle-icon">&#9776;</span>
        </NavbarToggle>

          <ul className={`navBarList ${isNavOpen ?"active":""}`}>
            <Link to="/donate">
              {pathName("/donate") ? (
                <div className="Selected">
                  <li>Donate</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">Donate</li>
              )}
            </Link>
            <Link to="/request">
              {pathName("/request") ? (
                <div className="Selected">
                  <li>Request</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">Request</li>
              )}
            </Link>
            <Link to="/login">
              {pathName("/login") ? (
                <div className="Selected">
                  <li>
                    {user.length > 0 ? (
                      <button
                        className="NavLoginLogoutButton"
                        type="button"
                        onClick={(e) => LogoutUser(e)}
                      >
                        logout
                      </button>
                    ) : (
                      "login"
                    )}
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">
                  {user.length > 0 ? (
                    <button
                      className="NavLoginLogoutButton"
                      type="button"
                      onClick={(e) => LogoutUser(e)}
                    >
                      logout
                    </button>
                  ) : (
                    "login"
                  )}
                </li>
              )}
            </Link>
          </ul>
        </header>
      </div>
    </>
  );
}

const NavbarToggle = styled.button`
  display: none;
  background-color: transparent;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  border-radius:5px;
  width:40px;
  margin:3px;
  .navbar-toggle-icon {
    width: 35px;
    height: 25px;
    color: #fff;
    margin-bottom: 5px;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export default NavBar;
