import React, {PureComponent, Component, PropTypes} from 'react'
import Priority from '../../../components/priority'
import Votes from '../../../components/votes'
import TaskVotingResults from '../../../components/votingResults'

class TaskView extends Component {
    static propTypes = {
        task: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            priority: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            votes: PropTypes.number.isRequired,
            totalVotes: PropTypes.number.isRequired,
            votingExpiryDate: PropTypes.instanceOf(Date).isRequired,
            question: PropTypes.string.isRequired,
            answers: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            })).isRequired,
            selectedAnswer: PropTypes.number
        }),

        currentOffset: PropTypes.number.isRequired,
        setSelectedAnswer: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.task === null) {
            return null;
        }

        const {
            title, priority, description, votes, totalVotes, question,
            answers, selectedAnswer, votingExpiryDate
        } = this.props.task;

        const expires = votingExpiryDate.toLocaleDateString();
        const style = { top: `${this.props.currentOffset}px` };

        return (
            <article className="task-desc" style={style}>
                <article className="task-wrapper">
                    <section className="task-name-desc">
                        <p className="task-name">{title}</p>
                        <p className="date">Голосування завершується {expires}</p>
                        <p className="task-description">{description}</p>
                    </section>
                    <section className="priority">
                        <p>пріоритет:</p>
                        <Priority
                            priority={priority}
                            starWidth={8}
                        />
                        <Votes
                            votes={votes}
                            totalVotes={totalVotes}
                        />
                    </section>
                </article>
                <TaskVotingResults
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    votingExpiryDate={votingExpiryDate}
                    question={question}
                    setSelectedAnswer={this.props.setSelectedAnswer}
                />
            </article>
        );
    }
}

export default TaskView
