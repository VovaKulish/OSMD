"use strict";

import React, { Component, PropTypes } from 'react'
import SearchDropDown from './searchDropDown'

class TaskSearch extends Component {

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            action: PropTypes.func
        })).isRequired,

        sorters: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            action: PropTypes.func
        })).isRequired,

        sorterValue: PropTypes.string.isRequired,
        filterValue: PropTypes.string.isRequired,

        titleFilter: PropTypes.string.isRequired,

        setTaskFilters: PropTypes.func.isRequired,
        sortByFirstPlace: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            sorterValue: '',
            filterValue: '',
            titleFilter: ''
        };

        this.updateTitleFilter = this.updateTitleFilter.bind(this);
        this.updateSorter = this.updateSorter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        const { filterValue, sorterValue, titleFilter } = this.props;
        this.setState({ filterValue, sorterValue, titleFilter });
    }

    componentWillReceiveProps(nextProps) {
        const { filterValue, sorterValue, titleFilter } = nextProps;
        this.setState({ filterValue, sorterValue, titleFilter });
    }

    updateTitleFilter(text) {
        this.setState({ titleFilter: text });
    }

    updateSorter(title) {
        this.setState({ sorterValue: title })
    }

    updateFilter(title) {
        this.setState({ filterValue: title })
    }

    render() {
        const { filters, sorters, sortByFirstPlace, setTaskFilters } = this.props;
        const { filterValue, sorterValue, titleFilter } = this.state;

        return (
            <section className="search">
                <article className="search-flex">
                    <input className="search-field" type="text"
                        onChange={(e) => this.updateTitleFilter(e.target.value)}
                    />
                    <button className="search-button"
                        onClick={() => {
                            setTaskFilters(sorterValue, filterValue, titleFilter);
                        }}
                    >
                        <span> ПОШУК </span>
                    </button>
                </article>
                <article className="sort-tasks">
                    <section className="first-drop-down">
                        <SearchDropDown
                            filters={ sorters }
                            current={ sorterValue }
                            sortByFirstPlace={ sortByFirstPlace }
                            setCurrentFilter={ this.updateSorter }
                            isExpanded={ false }
                        />
                    </section>
                    <section className="second-drop-down">
                        <SearchDropDown
                            filters={ filters }
                            current={ filterValue }
                            sortByFirstPlace={ sortByFirstPlace }
                            setCurrentFilter={ this.updateFilter }
                            isExpanded={ false }
                        />
                    </section>
                </article>
            </section>
        );
    }
};

export default TaskSearch;
