import React, { PropTypes, Component } from 'react';
import Attachments from '../../components/attachments';

const _minMessageLength = 50;
const _messagePlaceholder = `додайте текст оголошення
    (мінімум ${_minMessageLength} символів)`;

export default class Editor extends Component {
    static propTypes = {
        types: PropTypes.arrayOf(PropTypes.string.isRequired),
        addAnnouncement: PropTypes.func.isRequired,

        removeAttachment: PropTypes.func.isRequired,
        addAttachments: PropTypes.func.isRequired,
        finalizeAttachmentLoad: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            type: 0,
            message: '',
            attachments: []
        }

        this.removeAttachment = this.removeAttachment.bind(this);
        this.addAttachments = this.addAttachments.bind(this);
        this.finalizeAttachmentLoad = this.finalizeAttachmentLoad.bind(this);

        this.updateType = this.updateType.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { type, message, attachments } = this.state;
        return type !== nextState.type ||
            message !== nextState.message ||
            attachments !== nextState.attachments;
    }

    /**** Attachments ****/
    removeAttachment(name) {
        const { attachments } = this.state;
        this.setState({ attachments: this.props.removeAttachment(name, attachments) });
    }

    addAttachments(files) {
        const { attachments } = this.state;
        this.setState({ attachments: this.props.addAttachments(files, attachments) });
    }

    finalizeAttachmentLoad(fileName, dataUrl) {
        const { attachments } = this.state;
        this.setState({attachments: this.props.finalizeAttachmentLoad(
            fileName, dataUrl, attachments)
        });
        return true;
    }
    /**** Attachments ****/

    updateType(idx) {
        this.setState({type: idx});
    }

    updateMessage(message) {
        this.setState({message});
    }

    render() {
        const { addAnnouncement, types } = this.props;
        const { attachments, type, message } = this.state;

        return (
            <article className="add-new-ads">
                <article className="chose-type-ad">
                    {
                        types.map((v, i) => {
                            return (
                                <section key={ i }>
                                    <label htmlFor={v + i}>{ v }</label>
                                    <input id={v + i} checked={ type === i }
                                        type="radio" name="ad-type"
                                        onChange={() => this.updateType(i)}
                                    />
                                </section>
                            );
                        })
                    }
                </article>
                <textarea className="add-text"
                    placeholder={ _messagePlaceholder } type="text"
                    value={ message }
                    onChange={ (e) => this.updateMessage(e.target.value) }
                />
                <article className="add-new-ad">
                    <Attachments
                        attachments={attachments}
                        removeAttachment={this.removeAttachment}
                        addAttachments={this.addAttachments}
                        finalizeAttachmentLoad={this.finalizeAttachmentLoad}
                    />
                    <button className="add-button"
                        disabled={ message.length < _minMessageLength }
                        onClick={ () => addAnnouncement({
                            type,
                            message,
                            attachments: attachments.map((v) => {
                                return {
                                    //TODO: rework. it can take only from assets folder right now
                                    url: v.file.name,
                                    mimetype: v.file.type
                                };
                            })
                        })}
                    > ДОДАТИ </button>
                </article>
            </article>
        );
    }
}
