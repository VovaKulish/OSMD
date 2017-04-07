import React, { Component, PropTypes } from 'react';

export default class NewsItem extends Component {

    static propTypes = {
        newsItem: PropTypes.shape({
            title: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired // might be html string
        }).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isExpanded !== nextState.isExpanded ||
            this.props.newsItem !== nextProps.newsItem;
    }
    toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });

    render() {
        const { title, message } = this.props.newsItem;
        const { isExpanded } = this.state;

        const btnActionText = isExpanded ? 'менше' : 'більше';
        const articleClass = isExpanded ? 'expanded' : '';

        return (
            <article className={ articleClass }>
                <h3> { title } </h3>

                <p className='global-ads__first'
                    dangerouslySetInnerHTML={{ __html: decodeURIComponent(message) }}>
                </p>
                <span onClick={() => this.toggleExpanded()}> { btnActionText } </span>
            </article>
        );
    }
}