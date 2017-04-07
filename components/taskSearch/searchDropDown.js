"use strict";

import React, { Component, PropTypes } from 'react'

class SearchDropDown extends Component{

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            action: PropTypes.func
        })).isRequired,
        current: PropTypes.string.isRequired,
        isExpanded: PropTypes.bool,

        setCurrentFilter: PropTypes.func.isRequired,
        sortByFirstPlace: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };

        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    componentWillMount() {
        this.setState({isExpanded: this.props.isExpanded});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isExpanded: nextProps.isExpanded});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isExpanded !== nextState.isExpanded ||
            this.props.current !== nextProps.current;
    }

    toggleExpanded() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const cls = this.state.isExpanded ? 'search-ddl expanded' : 'search-ddl';
        const { filters, setCurrentFilter, sortByFirstPlace, current } = this.props;

        return (
            <section>
                <ul className={ cls }>
                    { sortByFirstPlace(filters, current).map((v, i) => (
                        <li
                            key={ i }
                            value={ i }
                            onClick={() => setCurrentFilter(v.title)}
                        > { v.title } </li>)
                    )}
                </ul>
                <figure className="drop-down-icon" onClick={this.toggleExpanded}></figure>
            </section>
        );
    }
};

export default SearchDropDown;
