/*
 * Created on 18.01.17.
 */

"use strict";

const taskItemsHardCoded = [
    {
        id: '111',
        priority: 3,
        status: { title: "на голосуванні", priority: 5 },
        date: "01.19.2017",
        tags: ["під’їзд", "електрика"],
        title: "РЕМОНТ ЕЛЕКТРОМЕРЕЖІ В 5 ПІД’ЇЗДІ",
        hasAlreadyVoted: true,
        votes: 0,
        totalVotes: 0,
        description: `Living in today’s metropolitan world of cellular phones, mobile computers and other/
            high-tech gadgets is not just hectic but very impersonal.
            We make money and then invest our time and effort in
            making more money.`,
        votingExpiryDate: new Date(),
        question: 'Do u wanna fuck?',
        answers: [{id: 0, title: 'Yes'}, {id: 1, title: 'No'}],
        selectedAnswer: 0,
        reporter: 'Yuriy',
        isArchived: true
    },
    {
        id: '222',
        priority: 5,
        status: { title: "на голосуванні", priority: 5 },
        date: "12.22.2016",
        tags: ["під’їзд", "безпека", "двір"],
        title: "ВСТАНОВЛЕННЯ КАМЕР СПОСТЕРЕЖЕННЯ",
        hasAlreadyVoted: true,
        votes: 0,
        totalVotes: 0,
        description: `Living in today’s metropolitan world of cellular phones, mobile computers and other/
            high-tech gadgets is not just hectic but very impersonal.
            We make money and then invest our time and effort in
            making more money.`,
        votingExpiryDate: new Date(),
        question: 'Do u wanna fuck?',
        answers: [{id: 0, title: 'Yes'}, {id: 1, title: 'No'}],
        selectedAnswer: 0,
        reporter: 'Dash',
        isArchived: true
    },
    {
        id: '333',
        status: { title: "в опрацюванні", priority: 6 },
        date: "05.13.2016",
        tags: ["сервіс", "вода"],
        title: 'УКЛАДЕННЯ ДОГОВОРУ З НОВИМ САНТЕХНІКОМ',
        description: `Living in today’s metropolitan world of cellular phones, mobile computers and other/
            high-tech gadgets is not just hectic but very impersonal.
            We make money and then invest our time and effort in
            making more money. Does it end? Not usually because
            we are never satisfied. How many times have we
            convinced ourselves that if only we had some more money,
            life would be so sweet?`,
        votingExpiryDate: new Date('01.31.2016'),
        priority: 5,
        votes: 200,
        totalVotes: 220,
        question: `Оберіть, будь ласка, фірму, чиї умови вам підходять найкраще:`,
        answers: [
            {id: 0, title: 'Водограй'},
            {id: 1, title: 'Сантехніка Плюс'},
            {id: 2, title: 'Аквасервіс Дніпро'},
            {id: 3, title: 'мене влаштовує старий сантехнік'}
        ],
        selectedAnswer: 1,
        reporter: 'Dash',
        isArchived: false
    }
];

/**** SORTERS FOR TASKS ****/
/*@a: { Task object}, @b: { Task object }, @asc: { Bool , order of sorting }*/
const compareByDate = (asc) => {
    return (a, b) => {
        const aTime = (new Date(a.date)).getTime();
        const bTime = (new Date(b.date)).getTime();

        if(asc) {
            return aTime < bTime ? -1 :
                aTime > bTime ? 1 : 0;
        }

        return aTime > bTime ? -1 :
            aTime < bTime ? 1 : 0;
    };
}

/*@a: { Task object}, @b: { Task object }, @asc: { Bool , order of sorting }*/
const compareByPriority = (asc) => {
    return (a, b) => {
        if(asc) {
            return a.priority < b.priority ? -1 :
                a.priority > b.priority ? 1 : 0;
        }

        return a.priority > b.priority ? -1 :
            a.priority < b.priority ? 1 : 0;
    };
}

/*@a: { Task object}, @b: { Task object }, @asc: { Bool , order of sorting }*/
const compareByStatus = (asc) => {
    return (a, b) => {
        if(asc) {
            return a.status.priority < b.status.priority ? -1 :
                a.status.priority > b.status.priority ? 1 : 0;
        }

        return a.status.priority < b.status.priority ? -1 :
            a.status.priority > b.status.priority ? 1 : 0;
    };
}

const filterArchived = (tasks, isArchived) => {
    return tasks.filter((t) => isArchived ? t.isArchived : !t.isArchived);
}

export const sorters = [
    { title: "найновіші спочатку", action: (tasks) =>  tasks.sort(compareByDate(false)) },
    { title: "найдавніші спочатку", action: (tasks) =>  tasks.sort(compareByDate(true)) },
    { title: "найвищий пріорітет", action: (tasks) =>  tasks.sort(compareByPriority(false)) },
    { title: "найнижчий пріорітет", action: (tasks) =>  tasks.sort(compareByPriority(true)) },
    { title: "найвищий статус", action: (tasks) =>  tasks.sort(compareByStatus(false)) },
    { title: "найнижчий статус", action: (tasks) =>  tasks.sort(compareByStatus(true)) }
];

export const filters = [
    { title: "всі задачі", action: (tasks) => tasks },
    { title: "поточні задачі", action: (tasks) => filterArchived(tasks, false) },
    { title: "архівні задачі",  action: (tasks) => filterArchived(tasks, true) },
     //TODO: replace hardcoded 'dash' reporter. Take current from localStorage
    { title: "тільки мої", action: (tasks) => tasks.filter((t) => t.reporter.toLowerCase() === 'dash') }
];

/* @tasks: { TaskArray }, @filter: { String } */
export const filterTaskByTitle = (tasks, filter) => tasks.filter((t) => {
    if(!filter) {
        return tasks;
    }

    return t.title.toLowerCase()
        .indexOf(filter.toLowerCase()) > -1;
});

/* @arr: { Array of Any Items With Title } @title: { String, item which must be set first } */
export const sortByFirstPlace = (arr, title) => {
    if(idx > arr.length - 1) {
        return arr;
    }

    const idx = arr.findIndex((v) => v.title === title);

    const a = arr[0];
    arr[0] = arr[idx];
    arr[idx] = a;
    return arr;
}

const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
const GET_TASKS_FAIL = 'GET_TASKS_FAIL';

const SET_TASK_FILTERS = 'SET_TASK_FILTERS';
const SET_CURRENT_TASK_OFFSET = 'SET_CURRENT_TASK_OFFSET';

const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const SET_CURRENT_TASK_SELECTED_ANSWER = 'SET_CURRENT_TASK_SELECTED_ANSWER';

/**** SINGLE TASK PRIVATE REDUCER *****/
const _initTaskState = {
	id: '',
	priority: 0,
	description: '',
	status: { title: '', priority: 0 },
	date: '',
	title: '',
	tags: [],
	hasAlreadyVoted: false,
	votes: 0,
	totalVotes: 0,
	votingExpiryDate: new Date(),
	question: '',
	answers: [{id: '', title: ''}],
	selectedAnswer: 0,
    reporter: '',
    isArchived: false
};

function task(state = _initTaskState, action){
	switch(action.type){
		case SET_CURRENT_TASK_SELECTED_ANSWER:
			return {...state, ...{ selectedAnswer: action.currentTaskSelectedAnswerId } };

		default:
			return state;
	}
}

/**** TASK LIST GLOBAL REDUCER *****/
const _initTasksState = {
	tasks: [],
	current: '', //task id
    currentOffset: 0,
    currentFilterValue: filters[0].title,
    currentSorterValue: sorters[0].title,
    currentTitleFilter: ''
}

export default function tasks(state = _initTasksState, action){
	switch(action.type){
        case SET_TASK_FILTERS: {
            const { currentTitleFilter, currentSorterValue, currentFilterValue } = action.filters;

            return {
                ...state,
                ...{ currentFilterValue,
                     currentSorterValue,
                     currentTitleFilter
                }
            };
        }

		case SET_CURRENT_TASK: {
			let res = {...state, ...{ current: action.currentTaskId } };
			return res;
		}

        case SET_CURRENT_TASK_OFFSET: {
            return { ...state, ...{ currentOffset: action.currentOffset } };
        }

		case GET_TASKS_REQUEST: {
			return {...state, ...{ tasks: action.items } };
		}

		case SET_CURRENT_TASK_SELECTED_ANSWER: {
			const { tasks, current } = state;

			const curr = tasks.findIndex((v) => v.id === current);
			const newTask = task(tasks[curr], action);
            
			return {
                ...state,
                ...{
                    tasks: tasks
        				.slice(0, curr)
        				.concat(newTask)
        				.concat(tasks.slice(curr + 1))
                    }
            };
		}

		default:
			return state;
	}
}

export const setCurrentTaskOffset = (currentOffset) => {
	return {
		type: SET_CURRENT_TASK_OFFSET,
		currentOffset
	};
}

// @filters: {titleFilter: {string}, sorterValue: {String}, filterValue: {String}}
export const setTaskFilters = (filters) => {
	return {
		type: SET_TASK_FILTERS,
		filters
	};
}

export const getTasks = () => {
	return {
		type: GET_TASKS_REQUEST, // [GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAIL]
		items: taskItemsHardCoded
	};
}

export const setCurrentTaskSelectedAnswer = (currentTaskSelectedAnswerId) => {
	return {
		type: SET_CURRENT_TASK_SELECTED_ANSWER,
		currentTaskSelectedAnswerId
	};
}

export const setCurrentTask = (currentTaskId) => {
	return {
		type: SET_CURRENT_TASK,
		currentTaskId
	};
}
