/*
 * Created on 18.01.17.
 */

"use strict";

import React, {Component, PropTypes} from 'react'
import '../../css/recover.css'
import '../../css/base.css'
import '../../css/background.css'

class RecoverView extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <main className="login-main">
                <figure className="main-bg"></figure>
                <figure className="bg-cover"></figure>
                <article className="holder">
                    <section>
                        <figure className="login-logo"></figure>
                    </section>
                    <section className="recovery-change-pass">
                        <header>СТВОРЕННЯ НОВОГО ПАРОЛЮ</header>
                        <p className="new-pass">Створіть новий пароль:</p>
                        <input type="text" />
                        <span>мінімум 8 символів</span>
                        <p className="new-pass-repeat">Продублюйте новий пароль:</p>
                        <input type="text" />
                        <button className="confirm-recovery-button">ПІДТВЕРДИТИ</button>
                    </section>
                </article>
            </main>
        );
    }
}

export default RecoverView