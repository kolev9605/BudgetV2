import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.svg'
import './Navigation.css'

function navigation() {
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
                <Nav pullRight>
                    <LinkContainer to='/' exact>
                        <NavItem eventKey={1}>                       
                                Home
                        </NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <LinkContainer to='/auth' exact>
                        <NavItem eventKey={2}>                       
                                Sign in
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default navigation;
