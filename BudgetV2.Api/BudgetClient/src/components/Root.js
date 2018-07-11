import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../containers/App';
import rootReducer from '../store/reducers/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


function root() {
    return (
        <Provider store={store}>
            <BrowserRouter>                
                    <App />
            </BrowserRouter>
        </Provider>
    )
};

export default root;