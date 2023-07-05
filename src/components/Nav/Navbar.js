import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logOutAPI } from "../../actions";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
          <li className="navbar-link">Donate</li>
          <li className="navbar-link">Request</li>
          <li className="navbar-link">Login</li>
        </NavbarLinks>
      </Nav>
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
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
  color: #ff8c00;
  .navbar-link {
    margin-right: 10px;
    cursor: pointer;
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

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(logOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
