import angular      from 'angular';
import uiRouter     from 'angular-ui-router';

import AppComponent from './app.component';

import NavigationComponent from './components/navigation/navigation';



angular.module('app', [
        uiRouter,
        NavigationComponent.name
    ])
    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
    "ngInject";

$stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        template: '<app></app>'
    })

    .state('app.home', {
        url: '/home',
        template: 'Home page'
    })

    .state('app.create', {
        url: '/create',
        template: 'Create page'
    })

    .state('app.faq', {
        url: '/faq',
        template: 'Faq page'
    })

    .state('app.products', {
        url: '/products',
        template: 'Products Page'
    });

// Default page for the router
$urlRouterProvider.otherwise('/app/home');
})

.component('app', AppComponent);