'use strict';

var React = require('react');
var Link = require('react-router').Link;
var AuthorAction = require('../../actions/authorAction');
var AuthorStore = require('../../stores/authorStore');
var AuthorsList = require('./authorsList');

var AuthorsPage = React.createClass({
	getInitialState: function () {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function () {
		AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},

	render: function () {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<AuthorsList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorsPage;
