"use strict";

let baseUrl = (window.location.origin || '//' + window.location.host) + '/api/';

export default let ApiProvider = {

  fetchTasks(){
    return `${baseUrl}tasks/`;
  }

  createTask(){
    return `${baseUrl}createTask/`;
  }


  //TODO: add the rest later

};
