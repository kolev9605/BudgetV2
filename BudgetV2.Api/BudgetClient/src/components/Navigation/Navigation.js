import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg';
import './Navigation.css';

import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';

function navigation(props) {
    
    let authLink = props.isAuthenticated ?
        <Link to='/logout' exact>
            <Button>
                Logout
            </Button>
        </Link> :
        <Link to='/auth' exact>
            <Button>
                Sign in
            </Button>
        </Link>;

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                        <Link to='/'>
                            <Button>
                                <img className='logo' src={logo} alt='logo' />
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item>
                        {authLink}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default navigation;
