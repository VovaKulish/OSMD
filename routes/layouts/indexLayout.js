/*
 * Created on 18.01.17.
 */

"use strict";

import React, {Component, PropTypes} from 'react'
import HeaderView from '../../components/header.js'
import {Notification} from '../../components/notification'
import '../../css/base.css'
import '../../css/background.css'

class IndexLayout extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <figure className="main-bg"></figure>
                <figure className="bg-cover"></figure>
                <HeaderView />
                <Notification />
                {this.props.children}
            </div>
        );
    }
}

export default IndexLayout