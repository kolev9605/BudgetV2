import React, {Component} from 'react'
import {connect} from 'react-redux'
import api from '../api'

import {Row, Col} from 'react-bootstrap';

class TransactionManager extends Component {
    componentDidMount() {
        api
            .get('values')
            .then(res => {
                console.log(res);
            })
    }

    render() {
        let testTransaction = {
            id: Math.random(),
            amount: 200,
            name: "Test"
        }

        return (
            <Row className="show-grid">
                <Col md={2}>
                    <div>
                        <ul>
                            {this.props.arr.map(i => <li key={i.id}>{i.name} {i.amount}</li>)}
                        </ul>
                    </div>
                    <button onClick={() => this.props.addTransaction(testTransaction)}>Add Transaction</button>
                </Col>
            </Row>

        )
    }
};

const mapStateToProps = state => {
    return {arr: state.transactionsReducer.transactions}
}

const mapDispatchToProps = dispatch => {
    return {
        addTransaction: (tr) => dispatch({
            type: 'ADD',
            data: {
                tr: tr
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionManager);