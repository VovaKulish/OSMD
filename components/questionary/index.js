"use strict";

import React, {Component, PropTypes} from 'react';

// TODO:
// add remove possible answer functionality after designer makes it
// add some sort of submit btn here to change parent state only once

class Questionary extends Component {

    static propTypes = {
        question: PropTypes.string,
        possibleAnswers: PropTypes.arrayOf(PropTypes.string),
        questionField: PropTypes.shape({
            isPristine: PropTypes.bool.isRequired,
            errors: PropTypes.string.isRequired
        }).isRequired,
        answersField: PropTypes.shape({
            isPristine: PropTypes.bool.isRequired,
            errors: PropTypes.arrayOf(PropTypes.string.isRequired)
        }).isRequired,

        addPossibleAnswer: PropTypes.func.isRequired,
        updateQuestion: PropTypes.func.isRequired,
        updateAnswer: PropTypes.func.isRequired,
        removePossibleAnswer: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.renderPossibleQuestions = this.renderPossibleQuestions.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        const {question, possibleAnswers} = this.props;
        return question !== nextProps.question || possibleAnswers !== nextProps.possibleAnswers;
    }

    renderPossibleQuestions() {
        const {possibleAnswers, updateAnswer, removePossibleAnswer, answersField} = this.props;
        const errCls = 'inputError';

        return possibleAnswers.map((v, i) => {
            const answersErr = !answersField.isPristine && answersField.errors[i];
            return (
                <section className="possible-questions-holder" key={'answer' + i}>
                    <input type="text"
                           className={answersErr ? errCls : ''}
                           value={v}
                           onChange={(e) => updateAnswer(e.target.value, i)}
                    />
                    {
                        answersErr && (<div className="errorText">{answersField.errors[i]}</div>)
                    }
                    <figure className="delete-question"
                            onClick={() => removePossibleAnswer(i)}
                    >
                        <span>X</span>
                    </figure>
                </section>
            );
        });
    }

    render() {
        const {addPossibleAnswer, question, updateQuestion, questionField} = this.props;
        const errCls = 'inputError';
        const questionErr = !questionField.isPristine && questionField.errors;

        return (
            <div className='questionary'>
                <article className="question-vote">
                    <section className="fields-desc">
                        <span>Питання до голосування</span>
                    </section>
                    <section className="question-field">
                        <input type="text"
                               className={questionErr ? errCls : ''}
                               value={question}
                               onChange={(e) => updateQuestion(e.target.value)}
                        />
                        {
                            !questionField.isPristine && questionField.errors &&
                            (<div className="errorText">{questionField.errors}</div>)
                        }
                    </section>
                </article>
                <article className="answers">
                    <section className="fields-desc">
                        <span>Варіанти відповідей</span>
                    </section>
                    <section className="add-answer-fields">

                        {this.renderPossibleQuestions()}

                        <a href="" onClick={(e) => {
                            e.preventDefault();
                            addPossibleAnswer();
                        }}>
                            <span>додати варіант</span>
                        </a>
                    </section>
                </article>
            </div>
        )
    }
}

export default Questionary;
