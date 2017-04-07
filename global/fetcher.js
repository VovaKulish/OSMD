"use strict";

import ApiProvider from './apiProvider'

const _prepareHeaders = (needsAuthorization, _headers) => {
  const headers = new Headers(_headers || {});

  if (!headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json; charset=utf-8');
  }

  if (!headers.has('Accept')) {
    headers.append('Accept', 'application/json');
  }

  if (needsAuthorization) {
    //TODO: implement and use special class token provider
    headers.append('Authorization', window.localStorage.getItem('token'));
  }

  return headers;
};

const _prepareData = (method, headers, needsAuthorization, body) => {
  let data = {
    method,
    headers: _prepareHeaders(needsAuthorization, headers)
  };

  if (typeof body == 'string') {
    data.body = body
  } else if (body) {
    data.body = JSON.stringify(body);
  }

  return data;
};

const _obj2String = (body) => Object.keys(body).map((key) => `${key}=${encodeURIComponent(body[key])}`).join('&');


export let Fetcher = {
  fetchTasks(headers) {
    return fetch(ApiProvider.fetchTasks(),
      _prepareData('get', headers, false)
    );
},

  createTask(body, headers) {
    return fetch(ApiProvider.createTask(),
      _prepareData('post', headers, false, body)
    );
  }
};