import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from '../components/Navigation';

class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation isAuthenticated={this.props.isAuthenticated}/>
                <main>
                    {this.props.children}
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