import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

function NavBar() {
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

          <ul className="navBarList">
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

export default NavBar;
