"use strict";

import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import HomeIcon from '../components/icons/homeIcon'
import TasksIcon from '../components/icons/tasksIcon'
import CreateTaskIcon from '../components/icons/createTaskIcon'

const homeIndex = 1,
    taskIndex = 2,
    createTaskIndex = 3;

class HeaderView extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            currSelected: -1,
            currHover: -1
        };

        this.onClickHandle = this.onClickHandle.bind(this);
        this.onHoverHandle = this.onHoverHandle.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currSelected !== nextState.currSelected ||
            this.state.currHover !== nextState.currHover;
    }

    onHoverHandle(it) {
        this.setState({currHover: it});
    }

    onClickHandle(it) {
        this.setState({currSelected: it});
    }

    render() {
        const {currSelected, currHover} = this.state;

        return (
            <main className="header-main">
                <article className="header-bg">
                    <section className="main__left-side">
                        <Link to='/main'
                              onClick={((e) => {
                                  e.preventDefault(); // TODO: remove this line after testing style change to enable navigation
                                  this.onClickHandle(homeIndex);
                              })}
                              onMouseEnter={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(homeIndex);
                              })}
                              onMouseLeave={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(-1);
                              })}
                        >
                            <HomeIcon
                                isActive={currSelected === homeIndex || currHover === homeIndex}
                            />
                        </Link>

                        <Link to='/task'
                              onClick={((e) => {
                                  e.preventDefault(); // TODO: remove this line after testing style change to enable navigation
                                  this.onClickHandle(taskIndex);
                              })}
                              onMouseEnter={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(taskIndex);
                              })}
                              onMouseLeave={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(-1);
                              })}
                        >
                            <TasksIcon
                                isActive={currSelected === taskIndex || currHover === taskIndex}
                            />
                        </Link>

                        <Link to='/create_task'
                              onClick={((e) => {
                                  e.preventDefault(); // TODO: remove this line after testing style change to enable navigation
                                  this.onClickHandle(createTaskIndex);
                              })}
                              onMouseEnter={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(createTaskIndex);
                              })}
                              onMouseLeave={((e) => {
                                  e.preventDefault();
                                  this.onHoverHandle(-1);
                              })}
                        >
                            <CreateTaskIcon
                                isActive={currSelected === createTaskIndex || currHover === createTaskIndex}
                            />
                        </Link>

                    </section>
                    <section className="main__right-side logged-in">
                        <img src={require("../assets/logoHomebranded.svg")} className="logo"></img>
                    </section>
                </article>
            </main>
        );
    }
}

export default HeaderView