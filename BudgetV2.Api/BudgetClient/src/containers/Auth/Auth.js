import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, Row} from 'react-bootstrap';
import './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Auth extends Component {

    constructor(props) {
        super(props);
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isLogin: true
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('ONSUBMIT: ' + this.state.isLogin)
        if (this.isLogin) {
            this.props.onLogin(this.state.email, this.state.password);
        } else {
            this.props.onRegister(this.state.email, this.state.password, this.state.confirmPassword);
        }
        
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
        if (this.validateEmail(email)) {
            return 'success';
        } else {
            return 'error';
        }
    }

    isValidSubmit = () => {
        let isValid = this.getEmailValidationState() === 'success' && this.getPasswordValidationState() === 'success';

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

        let confirmPasswordInput = 
            this.state.isLogin ? 
            null :
            <Row>
                <FormGroup 
                    controlId="formHorizontalPassword"
                    validationState={this.getConfirmPasswordValidationState()}
                >
                    <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                        Confirm Password
                    </Col>
                    <Col sm={4}>
                        <FormControl 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPasswordChange}
                        />
                    </Col>
                </FormGroup>
            </Row>;


        if (!this.isValidSubmit()) {
            submitButton = 
            <Button type="submit" disabled bsStyle="danger">
                Sign in
            </Button>;
        }

        let switchAuthButton = 
        <Button bsStyle="link" onClick={this.handleSwitchAuth}>
            {this.state.isLogin ? 'Register now!' : 'Login now!'}
        </Button>

        return (
            <Form horizontal className='auth' onSubmit={this.onSubmit}>
                <Row>
                    <FormGroup 
                        controlId="formHorizontalEmail"
                        validationState={this.getEmailValidationState()}
                    >
                        <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                            Email
                        </Col>
                        <Col sm={4}>
                            <FormControl 
                                type="email" 
                                placeholder="Email" 
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup 
                        controlId="formHorizontalPassword"
                        validationState={this.getPasswordValidationState()}
                    >
                        <Col componentClass={ControlLabel} sm={2} smOffset={1}>
                            Password
                        </Col>
                        <Col sm={4}>
                            <FormControl 
                                type="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Col>
                    </FormGroup>
                </Row>
                {confirmPasswordInput}
                <Row>
                    <FormGroup>
                        <Col sm={3} smOffset={3}>
                            {submitButton}
                            {switchAuthButton}
                        </Col>
                    </FormGroup>

                </Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onRegister: (email, password, confirmPassword) => dispatch(actions.register(email, password, confirmPassword))
    }
}



export default connect(null, mapDispatchToProps)(Auth);

