import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/index'

import {Row, Col} from 'react-bootstrap';

class TransactionManager extends Component {
    componentDidMount() {
        this.props.getCategories(this.props.token);
    }

    render() {
        return (
            <Row className="show-grid">
                <Col md={2}>
                    <div>
                        <ul>
                            {this.props.categories.map(i => <li key={i.id}>{i.name}</li>)}
                        </ul>
                    </div>
                </Col>
            </Row>

        )
    }
};

const mapStateToProps = state => {
    return {
        categories: state.categoriesReducer.categories,
        token: state.authReducer.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: (token) => dispatch(actions.getCategories(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionManager);