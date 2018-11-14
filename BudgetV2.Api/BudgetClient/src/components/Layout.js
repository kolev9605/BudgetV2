import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../components/Navigation';
import {Grid} from '@material-ui/core'

class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation isAuthenticated={this.props.isAuthenticated}/>
                <main>
                    <Grid>
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