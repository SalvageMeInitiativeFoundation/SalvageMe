import React, { useEffect,useMemo } from "react";
import styled from "styled-components";
import { useState, useContext } from "react";
import { connect } from "react-redux";
import { NavLink, Link,useNavigate, useLocation } from "react-router-dom";
import { logOutAPI } from "../../actions";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext/userContext";
import { AVATARS } from "../../utils/constants";

const Navbar = (props) => {
  const location = useLocation();
  const navigate=useNavigate();
  const { removeLocalUser, user } = useContext(UserContext);
  const avatarUrl = useMemo(() => {
    if (user?.image) return user.image;

    const seed =
      user?.username ||
      user?.id ||
      Math.random().toString(36).slice(2, 10);

    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    const idx = hash % AVATARS.length;

    return AVATARS[idx];
  }, [user?.image, user?.username, user?.id]);

  const darkbackgroundRoutes = ["/donate", "/request","/dashboard", "/services/"];

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    setIsDarkBackground(darkbackgroundRoutes.includes(location.pathname));
  }, [location]);

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => {
  setIsNavOpen(false);
};

  const LogoutUser = (e) => {
    e.preventDefault();
    removeLocalUser();
    toast.success("Logout Successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
    closeNav();
    navigate('/')
  };

  
  

  return (
    <NavWrap>
      <Nav className={`navbar`}>
        <Logo className="navbar-logo">
          <Link to="/">
            <div className="logo-wrap">
              <img src="/images/logo.jpg" alt="Logo" />
              <h1 className="logo-text-wrap">
                <span style={{ color: "black" }}>Salvage</span>
                <span style={{ color: "#ff8c00" }}>Me</span>
              </h1>
            </div>
          </Link>
        </Logo>

        <NavbarToggle $isDarkBackground={!isDarkBackground} onClick={handleToggleNav}>
          <span className='navbar-toggle-icon'>&#9776;</span>
        </NavbarToggle>

        <NavbarLinks className={`navbar-links ${isNavOpen ? "active" : ""}`}>
          <li className="navbar-link">
            <NavLink to="/donate" onClick={closeNav} className={({ isActive }) => (isActive ? "active" : "")}>Donate</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/request" onClick={closeNav} className={({ isActive }) => (isActive ? "active" : "")}>Request</NavLink>
          </li>

          {user ? (
            <NavList className="dropdown">
              <NavLink>
                <User className="user-sm">
                  <span>
                    <img
                      src={avatarUrl}
                      alt="Profile picture"
                    />
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
                <NavLink to="/dashboard" onClick={closeNav}>Dashboard</NavLink>
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
                <Link to="/login" onClick={closeNav}>Login</Link>
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
      border-radius: 50%;
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
  border: 2px solid
    ${({ $isDarkBackground }) => ($isDarkBackground ? "#fff" : "#000")};
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  .navbar-toggle-icon {
    color: ${({ $isDarkBackground }) =>
      $isDarkBackground ? "#fff" : "#000"};
    font-size: 32px;
    line-height: 1;
  }
  @media (max-width: 768px) {
    display: block;

    .navbar-toggle-icon {
      font-size: 32px;
      line-height: 1;
    }
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
      font-weight: 600;
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

      a.active {
        border: 1px solid #ff8c00;
        border-radius: 30px;
        padding: 5px 20px;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background-color: rgba(0, 0, 0, 0.9);
    padding: 20px;

    position: absolute;
    top: 70px;
    left: 0;

    width: 90%;
    z-index: 1000;

    /* Start off-screen */
    transform: translateX(-110%);
    opacity: 0;
    visibility: hidden;

    /* Animate the menu */
    transition:
      transform 0.35s ease,
      opacity 0.3s ease,
      visibility 0.35s ease;

    &.active {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
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
      font-weight: 600;
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
  @media (max-width: 768px) {
    /* ensure dropdown content is visible inside the mobile nav */
    & div.dropdown-content {
      display: block;
      position: relative;
      background-color: transparent;
      box-shadow: none;
      min-width: 100%;
      margin-top: 6px;
      &.right { right: auto; }
      & > a {
        background-color: transparent;
        opacity: 1;
        color: #fff;
        padding: 8px 0;
      }
      & > div { padding: 0; }
    }
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
    font-weight: 600;
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
