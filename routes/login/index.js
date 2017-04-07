/*
 * Created on 18.01.17.
 */

"use strict";

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {LOGIN, PASSWORD, validate} from '../../global/validation'
import {Notification} from '../../components/notification'
import {showNotification} from '../../components/notification/modules'
import {getJson} from '../../global/getJson'
import '../../css/login.css'
import '../../css/base.css'
import '../../css/background.css'

class LoginView extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);
        this._onSubmitSuccess = this._onSubmitSuccess.bind(this);
        this._onSubmitError = this._onSubmitError.bind(this);

        this.state = {
            login: {value: '', error: ''},
            password: {value: '', error: ''}
        };
    }

    _onSubmitSuccess(res) {
        const {login : {value : login}, password : {value : password}} = this.state;

        //immitates result.ok and data accepted on server
        if (login === res.correct.login && password === res.correct.password) {
            //TODO: uncomment router navigation and delete notification later
            this.props.dispatch(showNotification('allRight', false));
            //this.props.router.push('/main');
            return;
        }

        //immitates result not ok and data validation failed on server
        if (login === res.wrong.login || password === res.wrong.password) {
            this.setState({
                login: {value: login, error: "Неправильний логін"},
                password: {value: password, error: "Неправильний пароль"}
            });
            return;
        }

        if (login === res.error.login || password === res.error.password) {
            //we do not set state here. This block immitates server error, like 500
            //TODO: it should be displayed with global notification mechanism
            this.props.dispatch(showNotification('Server error', true));
        }
    }

    //TODO: use it instead hardcode checking error in success when API is ready
    _onSubmitError(err) {
        console.log(err);
    }

    updateField(field, val) {
        let err = validate(field, val);
        this.setState({
            [field]: {value: val, error: err}
        });
    }

    render() {
        const {login, password} = this.state;

        let errCls = 'inputError';
        let logErr = login.error ? errCls : '';
        let passErr = password.error ? errCls : '';
        //empty fields or validation errors
        let hasErrors = login.error || password.error || !login.value || !password.value;

        return (
            <main className="login-main">
                <figure className="main-bg"></figure>
                <figure className="bg-cover"></figure>
                <article className="holder">
                    <section>
                        <figure className="login-logo"></figure>
                    </section>
                    <section className="login">
                        <form className="login-form">
                            <header>ВХІД ДО АКАУНТУ</header>
                            <span className="recovery-alert">Пароль успішно створено!</span>
                            <input
                                className={logErr}
                                value={login.value}
                                type="email"
                                placeholder='Логін'
                                onChange={(e) => {
                                    this.updateField(LOGIN, e.target.value);
                                }}
                            />
                            <span className='errorText'>{login.error}</span>
                            <input
                                className={passErr}
                                value={password.value}
                                placeholder='Пароль'
                                type="password"
                                onChange={(e) => {
                                    this.updateField(PASSWORD, e.target.value);
                                }}
                            />
                            <span className='errorText'>{password.error}</span>
                            <button
                                disabled={hasErrors}
                                className={"login-button " + (hasErrors ? 'btn-disabled' : '')}
                                onClick={((e) => {
                                    e.preventDefault();
                                    getJson('passlogs.json', this._onSubmitSuccess, this._onSubmitError);
                                })}
                            >УВІЙТИ
                            </button>
                            <p>
                                <a className="recover-account" href="">Забули пароль?</a>
                            </p>
                        </form>
                    </section>
                    <section className="recovery-notification">
                        <header>ВІДНОВЛЕННЯ ПАРОЛЮ</header>
                        <p className="recovery-notification-main">На вашу електронну адресу було
                            відправлено посилання для
                            відновлення паролю.
                            <span className="recovery-notification-add">
                                Перевірте пошту та перейдіть
                                за посиланням
                            </span>
                        </p>
                    </section>
                    <section className="recovery-send-email">
                        <header>ВІДНОВЛЕННЯ ПАРОЛЮ</header>
                        <p className="recovery-send-notification">Введіть адресу вашої електронної пошти:</p>
                        <input type="email" />
                        <button className="recovery-button">ВІДПРАВИТИ</button>
                    </section>
                </article>
                <Notification />
            </main>
        );
    }
}

export default connect()(LoginView);