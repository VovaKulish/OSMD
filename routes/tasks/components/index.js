import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TaskList from './taskList'
import { sorters, filters, filterTaskByTitle, setCurrentTaskOffset } from '../modules'

const mapStateToProps = (state) => {
    const { tasks, current, currentFilterValue,
        currentSorterValue, currentTitleFilter } = state.tasks;

    const currentFilter = filters.find((v) => v.title === currentFilterValue);
    const currentSorter = sorters.find((v) => v.title === currentSorterValue);
    return {
        tasks: currentSorter.action(
            currentFilter.action(
                filterTaskByTitle(tasks, currentTitleFilter)
            )
        ),
        current
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCurrentTask: (id) => dispatch(push({
            pathname: `/tasks/${id}`
        })),
        setCurrentOffset: (offset) => dispatch(setCurrentTaskOffset(offset))
    };
}

const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);

export default TaskListContainer;
