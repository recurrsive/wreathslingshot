/* eslint-disable import/default */

import {
  receiveCustomers,
  receiveScouts,
  receiveSalesheets
} from './actions/appActions';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import { jwt } from './constants/env';

const store = configureStore();
fetch(`http://powerful-sea-27631.herokuapp.com/customers`, {headers: {'Authorization': 'JWT ' + jwt}})
    .then(response => response.json())
    .then(json => store.dispatch(receiveCustomers(json)))
fetch(`http://powerful-sea-27631.herokuapp.com/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
  .then(response => response.json())
  .then(json => store.dispatch(receiveScouts(json)))
fetch(`http://powerful-sea-27631.herokuapp.com/sheets`, {headers: {'Authorization': 'JWT ' + jwt}})
  .then(response => response.json())
  .then(json => store.dispatch(receiveSalesheets(json)))

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
