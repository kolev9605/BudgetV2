import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg';

import {AppBar, Toolbar, Typography, Button, Grid} from '@material-ui/core';

function navigation(props) {

    const styles = {
        logo: {
            width: '120px',
            height: '50px'
        }
    };

    let authLink = props.isAuthenticated
        ? <Link to='/logout' exact>
                <Button>
                    <Typography variant="h5">
                        Logout
                    </Typography>
                </Button>
            </Link>
        : <Link to='/auth' exact>
            <Button>
                <Typography variant="h5">
                    Sign in
                </Typography>
            </Button>
        </Link>;

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Grid justify="space-between" container spacing={16} alignItems='center'>
                    <Grid item>
                        <Link to='/'>
                            <Button>
                                <img style={styles.logo} src={logo} alt='logo'/>
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
