import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logOutAPI } from "../../../actions";


const Navbar = (props) => {
    const toggleDropdown = (id) => {
        document.getElementById(id).classList.toggle("show");
    };

    const handleClickScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return (
        <Container style={props.style}>
            <Content>
                <Logo>
                    <NavLink to="/">
                        <img src="/images/cleanforce-logo.png" alt="Logo" />
                    </NavLink>
                </Logo>

                <Menu id="sidenav">
                    <NavLink onClick={props.sidenav}> &#9776; </NavLink>
                </Menu>

                <TopNav>
                    <NavListWrap>
                        <NavList className="active" id="home">
                            <NavLink to="/">
                                <span>Home</span>
                            </NavLink>
                        </NavList>

                        <NavList>
                            <NavLink to="/about">
                                <span>About</span>
                            </NavLink>
                        </NavList>

                        <NavList>
                            <NavLink to="/home/services">
                                <span>Services</span>
                            </NavLink>
                        </NavList>

                        <NavList>
                            <a style={{cursor: "pointer"}} onClick={()=> handleClickScroll("contact")}>
                                <span>Contact</span>
                            </a>
                        </NavList>

                        
                        {/* {props.user ? (
                            <>
                            <NavList className="dropdown">
                                <NavLink >
                                    <User className="user-sm">
                                        <span>
                                            {props.user && props.user.photoURL ? (
                                                <img src={props.user.photoURL} alt="" />
                                            ) : (
                                            <img src="/images/icons/user.svg" alt="" />
                                            )}
                                            <span>
                                                &nbsp;
                                                Me<img src="/images/icons/down-arrow-w.svg" alt="" className="down" />
                                            </span>
                                        </span>
                                    </User>
                                </NavLink>
                                <div className="dropdown-content right">
                                    <Link to="/dashboard">Dashboard</Link>
                                    <Link to="/logout">
                                        Logout
                                    </Link>
                                </div>
                            </NavList>
                            </>
                        ) : (
                            <>
                            <NavList>
                                <NavLink to="/signup">
                                    <span>Sign Up</span>
                                </NavLink>
                            </NavList>
                            <NavList>
                                <NavLink to="/login">
                                    <span>Login</span>
                                </NavLink>
                            </NavList>
                            </>)
                        } */}
                    </NavListWrap>
                    
                </TopNav>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 5px 0;
    padding-top: 10px;
    overflow: hidden;
    font-family: Arial;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    @media (min-width: 768px) {
        #sidenav{
            display: none;
        }
    }
`;


const Content = styled.div`
    display: flex;
    align-items: flex-start;
    min-height: 100%;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
`;


const Logo = styled.span`
    font-size: 0px;
    img {
        height: 45px;
        margin-top: -5px;
        margin-right: 10px;
        /* border: 2px solid white; */
    }
    @media screen and (max-width: 768px){
        img {
            height: 30px;
            margin-top: -5px;
            /* border: 2px solid white; */
        }
    }
`;



const TopNav = styled.nav`
    margin-left: auto;
    display: block; 
    color: #3F704D;
    @media (max-width: 600px) {
        display: none;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    list-style-type: none;
    position: relative;
    padding: 0;
`;


const NavList = styled.li`
    display: flex;
    align-items: center;
    
    a {
        align-items: flex-start;
        background: transparent;
        display: flex;
        flex-direction: row;
        font-size: 15.5px;
        justify-content: center;
        min-height: 30px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        margin-left: 5px;
        color: #3F704D;

        img {
            width: 30px;
            height: 30px;
        }

        span {
            display: flex;
            align-items: center;
            margin: 0;
            font-family: Arial;
            position: relative;
            img {
                width: 12px;
                height: 12px;
                align-self: flex-end;
            }
        }
        @media (max-width: 768px) {
            min-width: 70px;
        }
    }
    &:hover,
    &.active{
        a {
            border-bottom: 2px solid #3cb043;
            /* text-decoration: underline;
            text-decoration-color: #fa8128;
            text-decoration-thickness: 2px; */
        }

        span:after {
            content: '';
            transform: scaleX(1);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform 0.2s ease-in-out;
            width: 100%;
        }
    }

    &.dropdown{
        position: relative;
        display: inline-block;
    }
    /* Dropdown Content (Hidden by Default) */
    & div.dropdown-content {
        display: none;
        position: fixed;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        &.right {
            right: 0;
        }
        /* Links inside the dropdown */
        &>a {
            background-color: #000;
            opacity: 0.8;
            color: #FFF;
            padding: 5px 16px;
            text-decoration: none;
            margin-left: 0;
        }
        &>a:hover, &a.active {
            color: #fa8128;
        }
    }
    @media (min-width: 1024px) {
        &.dropdown:hover .dropdown-content {display: block;}
    }
    .show {display:block;}
`;

const TicketCart = styled(NavList)`
    a {
        margin: 0 15px 0 -5px;
        color: white;
        
        img {
            margin-right: 5px;
        }
    }
    &#ticket-card-2{
        margin-right: 15px;
    }
`;

const Menu = styled(NavList)`
    color: #fff;
    a {
        min-width: 5px;
    }
    @media (min-width: 600px) {
        display: none;
    }
`;



const User = styled(NavList)`
    &.user-sm {
        padding: 0;
        span {
            padding: 0;
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

    /* @media (min-width: 768px) {
        &.user-sm {
            display: flex;
        }
    }

    @media (max-width: 480px) {
        &.user-sm {
            display: flex;
        }
    } */
`;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(logOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
