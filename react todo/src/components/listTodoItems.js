'use strict';

var React = require('react');

var ListTodoItem = React.createClass({
	render: function () {
		var defaultClass = 'list-group-item';
		defaultClass += this.props.done ? ' list-group-item-success' : ' list-group-item-warning';
		
		return (
			<li className={defaultClass} 
				onClick={this.props.changeTodo}>
				<span className="badge" onClick={this.props.removeTodo}>&times;</span>
				{this.props.value}
			</li>
		);
	}
});

module.exports = ListTodoItem;