"use strict";

import React, { Component, PropTypes } from 'react';
import Tags from '../../components/tags';
import Tooltip from '../../components/tooltip';
import Attachments from '../../components/attachments';
import Questionary from '../../components/questionary';
import '../../css/addTask.css'

import { removeAttachment, addAttachments, finalizeAttachmentLoad } from '../modules';

const tags = ['безпека', 'двір', 'електроенергія', 'комунікації', 'під’їзд'];

const regex = /^([\u0400-\u04FFA-Za-z0-9]{1,20}[@#?\-\.\s]?){6,12}$/;
const valTxtInput = "Дозволені тільки цифри, літери та .-@#? символи";
const _tagsErr = 'Потрібно вибрати хоча б один тэг';
const _answersErr = 'Потрібно вибрати хоча б дві відповіді';

class AddTask extends Component {

    static propTypes = {
        question: PropTypes.string,
        possibleAnswers: PropTypes.arrayOf(PropTypes.string),
    }

    constructor(props) {
        super(props);

        this.state = {
            areTagsOpen: false,
            tagsAll: tags,
            tagsSelected: [],
            attachments: [],
            title: '',
            description: '',
            question: 'Чи потрібно нам виконувати цю задачу?',
            possibleAnswers: ['Так', 'Ні'],
            starWidth: 14,
            isVertical: true,

            titleField: {errors: '', isPristine: true},
            descriptionField: {errors: '', isPristine: true},
            questionField: {errors: '', isPristine: true},
            answersField: {errors: [], isPristine: true},
            tagsField: {errors: '', isPristine: true}
        };

        this.removeTag = this.removeTag.bind(this);
        this.addTag = this.addTag.bind(this);
        this.closeTags = this.closeTags.bind(this);
        this.updateTagField = this.updateTagField.bind(this);

        this.removeAttachment = this.removeAttachment.bind(this);
        this.addAttachments = this.addAttachments.bind(this);
        this.finalizeAttachmentLoad = this.finalizeAttachmentLoad.bind(this);

        this.addPossibleAnswer = this.addPossibleAnswer.bind(this);
        this.removePossibleAnswer = this.removePossibleAnswer.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentDidMount() {
        // after first mount when we already have first updated state
        // we make initial validation
        this.validateAllFields();
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        const {question, possibleAnswers} = props;

        if(question) {
            this.setState({question});
        }

        if(possibleAnswers && possibleAnswers.length > 0) {
            this.setState({possibleAnswers});
        }
    }

    validateText(val) {
        return regex.test(val) ? '' : valTxtInput;
    }

    validateTags(tags) {
        return tags.length > 0 ? '' : _tagsErr;
    }

    validateAnswers(answers) {
        if (answers.length < 2) {
            return [_answersErr];
        }

        return answers.map((v,i) => this.validateText(v));
    }

    // must be invoked on state
    // must not change Pristine status of fields as
    // it is used for initial validatiton as well
    validateAllFields() {
        const {question, title, description, tagsSelected,
            questionField, answersField, titleField, tagsField} = this.state;
        const {possibleAnswers} = this.props;

        const questionErr = this.validateText(question);
        const titleErr = this.validateText(title);
        const descriptionErr = this.validateText(description);
        const tagsErr = this.validateTags(tagsSelected);
        const answersErr = this.validateAnswers(possibleAnswers);

        this.setState({
          questionField: {
              errors: questionErr,
              isPristine: questionField.isPristine
          },
          titleField: {
              errors: titleErr,
              isPristine: titleField.isPristine
          },
          descriptionErr: {
              errors: descriptionErr,
              isPristine: descriptionErr.isPristine
          },
          tagsField: {
              errors: tagsErr,
              isPristine: tagsField.isPristine
          },
          answersField: {
              errors: answersErr,
              isPristine: answersField.isPristine
          }
        });

        return !(questionErr || titleErr || descriptionErr ||
            tagsErr || answersErr.find((v) => v));
    }

    updateDescription(val) {
        this.setState({
            description: val,
            descriptionField: {
                errors: this.validateText(val),
                isPristine: false
            }
        });
    }

    updateTitle(val) {
        this.setState({
            title: val,
            titleField: {
                errors: this.validateText(val),
                isPristine: false
            }
        });
    }

    updateTags(tags, areOpen) {
        if(tags !== this.state.tagsSelected) {
            this.setState({
                tagsSelected: tags
            });
        }

        this.setState({
            tagsField: {
                errors: this.validateTags(tags),
                isPristine: false
            },
            areTagsOpen: areOpen
        });
    }

    removeTag(idx) {
        const {tagsSelected} = this.state;

        let copy = tagsSelected.slice();
        copy.splice(idx, 1);
        this.updateTags(copy, false);
    }

    addTag(tag) {
        const {tagsSelected} = this.state;

        if (tagsSelected.indexOf(tag) > -1) {
            return false;
        }
        const copy = tagsSelected.concat([tag]);

        this.updateTags(copy, false);
        return true;
    }

    updateTagField() {
        this.updateTags(this.state.tagsSelected, true);
    }

    /**** Attachments ****/
    removeAttachment(name) {
        const {attachments} = this.state;
        this.setState({ attachments: removeAttachment(name, attachments) });
    }

    addAttachments(files) {
        const {attachments} = this.state;
        this.setState({ attachments: addAttachments(files, attachments) });
    }

    finalizeAttachmentLoad(fileName, dataUrl) {
        const {attachments} = this.state;
        this.setState({attachments: finalizeAttachmentLoad(fileName, dataUrl, attachments) });
        return true;
    }

    /**** Attachments ****/
    setAnswers(answers) {
        if(answers !== this.state.possibleAnswers) {
            this.setState({
                possibleAnswers: answers
            });
        }

        this.setState({
            answersField: {
                errors: this.validateAnswers(answers),
                isPristine: false
            }
        });
    }

    addPossibleAnswer() {
        const {possibleAnswers} = this.state;
        const copy = possibleAnswers[possibleAnswers.length - 1] ?
            possibleAnswers.concat(['']) : possibleAnswers;

        this.setAnswers(copy);
    }

    removePossibleAnswer(idx) {
        const {possibleAnswers} = this.state;
        const res = possibleAnswers
            .slice(0, idx)
            .concat(possibleAnswers.slice(idx + 1));

        this.setAnswers(res);
    }

    updateAnswer(val, idx) {
        const {possibleAnswers} = this.state;

        const res = possibleAnswers
            .slice(0, idx)
            .concat(val)
            .concat(possibleAnswers.slice(idx + 1));

        this.setAnswers(res);
    }

    updateQuestion(val) {
        this.setState({
            question: val,
            questionField: {
                errors: this.validateText(val),
                isPristine: false
            }
        });
    }

    onSubmit() {
        if(!this.validateAllFields()) {
            return;
        }

        //TODO: add real submit logic
    }

    closeTags() {
        this.setState({areTagsOpen: false});
    }

    render() {
        const {areTagsOpen, tagsAll, tagsSelected, question, isVertical, starWidth,
            attachments, possibleAnswers, title, description,
            questionField, titleField, descriptionField, tagsField,
            answersField} = this.state;

        const allPristine = questionField.isPristine &&
            titleField.isPristine && descriptionField.isPristine &&
            tagsField.isPristine && answersField.isPristine;

        const hasErrors = !!(questionField.errors || titleField.errors ||
            descriptionField.errors || tagsField.errors ||
            answersField.errors.find((v) => v));

        // we disable save button if everything we validate is pristine
        // or if we have any errors found
        const disableSave = allPristine || hasErrors;

        const errCls = 'inputError';

        const taskDescErr = !descriptionField.isPristine && descriptionField.errors ? errCls : '';
        const titleErr = !titleField.isPristine && titleField.errors;

        return (
            <main className="createtask"
                onClick={this.closeTags}>
                <section className="aside-line"></section>
                <section className="create-task-content">
                    <header className="create-task-header">
                        <h1>НОВА ЗАДАЧА</h1>
                        <span className="task-date">{(new Date()).toLocaleDateString()}</span>
                    </header>
                    <article className="new-task">
                        <section className="fields-desc">
                            <span>Назва задачі</span>
                        </section>
                        <section className="task-desc-name">
                        <input type="text"
                               className={titleErr ? errCls : ''}
                            value={title}
                            onChange={(e) => this.updateTitle(e.target.value)}
                        />
                        {
                            titleErr && (<div className="errorText">{titleField.errors}</div>)
                        }
                        </section>
                    </article>
                    <article className="keywords">
                        <section className="fields-desc">
                            <span>Ключові слова</span>
                            <Tooltip description="оберіть із списку ключові слова, які відповідають темі вашої задачі"/>
                        </section>
                        <section className="drop-down-tags">
                            <Tags
                                  isOpen={areTagsOpen}
                                  tagsAll={tagsAll}
                                  tagsSelected={tagsSelected}
                                  removeTag={this.removeTag}
                                  addTag={this.addTag}
                                  updateTagField={this.updateTagField}
                                  tagsField={tagsField}
                            />
                        </section>
                    </article>
                    <article className="task-desc">
                        <section className="fields-desc">
                            <span>Опис задачі</span>
                            <Tooltip description="опишіть вашу задачу"/>
                        </section>
                        <section className="add-task-desc">
                            <textarea
                                className={taskDescErr ? errCls : ''}
                                value={description}
                                onChange={(e) => this.updateDescription(e.target.value)}
                            />
                            {
                                taskDescErr && (<div className="errorText">{descriptionField.errors}</div>)
                            }
                            <Attachments
                                attachments={attachments}
                                removeAttachment={this.removeAttachment}
                                addAttachments={this.addAttachments}
                                finalizeAttachmentLoad={this.finalizeAttachmentLoad}
                            />
                        </section>

                    </article>
                    <Questionary
                        question={question}
                        possibleAnswers={possibleAnswers}
                        addPossibleAnswer={this.addPossibleAnswer}
                        removePossibleAnswer={this.removePossibleAnswer}
                        updateQuestion={this.updateQuestion}
                        updateAnswer={this.updateAnswer}
                        questionField={questionField}
                        answersField={answersField}
                    />
                    <button className="add-task"
                        disabled={disableSave}
                        onClick={this.onSubmit}
                    >
                        СТВОРИТИ ЗАДАЧУ
                    </button>
                </section>
            </main>
        );
    }
}

export default AddTask
