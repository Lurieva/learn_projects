'use strict';

var React = require('react');
var ListTodoItem = require('./listTodoItems')

var TodoApp = React.createClass({
	getInitialState: function () {
		return {
			todos: [
				{ value:'todo1', done: false },
				{ value:'todo2', done: false },
				{ value:'todo3', done: true }
			]
		}
	},

	setTodoState: function (event) {
		this.setState({ 
			inputValue: event.target.value
		});
	},

	removeTodo: function (i) {
		this.state.todos.splice(i, 1);
		this.setState({
			todos: this.state.todos
		});
	},

	addTodo: function (event) {
		var todos = this.state.todos;
		todos.push({
			value: this.state.inputValue,
			done: false
		});

		this.setState({
			todos: todos,
			inputValue: ''
		});
		event.stopPropagation();
	},

	editTodo: function (i) {
		var todos = this.state.todos;
		this.setState({
			inputValue: todos[i].value
		});
	},

	changeTodo: function (i) {
		var todos = this.state.todos;
		var todo = this.state.todos[i];
		if (!todo) {
			return;
		}
        todo.done = !todo.done;
        this.setState({ todos: todos });
	},

	render: function () {
		var todos = this.state.todos.map(function (item, i) {
			return (<ListTodoItem
				value={item.value}
				done={item.done}
				removeTodo={this.removeTodo.bind(this, i)}
				changeTodo={this.changeTodo.bind(this, i)}
				editTodo={this.editTodo.bind(this, i)} />);
		}.bind(this));

		return (
			<div className='container-fluid'>
				<div className='col-md-4'>
					<h1>Todo React example</h1>
					<div className='input-group'>
						<label htmlFor='todoInput'></label>
						<input type='text' 
							value={this.state.inputValue}
							onChange={this.setTodoState}
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