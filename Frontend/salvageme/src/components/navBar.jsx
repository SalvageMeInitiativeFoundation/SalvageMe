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
        {pathName('/donate')? <div className='Selected'>
        <li>Donate</li>
        <hr color='white'></hr></div>:
        <li>Donate</li>}</Link>
        <Link to='/request'>{pathName('/request')? <div className='Selected'><li>Request</li>
        <hr color='white'></hr></div>:
        <li>Request</li>}</Link>
        <Link to='/login'>{pathName('/login')? <div className='Selected'><li>login</li><hr color='white'></hr></div>:
        <li>login</li>}</Link>
        </ul>
    </header>

    </>);
}

export default NavBar;