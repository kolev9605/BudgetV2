import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.svg';
import './Navigation.css';

function navigation (props) {

    let authLink = props.isAuthenticated ? 
                <Nav pullRight>
                    <LinkContainer to='/logout' exact>
                        <NavItem eventKey={2}>                       
                                Logout
                        </NavItem>
                    </LinkContainer>
                </Nav> :
                <Nav pullRight>
                    <LinkContainer to='/auth' exact>
                        <NavItem eventKey={2}>                       
                                Sign in
                        </NavItem>
                    </LinkContainer>
                </Nav>;

    return (
        <Navbar collapseOnSelect staticTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to='/' exact className='logo-link'>
                        <img className='logo' src={logo} alt='logo'/>
                    </LinkContainer>
                </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                {authLink}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default navigation;
