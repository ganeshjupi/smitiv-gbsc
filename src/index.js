import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const userdetailReducer = (state = {}, action) => {
    switch(action.type) {
    case 'ADD_LOGGED_USER_DETAILS':
       return action.payload;
    case 'CLEAR_LOGGED_USER_DETAILS':
       return {}
    default:
       return state;
     }
    };
    const store = createStore(userdetailReducer);

ReactDOM.render( <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
