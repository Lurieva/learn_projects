'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
	<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')} />
		<Route name="authors" handler={require('./components/authors/authorsPage')} />
		<Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorsPage')} />
		<Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorsPage')} />
		<Route name="about" handler={require('./components/about/aboutPage')} />
		<NotFoundRoute handler={require('./components/common/notFoundPage')} />
		<Redirect from="about-us" to="about" />
		<Redirect from="awthors" to="authors" />
		<Redirect from="about/*" to="about" />
	</Route>
);

module.exports = routes;