import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const SideNav = (props) => {
    return (
        <Container>
        <Sidenav width={props.width}>
            <CloseBtn onClick={props.close}>&times;</CloseBtn>

            <Link to="/" onClick={props.close}>
                <span>Home</span>
            </Link>
            <Link to="/about" onClick={props.close}>
                <span>About</span>
            </Link>
            <Link to="/home/services" onClick={props.close}>
                <span>Services</span>
            </Link>
            <Link to="/home/contact" onClick={props.close}>
                <span>Contact</span>
            </Link>

            {/* {props.user ? (
            <>
                <DrpdnWrap>
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
                    <div className="dropdown-content right">
                        <Link to="/dashboard" onClick={props.close}>
                            Dashboard
                        </Link>
                        <Link to="/logout" onClick={props.close}>
                            Logout
                        </Link>
                    </div>
                </DrpdnWrap>
            </>
            ) : (
            <>
            <Link to="/signup" onClick={props.close}>
                <span>Signup</span>
            </Link>
            <Link to="/login" onClick={props.close}>
                <span>Login</span>
            </Link>
            </>)
        } */}
        </Sidenav>
        </Container>
    )
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.4s;
`;

const Sidenav = styled.div`
    height: fit-content;
    position: absolute; 
    /* z-index: 1000;  */
    top: 50px; 
    right: 0;
    background-color: #0B0705; 
    overflow-x: hidden; 
    padding-top: 10px; 
    transition: 0.5s; 
    width: ${props => props.width};

    a {
        text-align: left;
        padding: 8px 20px;
        text-decoration: none;
        font-size: 14px;
        color: #fff;
        display: block;
        transition: 0.3s;
        img {
            width: 18px;
            height: 18px;
            padding: 0;
            margin-bottom: -1px;
        }
        &:hover {
            color: #fa8128;
        }
    }
`;
  
const CloseBtn = styled.button`
    position: absolute;
    top: 0;
    right: 15px;
    font-size: 36px;
    line-height: 25px;
    color: #FFF;
    border: none;
    outline: none;
    background-color: transparent;
`;

const DrpdnWrap = styled.div`
    padding: 8px 20px;
    /* Dropdown Content (Hidden by Default) */
    & div.dropdown-content {
        display: none;
        position: relative;
        background-color: #f1f1f1;
        min-width: 160px;
        margin-top: 5px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

    &:hover div.dropdown-content, 
    & a.active  {display: block;}
`;

const User = styled.a`
    display: flex;
    align-items: center;
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
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
