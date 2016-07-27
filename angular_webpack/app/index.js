import angular      from 'angular';
import uiRouter     from 'angular-ui-router';

import AppComponent from './app.component';

import NavigationComponent from './components/navigation/navigation';
import HomeComponent from './pages/home/home';


angular.module('app', [
        uiRouter,
        NavigationComponent.name,
        HomeComponent.name
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
        template: '<home></home>'
    })

    .state('app.service', {
        url: '/service',
        template: 'Service page'
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