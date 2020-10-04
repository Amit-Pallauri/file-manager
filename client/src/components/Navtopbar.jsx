import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'


const Navtopbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(storeState => storeState.userState.user)

  const handleLogout = e => {
    e.preventDefault()
    dispatch(logoutUser(history))
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="main">
      <Navbar className="navbar-custom" color="light" light expand="md">
        <Link to='/'>
          <NavbarBrand>FilemanageR</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {
              !user 
              ?
                <NavItem>
                    <Link style={{ textDecoration : 'none' }} to='/signUp'>
                      <NavLink>SignUp</NavLink>
                    </Link>
                </NavItem>
              :
                <NavItem>
                    <NavLink onClick={handleLogout}>SignOut</NavLink>
                </NavItem>  
            }        
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navtopbar;
