"use strict";

import {connect} from 'react-redux'
import NotificationPage from './notification'
import {hideNotification} from './modules'

const mapStateToProps = (state) => {
  const {isError, message, isOpen} = state.notification;

  return {isError, message, isOpen};
};

const mapDispatchToProps = (dispatch) => {
  return {
  	hide: () => {
  		dispatch(hideNotification());
  	}
  };
};

export const Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationPage);