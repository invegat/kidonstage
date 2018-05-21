import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import logger from './reduxLoggerMiddleware';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import { createEpicMiddleware, combineEpics } from 'redux-observable';

import App from './App';

import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
// const store = createStore(
//   reducers,
//   applyMiddleware(logger, createEpicMiddleware(rootEpic))
// );

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <MuiThemeProvider MuiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
