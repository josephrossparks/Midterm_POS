import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { fetchItems } from './actions/api.js';

const store = createStore(
	reducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

// Trigger the fetchItems "action" upon loading the page
store.dispatch(fetchItems());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();