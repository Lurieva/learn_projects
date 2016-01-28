'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionType');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _todos = [
  { value:'todo1', done: false },
  { value:'todo2', done: false },
  { value:'todo3', done: true }
];

var TodoStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getTodos: function () {
    return _todos;
  }
});

Dispatcher.register(function (action) {
  switch (action.actionType) {
    case ActionTypes.ADD_TODO:
      _todos.push({
         value: action.data,
         done: false
      });
      TodoStore.emitChange();
      break;
    case ActionTypes.REMOVE_TODO:
      _todos.splice(action.data, 1);
      TodoStore.emitChange(); 
      break; 
    case ActionTypes.CHANGE_TODO:
      if (!_todos[action.data]) { return }
      _todos[action.data].done = !_todos[action.data].done
      TodoStore.emitChange(); 
      break;  
    default:
  } 
});

module.exports = TodoStore;