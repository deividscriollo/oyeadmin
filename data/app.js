// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);
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
        // proceso prueba
        .when('/prueba_form', {
            templateUrl : 'data/prueba_form/app.html',
            controller  : 'prueba_formController',
        })
        // route for the contact page
        .when('/procesos', {
            templateUrl : 'data/procesos/app.html',
            controller  : 'procesosController'
        });
        
});

scotchApp.controller('mainController', function($scope, $rootScope){
  

  });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-about';
// });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-contact';
// });

    