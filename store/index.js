/*
 * Created by Dash on 18.01.17.
 */

"use strict";

import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import thunk from '../middleware/thunk'

import main from '../routes/main/modules'
import tasks from '../routes/tasks/modules'

import notification from '../components/notification/modules'

export default () => {
  const store = createStore(
    combineReducers({
    	main,
    	tasks,
        notification,
    	routing
    }), {},
    compose(applyMiddleware(
        routerMiddleware(browserHistory),
        thunk
    ))
  );

  return store;
}
