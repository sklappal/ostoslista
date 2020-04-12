import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './index.css';
import items from './reducers'
import AppContainer from './containers/AppContainer'

const loggerMiddleware = createLogger()

const store = createStore(
  items,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);