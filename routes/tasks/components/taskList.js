"use strict";

import React, { PropTypes } from 'react'
import TaskItem from './taskItem'

const TaskList = (props) => {
    const { tasks, current, openCurrentTask, setCurrentOffset } = props;
    return (
        <div>
            {
                tasks.map((v, i) => {
                    return (
                        <TaskItem
                            key={ i }
                            isActive={ current === v.id }
                            task={ v }
                            openCurrentTask={ openCurrentTask }
                            setCurrentOffset={ setCurrentOffset }
                        />
                    );
                })
            }
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
    openCurrentTask: PropTypes.func.isRequired,
    setCurrentOffset: PropTypes.func.isRequired
};

export default TaskList
