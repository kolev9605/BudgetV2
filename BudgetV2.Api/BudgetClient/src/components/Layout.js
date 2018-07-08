import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import { Grid } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <main>
                    <Grid fluid>
                        {this.props.children}
                    </Grid>
                </main>
            </div>
        );
    };
};


export default Layout;