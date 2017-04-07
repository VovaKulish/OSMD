/*
 * Created on 18.01.17.
 */

"use strict";

import React from 'react'
import { Route } from 'react-router'
import IndexLayout from './layouts/indexLayout'
import AddTask from './addTask'
import { TaskLayout } from './layouts/taskLayout'
import MainView from './main'
import TaskView from './tasks/taskView'
import LoginView from './login'
import RecoverView from './recover'

import { getTasks, setCurrentTask } from './tasks/modules'
import { getNews, getAnnouncements } from './main/modules'

const propsForAddTask = {
	priority: 3,
	question: "що будемо робити з прибиранням двору?",
	possibleAnswers: ['прибирати', 'нічого не робити']
}

const createElement = (Component, props) => {
    return <Component {...props} {...propsForAddTask} />;
};


export const getRoutes = ({ dispatch, getState }) => (
	<Route>
	  <Route path="/" component={IndexLayout}>
	    <Route
			path="main"
			component={MainView}
			onEnter={ (nextState) => {
				dispatch(getAnnouncements());
				dispatch(getNews());
			} }
		/>
	    <Route
			path="tasks"
			component={TaskLayout}
			onEnter={ (nextState) => dispatch(getTasks()) }
		>
	    	<Route path=":taskId" component={TaskView}
				onEnter={ (nextState) => dispatch(setCurrentTask(nextState.params.taskId)) }
			/>
	    </Route>
	    <Route path="task/create"
	    	component={(props) => createElement(AddTask, props)}
    	/>
	  </Route>

	  <Route path="/login" component={LoginView} />
	  <Route path="/recover" component={RecoverView} />
	</Route>
)
