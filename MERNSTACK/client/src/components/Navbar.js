import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../images/logo.png"
import { UserContext } from '../App';

const Navbar = () => {
  const {state}=useContext(UserContext)
  const RenderMenu=()=>{
    if(state){
      return(
        <>
           <li className="nav-item active">
              <Link className="nav-link" to="/">
                <b> Home <span className="sr-only"></span></b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <b>About</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <b>Contact</b>
              </Link>
            </li>
           

            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                <b>Logout</b>
              </Link>
            </li>
            
        </>
      )
    }else{
      return (
        <>
           <li className="nav-item active">
              <Link className="nav-link" to="/">
                <b> Home <span className="sr-only"></span></b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <b>About</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <b>Contact</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <b>Login</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                <b>Registration</b>
              </Link>
            </li>

            
            
        </>
      )
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt='logo' />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">

           <RenderMenu/>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
