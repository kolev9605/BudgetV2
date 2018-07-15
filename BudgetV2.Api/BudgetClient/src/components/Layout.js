import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import { Grid } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation isAuthenticated = {this.props.isAuthenticated} />
                <main>
                    <Grid fluid>
                        {this.props.children}
                    </Grid>
                </main>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.authToken != null
    }
}

export default connect(mapStateToProps, null)(Layout);