import angular from 'angular';
import Home from './home/home';
import Simon from './simon/simon';

let componentModule = angular.module('app.components', [
  Home,
  Simon
])

.name;

export default componentModule;
