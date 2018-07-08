import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import TransactionManager from './TransactionManager';
import Auth from './Auth/Auth'

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={TransactionManager} />
                    <Route path='/auth' exact component={Auth} />
                </Switch>
            </Layout>
        )
    }
}