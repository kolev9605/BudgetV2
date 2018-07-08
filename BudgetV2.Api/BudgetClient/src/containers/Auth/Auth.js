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
            password: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    getPasswordValidationState = () => {
        if (this.state.password.length < 6 || this.state.password.length > 15) {
            return 'error';
        } else {
            return 'success';
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

        return isValid;
    }

    render() {
        let submitButton = 
            <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>
                Sign in
            </Button>;

        if (!this.isValidSubmit()) {
            submitButton = 
            <Button type="submit" disabled bsStyle="danger">
                Sign in
            </Button>;
        }

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
                <Row>
                    <FormGroup>
                        <Col sm={3} smOffset={3}>
                            {submitButton}
                        </Col>
                    </FormGroup>
                </Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}



export default connect(null, mapDispatchToProps)(Auth);

