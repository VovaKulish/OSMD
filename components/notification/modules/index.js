"use strict";

const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";


export const showNotification = (message, isError) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: {message, isError}
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION
  };
};

const ACTION_HANDLERS = {
  [SHOW_NOTIFICATION]: (state, action) => {
    const {message, isError} = action.payload;
    return Object.assign({}, state, {message, isError, isOpen: true});
  },

  [HIDE_NOTIFICATION]: (state, action) => Object.assign({}, state, {message: '', isOpen: false})
};

const _initState = {
  error: "",
  isError: false,
  isOpen: false
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function notification(state = _initState, action) {
  const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
