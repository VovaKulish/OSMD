"use strict";

export const getJson = (file, success, error) => {

	if (!file) {
		return {};
	}

	let request = {
		method: 'get',
		headers: new Headers({
			'Content-Type': 'application/json; charset=utf-8'
		}),
		cors: true
	};

	fetch('../' + file, request)
		.then(res  => {
			if(res.ok){
				res.json().then(payload => {
					success && success(payload);
				});
				
				return;
			}

			error && error(res.statusText);
		})
		.catch(err => {
			alert(err); //TODO import global notification component and use it here instead.
		})
};