"use strict";

import React, {Component, PropTypes} from 'react'
import Priority from '../../../components/priority'
import Tag from '../../../components/tags/tag'
import Votes from '../../../components/votes'

class TaskItem extends Component {

    static propTypes = {
        task: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            priority: PropTypes.number.isRequired,
            status: PropTypes.shape({
                title: PropTypes.string.isRequired,
                priority: PropTypes.number.isRequired
            }).isRequired,
            votes: PropTypes.number,
            totalVotes: PropTypes.number,
            tags: PropTypes.arrayOf(PropTypes.string.isRequired)
        }).isRequired,

        isActive: PropTypes.bool,
        openCurrentTask: PropTypes.func.isRequired,
        setCurrentOffset: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateOffset();
    }

    shouldComponentUpdate(nextProps) {
        const { task, isActive } = this.props;
        return isActive !== nextProps.isActive || task !== nextProps.task;
    }

    componentDidUpdate() {
        this.updateOffset();
    }

    updateOffset = () => {
        const body = this.refs.taskBody;
        const { isActive, setCurrentOffset } = this.props;
        isActive && setCurrentOffset(body.offsetTop + body.clientHeight + 10); //10 - margin
    }

    render() {
        const { task: { id, priority, date, status, title, tags, votes, totalVotes }, openCurrentTask, isActive } = this.props;

        // TODO: hasAlreadyVoted должно показывать галку возле статуса

        return (
            <section className={isActive ? 'task active active-task' : 'task'}
                ref="taskBody"
                onClick={(e) => {
                    e.stopPropagation();
                    openCurrentTask(id);
                }}
            >
                <Priority
                    isEditing={false}
                    isVertical={true}
                    priority={priority}
                    starWidth={8}
                />
                <article className="task-main">
                    <p className="date">{date}</p>
                    <p className="status active"><span>{status.title}</span></p>
                    <p className="task-name">{title}</p>
                    <div className="tags">
                        {
                            tags.map((v, i) => {
                                return (<Tag tag={v} key={i}/>);
                            })
                        }
                    </div>
                    <Votes
                        votes={votes}
                        totalVotes={totalVotes}
                    />
                </article>

            </section>
        );
    }
}

export default TaskItem
