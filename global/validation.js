"use strict";

export const LOGIN = "login";
export const PASSWORD = "password";

const rules = {};

rules[LOGIN] = (val) => {
    if (!val) {
        return "Обов'язкове поле для заповнення";
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
        return "Невірний логін";
    }
    return '';
};

rules[PASSWORD] = (val) => {
    if (!val) {
        return "Обов'язкове поле для заповнення";
    }
    if (val.length < 4) {
        return "Пароль повинен бути не менше 4 символів";
    }
    return '';
};

export const validate = (field, value) => {
    return rules.hasOwnProperty(field) ?
        rules[field](value) :
        "Field validation unknown";
};