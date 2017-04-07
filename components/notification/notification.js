 "use strict";

 import React, {Component, PropTypes} from 'react'
 
 class NotificationPage extends Component {

 	static propTypes = {
 		isOpen: PropTypes.bool,
 		message: PropTypes.string,
 		isError: PropTypes.bool,

 		hide: PropTypes.func.isRequired
 	}

 	constructor(props){
 		super(props);
 	}

 	componentWillReceiveProps(nextProps){
 		nextProps.isOpen && setTimeout(this.props.hide, 5000);
 	}

 	shouldComponentUpdate(nextProps, nextState){
 		const {isOpen, message, isError} = nextProps;

 		return isOpen !== this.props.isOpen || 
			message !== this.props.message ||
 			isError !== this.props.isError;
 	}

 	render() {
		const {isOpen, message, isError} = this.props;

		if (!isOpen) {
			return null;
		}

 		var style = {
 			'backgroundColor': isError ? '#ef5350' : '#66BB6A'
 		};

 		return (
 			<div className='snack-bar'
 				style={style}
			>
 				<span> {message} </span>
 			</div>
		)
 	}
 }

export default NotificationPage;