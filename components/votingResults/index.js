import React, {PureComponent, PropTypes} from 'react'

class TaskVotingResults extends PureComponent {
    static propTypes = {
        votingExpiryDate: PropTypes.instanceOf(Date).isRequired,
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        })).isRequired,
        selectedAnswer: PropTypes.number,

        setSelectedAnswer: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isAlreadySelected: false,
            current: null
        };
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState = (props) => {
        const {votingExpiryDate, selectedAnswer} = props;
        const isAlreadySelected = votingExpiryDate < Date.now() || selectedAnswer > -1;
        this.setState({isAlreadySelected, current: selectedAnswer});
    }

    toggleMode = (val) => this.setState({isAlreadySelected: val});

    changeCurrent = (id) => this.setState({current: id});

    render() {
        const {question, answers, selectedAnswer, votingExpiryDate, setSelectedAnswer} = this.props;
        const {isAlreadySelected, current} = this.state;

        let selected = null;

        if(current > -1) {
            selected = answers.find((v) => {
                return v.id === current
            });
        }

        return isAlreadySelected ? (
            <article className="voted">
                <p className="your-choice">
                    Ваш вибір: <span>{selected.title}</span>
                </p>
                <p className="change-vote"
                    onClick={() => this.toggleMode(false)}
                >
                    змінити
                </p>
            </article>
        ) : (
            <article className="changing-vote">
                <p className="chose-your-variant">{question}</p>
                <section className="answers">
                    {
                        answers.map((v, i) => (
                            <p key={'answer' + i}>
                                <input type='radio'
                                    className="radio"
                                    value={v.id}
                                    checked={v.id === current}
                                    onChange={() => this.changeCurrent(v.id)}
                                />
                                <span> {v.title} </span>
                            </p>
                        ))
                    }
                </section>
                <p className="change-vote" onClick={() => setSelectedAnswer(current)}>
                    ГОЛОСУВАТИ
                </p>
            </article>
        );
    }
}

export default TaskVotingResults
