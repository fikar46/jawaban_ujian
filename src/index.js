import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './support/fonts/material-icon/css/material-design-iconic-font.min.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));

serviceWorker.unregister();
