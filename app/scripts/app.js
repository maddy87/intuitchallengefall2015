'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html',controller:'OverviewCtrl', data: {text: "Overview", visible: true } } },
        { name: 'reports', state: { url: '/reports/:age/:income', parent: 'dashboard', templateUrl: 'views/dashboard/reports.html',controller:'ReportsCtrl', data: {text: "Reports", visible: true } } },
        { name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }
    ];

angular.module('yapp', [
                'ui.router',
                'snap',
                'ngAnimate',
                'zingchart-angularjs'
            ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/dashboard', '/dashboard/reports');
            $urlRouterProvider.otherwise('/login');

            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        });
