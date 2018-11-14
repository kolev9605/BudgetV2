import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, Row} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import validator from 'validator';
import { PulseLoader } from 'react-spinners';
import { TextField, Paper } from '@material-ui/core';

class Auth extends Component {

    constructor(props) {
        super(props);
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

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

        if(this.props.authToken != null) {
            this.props.history.push("/");
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }
    
    getPasswordValidationState = () => {
        if (this.state.password.length >= 6 && this.state.password.length <= 15) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getConfirmPasswordValidationState = () => {
        if (this.state.confirmPassword.length >= 6 && this.state.confirmPassword.length <= 15 && this.state.password === this.state.confirmPassword) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getEmailValidationState = () => {
        const email = this.state.email;
        if (validator.isEmail(email)) {
            return 'success';
        } else {
            return 'error';
        }
    }

    isValidSubmit = () => {
        let isValid = this.getEmailValidationState() === 'success' && this.getPasswordValidationState() === 'success';
        console.log('ISVALID: ' + isValid)
        if (this.state.isLogin === false) {
            return isValid && this.getConfirmPasswordValidationState() === 'success';
        }

        return isValid;
    }

    handleSwitchAuth = () => {
        this.setState({isLogin: !this.state.isLogin});
    }

    render() {
        let submitButton = 
            <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>
                Sign in
            </Button>;

        let headline = this.state.isLogin ? "Log in" : "Register";

        let confirmPasswordInput = 
            this.state.isLogin ? 
            null :
            <Row>
                <FormGroup 
                    controlId="formHorizontalPassword"
                    validationState={this.getConfirmPasswordValidationState()}>
                    <Col componentClass={ControlLabel} md={2} mdOffset={1}>
                        Confirm Password
                    </Col>
                    <Col md={7}>
                        <FormControl 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPasswordChange}/>
                    </Col>
                </FormGroup>
            </Row>;


        if (!this.isValidSubmit()) {
            submitButton = 
            <Button type="submit" disabled bsStyle="danger" className>
                Sign {this.state.isLogin ? "In" : "Up"}
            </Button>;
        }

        let switchAuthButton = 
        <Button bsStyle="link" onClick={this.handleSwitchAuth}>
            {this.state.isLogin ? 'Register now!' : 'Login now!'}
        </Button> 

        let form =
        <Form horizontal className='auth' onSubmit={this.onSubmit}>
            <Row>
                <Col md={6} mdOffset={3}>
                    <h3 className="text-center">{headline}</h3>
                </Col>
            </Row>
            <Row>                                
                <FormGroup 
                    controlId="formHorizontalEmail"
                    validationState={this.getEmailValidationState()}>
                    <Col componentClass={ControlLabel} md={2} mdOffset={1}>
                        Email
                    </Col>
                    <Col md={7}>
                        <FormControl 
                            type="email" 
                            placeholder="Email" 
                            value={this.state.email}
                            onChange={this.handleEmailChange}/>
                    </Col>
                </FormGroup>

            </Row>
            <Row>
                <FormGroup 
                    controlId="formHorizontalPassword"
                    validationState={this.getPasswordValidationState()}>
                    <Col componentClass={ControlLabel} md={2} mdOffset={1}>
                        Password
                    </Col>
                    <Col md={7}>
                        <FormControl 
                            type="password" 
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handlePasswordChange}/>
                    </Col>
                </FormGroup>
            </Row>
            {confirmPasswordInput}
            <Row>
                <FormGroup>
                    <Col md={7} mdOffset={3}>
                        {submitButton}
                        {switchAuthButton}
                    </Col>
                </FormGroup>
            </Row>
        </Form>;

        let loadingIndicator =
        <div className='sweet-loading text-center'>
            <PulseLoader
                color={'#A5A5AF'} 
                loading={this.props.loading} 
            />
        </div>;

        if (this.props.isAuthenticated) {
            form = <Redirect to='/'/>
        }

        let form2 = 
        <Paper margin="dense" style={styles.formPaper}>
            <form>
                <TextField 
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    style={styles.formInputs}
                />
                <TextField 
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    style={styles.formInputs}
                />
            </form>
        </Paper>

        return (
            <div>
                {this.props.loading ? loadingIndicator : form2}
            </div>
        );
    }
}

const styles = {
    formPaper : {
        marginLeft: "50px",
        marginRight: "50px"
    },
    formInputs : {
        margin: "10px 40px"
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