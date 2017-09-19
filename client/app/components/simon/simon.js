import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import simonComponent from './simon.component';

let simonModule = angular.module('simon', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('simon', {
      url: '/',
      component: 'simon'
    });
})

.component('simon', simonComponent)

.name;

export default simonModule;
