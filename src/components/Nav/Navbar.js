import React from "react";
import styled from "styled-components";
import { useState, useContext } from "react";
import { connect } from "react-redux";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { logOutAPI } from "../../actions";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext/userContext";

const Navbar = (props) => {
  const navigate=useNavigate();
  const { removeLocalUser, getLocalUser, setUser, user } = useContext(UserContext);
  console.log(user[0]);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const LogoutUser = (e) => {
    e.preventDefault();
    removeLocalUser();
    toast.success("Logout Successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate('/home')
    // console.log('===============LoggingOut==============')
    //  console.log(user);
  };

  return (
    <NavWrap>
      <Nav className="navbar">
        <Logo className="navbar-logo">
          <Link to="/home">
            <div className="logo-wrap">
              <img src="/images/logo.png" alt="Logo" />
              <h1 className="logo-text-wrap">
                <span style={{ color: "black" }}>Salvage</span>
                <span style={{ color: "#ff8c00" }}>Me</span>
              </h1>
            </div>
          </Link>
        </Logo>

        <NavbarToggle className="navbar-toggle" onClick={handleToggleNav}>
          <span className="navbar-toggle-icon">&#9776;</span>
        </NavbarToggle>

        <NavbarLinks className={`navbar-links ${isNavOpen ? "active" : ""}`}>
          <li className="navbar-link">
            <Link to="/donate" onClick={handleToggleNav}>Donate</Link>
          </li>
          <li className="navbar-link">
            <Link to="/request" onClick={handleToggleNav}>Request</Link>
          </li>

          {user.length > 0 ? (
            <NavList className="dropdown">
              <NavLink>
                <User className="user-sm">
                  <span>
                    {user.length > 0 && user[0].image ? (
                      <img src={user[0].image} alt="" />
                    ) : (
                      <img src="/images/icons/user.svg" alt="" />
                    )}
                    <span>
                      &nbsp; Me
                      <img
                        src="/images/icons/down-arrow-w.svg"
                        alt=""
                        className="down"
                      />
                    </span>
                  </span>
                </User>
              </NavLink>
              <div className="dropdown-content right">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="">
                  <button
                    className="NavLoginLogoutButton"
                    type="button"
                    onClick={(e) => LogoutUser(e)}
                  >
                    logout
                  </button>
                </Link>
              </div>
            </NavList>
          ) : (
            <>
              <li className="navbar-link">
                <Link to="/login" onClick={handleToggleNav}>Login</Link>
              </li>
            </>
          )}
        </NavbarLinks>
      </Nav>
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  /* background-color: #f8f8f8; */
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  .logo-wrap {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      @media (max-width: 540px) {
        width: 50px;
        height: 50px;
      }
    }
    .logo-text-wrap {
      border: 1px solid white;
      padding: 5px 20px;
      border-radius: 30px;
      background-color: white;
      @media (max-width: 540px) {
        font-size: 15px;
      }
    }
  }
`;

const NavbarToggle = styled.button`
  display: none;
  background-color: transparent;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  .navbar-toggle-icon {
    width: 25px;
    height: 3px;
    color: #fff;
    margin-bottom: 5px;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavbarLinks = styled.ul`
  display: flex;
  list-style: none;

  .navbar-link {
    margin-right: 10px;
    cursor: default;
    a {
      text-decoration: none;
      color: #ff8c00;
    }
    @media (max-width: 768px) {
      margin-bottom: 10px;
    }
    @media (min-width: 769px) {
      border: 1px solid white;
      padding: 5px 20px;
      border-radius: 30px;
      text-align: center;
      min-width: 60px;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #000;
        cursor: default;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    &.active {
      display: flex;
    }
  }
`;

const NavList = styled.li`
  &.dropdown {
    position: relative;
    display: inline-block;
  }
  /* Dropdown Content (Hidden by Default) */
  & div.dropdown-content {
    display: none;
    position: fixed;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    &.right {
      right: 0;
    }
    /* Links inside the dropdown */
    & > a {
      background-color: #000;
      opacity: 0.8;
      color: #fff;
      padding: 5px 16px;
      text-decoration: none;
      margin-left: 0;
      display: block;
    }
    & > a:hover,
    &a.active {
      color: #fa8128;
    }
  }
  @media (min-width: 1024px) {
    &.dropdown:hover .dropdown-content {
      display: block;
    }
  }
  .show {
    display: block;
  }
`;

const User = styled.span`
  &.user-sm {
    padding: 0;
    span {
      padding: 0;
      color: #ff8c00;
      & > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      & > img.down {
        width: 12px;
        height: 12px;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(logOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
