/*
 * Created on 18.01.17.
 */
 
"use strict";

function thunk() {
  return ({dispatch, getState}) => next => action => {
    const { promise, types, ...rest } = action;

    /* redux-thunk substitution. without extra argument possibility */

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    if (!promise) {
      return next(action);
    }

    /* redux-thunk substitution. without extra argument possibility */

    const [REQUEST, SUCCESS, FAILURE] = types;

    if (rest.reducer && getState()[rest.reducer] && getState()[rest.reducer].isDataFetching) {
      return;
    }

    next({ ...rest, type: REQUEST });

    return promise.then(
      (result) => {
        if (result instanceof Response) {

        	//if result is not ok, but status === 200 - it means that it's a handled validation error
  			var type = result.ok ? SUCCESS : result.status === 200 ? FAILURE : null;

  			if(!type) {
  				let dafaultErrorText = "Nope, not fuc'n working at all";
  				  alert(payload.error || result.statusText || dafaultErrorText);
  			}

	        if(result.headers.get('Content-Type') === 'application/json; charset=utf-8'){
	            return result.json().then(payload => {
	              next({ ...rest, payload, type });
	            });
	        };

	        if(result.headers.get('Content-Type').includes('image')){
	            return result.blob().then((payload) => {              
	              next({ ...rest, payload, type });
	            });
	        }

	        //TODO: add another type handlers if needed or remove not needed ones
        }
      },
      (error) => {
        alert(error);
      }
    );
  };
}

export default thunk()
