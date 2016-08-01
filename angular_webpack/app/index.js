import angular      from 'angular';
import uiRouter     from 'angular-ui-router';
import ngAnimate    from 'angular-animate';

import AppComponent from './app.component';

import NavigationComponent from './components/navigation/navigation';
import HomeComponent       from './pages/home/home';
import SigninComponent     from './pages/signin/signin';
import ProductsComponent   from './pages/products/products';

import UserService         from './services/user.service';

angular.module('app', [
        uiRouter,
        NavigationComponent.name,
        HomeComponent.name,
        SigninComponent.name,
        ProductsComponent.name
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
        template: '<products></products>'
    })

    .state('app.signin', {
        url: '/signin',
        template: '<signin></signin>'
    });

// Default page for the router
$urlRouterProvider.otherwise('/app/home');
})

.component('app', AppComponent)
.factory('UserService', UserService);
