"use strict";

import React from 'react'

import TaskListContainer from '../tasks/components/'
import TaskViewContainer from '../tasks/taskView'
import TaskSearch from '../../components/taskSearch'

import '../../css/tasks.css'
import '../../css/currentTask.css'
import '../../css/votes.css'
import '../../css/rating.css'
import '../../css/tooltip.css'
import '../../css/tag.css'
import '../../css/autocomplete.css'
import '../../css/attachment.css'
import '../../css/questions.css'

export const TaskLayout = (props) => {

    return (
        <div>
            <main className="tasks">
                <TaskSearch />
                <section className="tasks-content">
                    <article className="tasks-list">
                        <TaskListContainer />
                    </article>
                    <TaskViewContainer />
                </section>
            </main>
        </div>
    );
}
