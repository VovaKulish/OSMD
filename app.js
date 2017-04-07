/*
 * Created on 18.01.17.
 */

 "use strict";

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import { getRoutes } from './routes'
import createStore from './store'

const store = createStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
      <Router history={history} children={getRoutes(store)} />
	</Provider>, document.getElementById('root')
);
