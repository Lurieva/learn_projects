'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionType');

var TodoActions = {
  addTodo: function (todo) {
    Dispatcher.dispatch({
      actionType: ActionTypes.ADD_TODO,
      data: todo
    });
  },

  removeTodo: function (index) {
    Dispatcher.dispatch({
      actionType: ActionTypes.REMOVE_TODO,
      data: index
    });
  },

  changeTodo: function (index) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_TODO,
      data: index
    });
  }

};

module.exports = TodoActions;