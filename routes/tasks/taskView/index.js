import React from 'react'
import { connect } from 'react-redux'
import { setCurrentTaskSelectedAnswer } from '../modules'
import TaskView from './taskView'

const mapStateToProps = (state) => {
    const { current, tasks, currentOffset } = state.tasks;
    return {
        task: current ? tasks.find((v) => v.id === current) : null,
        currentOffset
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedAnswer: (id) => dispatch(setCurrentTaskSelectedAnswer(id))
    };
}

const TaskViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskView);

export default TaskViewContainer;
