'use strict';

/* App Module */

var TwitterApp = angular.module('twitter', [
  'ngRoute',
  'TwitterControllers',
  'TwitterFilters',
  'twitterServices',
  "chart.js"
]);


TwitterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/manage', {
        templateUrl: 'index',
        controller: 'addCntl'
      }).
      when('/playGolf', {
        templateUrl: 'partials/scoreCard.html',
        controller: 'scoreCardCntl'
      }).
      when('/list', {
        templateUrl: 'partials/messageList.html',
        controller: 'AnalyzeCntl'
      }).
      otherwise({
        redirectTo: '/manage'
      });
  }]);
  
  TwitterApp.all('/*', function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");
        response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
        next();

    });

