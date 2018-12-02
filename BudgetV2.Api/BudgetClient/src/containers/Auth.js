import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import validator from 'validator';
import { PulseLoader } from 'react-spinners';
import { TextField, Paper, Button } from '@material-ui/core';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isLogin: true
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.isLogin) {
            this.props.onLogin(this.state.email, this.state.password);
        } else {
            this.props.onRegister(this.state.email, this.state.password, this.state.confirmPassword);
        }

        if (this.props.authToken != null) {
            this.props.history.push("/");
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    isPasswordValid = () => {
        if (this.state.password === "")
            return true;

        if (this.state.password.length >= 6 
            && this.state.password.length <= 15) {
            return true;
        } else {
            return false;
        }
    }

    isConfirmPasswordValid = () => {
        if (this.state.confirmPassword === "")
            return true;

        if (this.state.confirmPassword.length >= 6 
            && this.state.confirmPassword.length <= 15 
            && this.state.password === this.state.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    isEmailValid = () => {
        const email = this.state.email;
        if (validator.isEmail(email) || email === "") {
            return true;
        } else {
            return false;
        }
    }

    isValidSubmit = () => {
        let isValid = this.isEmailValid() && this.isPasswordValid();
        if (this.state.isLogin === false) {
            return isValid && this.isConfirmPasswordValid();
        }

        return isValid;
    }

    handleSwitchAuth = () => {
        this.setState({isLogin: !this.state.isLogin});
    }

    render() {

        let confirmPasswordInput = 
            this.state.isLogin ? 
            null :
                <Row justify="center">
                    <Col sm={10} xs={12}>
                        <TextField 
                            label="Confirm Password"
                            type="password"
                            style={styles.formInput}
                            onChange={this.handleChange('confirmPassword')}
                            error={!this.isConfirmPasswordValid()} />
                    </Col>
                </Row>;

        let loadingIndicator =
        <div className='sweet-loading text-center'>
            <PulseLoader
                color={'#A5A5AF'} 
                loading={this.props.loading} 
            />
        </div>;

        let form = 
            <form>
                <Row justify="center">
                    <Col sm={10} xs={12}>
                        <TextField 
                            error={!this.isEmailValid()}
                            label="Email"
                            style={styles.formInput}
                            onChange={this.handleChange('email')}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col sm={10} xs={12}>
                        <TextField 
                            label="Password"
                            type="password"                        
                            style={styles.formInput}
                            onChange={this.handleChange('password')}
                            error={!this.isPasswordValid()}
                        />
                    </Col>
                </Row>
                {confirmPasswordInput}
                <Row gutter={20} justify="center">
                    <Col lg={3} sm={4} xs={12}>
                        <Button 
                            style={styles.formInput}
                            onClick={this.onSubmit}>
                            Sign {this.state.isLogin ? "In" : "Up"}
                        </Button>
                    </Col>
                    <Col lg={3} sm={4} xs={12}>
                        <Button
                            onClick={this.handleSwitchAuth}
                            style={styles.formInput}>
                            {this.state.isLogin ? 'Register now!' : 'Login now!'}
                        </Button>
                    </Col>
                </Row>
            </form>

        if (this.props.isAuthenticated) {
            form = <Redirect to='/'/>
        }

        return (
            <Row justify="center">
                <Col sm={6} xs={12}>
                    <Paper style={styles.paper}>
                        {this.props.loading ? loadingIndicator : form}
                    </Paper>
                </Col>
            </Row>
        );
    }
}

const styles = {
    formInput: {
        width: "100%",
        margin: "5px 0"
    },
    paper: {
        marginTop: "20px",
        padding: "10px"
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onRegister: (email, password, confirmPassword) => dispatch(actions.register(email, password, confirmPassword))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        isAuthenticated: state.authReducer.authToken !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);