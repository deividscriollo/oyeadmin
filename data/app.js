// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngAnimate']);
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
        })
        // route para los programas
        .when('/programas', {
            templateUrl : 'data/programas/app.html',
            controller  : 'programasController'
        })
        // proceso reportes
        .when('/reportes', {
            templateUrl : 'data/reportes/app.html',
            controller  : 'reportesController',
        })
        // route for the contact page
        .when('/procesos', {
            templateUrl : 'data/procesos/app.html',
            controller  : 'procesosController'
        });
        
});

scotchApp.controller('mainController', function($scope, $rootScope){
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    $rootScope.animation = currRoute.animation;
  });

  });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-about';
// });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-contact';
// });

    