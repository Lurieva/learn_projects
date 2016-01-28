'use strict';

var React = require('react');
var ListTodoItem = require('./listTodoItems');
var TodoStore = require('../store/todoStore');
var TodoActions = require('../actions/todoActions');

var TodoApp = React.createClass({
	getInitialState: function () {
		return {
			todos: TodoStore.getTodos()
		}
	},

	componentDidMount: function () {
		TodoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		TodoStore.removeChangeListener(this._onChange);
	},

	addTodo: function (inputValue) {
		TodoActions.addTodo(this.state.inputValue);
	},

	removeTodo: function (index) {
		TodoActions.removeTodo(index);
	},

	_onChange: function () {
		this.setState({
			todos: TodoStore.getTodos()
		});
	},

	setInputState: function (event) {
		this.setState({ 
			inputValue: event.target.value
		});
	},

	changeTodo: function (index) {
		TodoActions.changeTodo(index);
	},

	setInputNull: function (event) {
		this.setState({ 
			inputValue: ''
		});
	},


	render: function () {
		var todos = this.state.todos.map(function (item, i) {
			return (<ListTodoItem
				key={i}
				value={item.value}
				done={item.done}
				removeTodo={this.removeTodo.bind(this, i)}
				changeTodo={this.changeTodo.bind(this, i)} />);
		}.bind(this));

		return (
			<div className='container-fluid'>
				<div className='col-md-4'>
					<h1>Todo React example</h1>
					<div className='input-group'>
						<label htmlFor='todoInput'></label>
						<input type='text' 
							value={this.state.inputValue}
							onChange={this.setInputState}
							onFocus={this.setInputNull}
							autoFocus={true}
							className='form-control'
							placeholder='Todo' />
						<span className='input-group-btn'> 
							<button className='btn btn-primary' onClick={this.addTodo}>Add Todo</button>
						</span>
					</div>
					{todos}
				</div>
			</div>
		);
	}
});

module.exports = TodoApp;