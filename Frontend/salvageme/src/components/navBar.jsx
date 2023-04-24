import React from 'react';
import {useLocation,useNavigate,Link} from 'react-router-dom';
import '../index.css';

function NavBar(){
  const location = useLocation();
  const navigate = useNavigate();

  const pathName=(route)=>{
    if(route==location.pathname){
      return true
    }
  }

    return(<>
    <header className='navBarHeader'>
        <Link to='/'><h1>Salvage<span>Me</span></h1></Link>

        <ul className='navBarList'>
        <Link to='/donate'>
        {pathName('/donate')? <li>Donatea</li>:
        <li>Donate</li>}</Link>
        <Link to='/request'>{pathName('/request')? <li>Requesta</li>:
        <li>Request</li>}</Link>
        <Link to='/login'>{pathName('/login')? <li>logina</li>:
        <li>login</li>}</Link>
        </ul>
    </header>

    </>);
}

export default NavBar;