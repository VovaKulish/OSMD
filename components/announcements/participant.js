import React, { PropTypes, Component } from 'react';

export default class Participant extends Component {
    static propTypes = {
        participant: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.participant !== nextProps.participant;
    }

    render() {
        return (
            <a href="">
                <span className="participant-name"> { this.props.participant } </span>
            </a>
        );
    }
}
