"use strict";

import React, {Component, PropTypes} from 'react'

class Tooltip extends Component {

    static propTypes = {
        description: PropTypes.string.isRequired
    }

    constructor(props){
        super(props);
    }

    render() {
        const {description} = this.props;
        const insideTooltip = '?';

        return (
            <section className="tooltip">
            <figure><span>{insideTooltip}</span></figure>
                <article className="tooltip-desc">{description}</article>
            </section>
        )
    }
}

export default Tooltip;