import React from 'react'
import { connect } from 'react-redux'
import TaskSearch from './taskSearch'
import { sorters, filters, filterTaskByTitle, sortByFirstPlace, setTaskFilters } from '../../routes/tasks/modules'

const mapStateToProps = (state) => {
    const { currentFilterValue, currentSorterValue, currentTitleFilter } = state.tasks;
    return {
        filters,
        sorters,
        filterValue: currentFilterValue,
        sorterValue: currentSorterValue,
        titleFilter: currentTitleFilter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTaskFilters: (currentSorterValue, currentFilterValue, currentTitleFilter) => dispatch(setTaskFilters({
            currentSorterValue, currentFilterValue, currentTitleFilter
        })),
        sortByFirstPlace
    };
}

const TaskSearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskSearch);

export default TaskSearchContainer;
