'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var TodoData = require('../api/todoData');
var ActionTypes = require('../constants/actionType');

var InitializeAction = {
	initApp: function () {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				todos: TodoData.todos
			}
		});
	}
};

module.exports = InitializeAction;