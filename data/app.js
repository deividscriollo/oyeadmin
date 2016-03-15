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
        .when('/login', {
            templateUrl : 'data/login/app.html',
            controller  : 'loginController'
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
        // proceso ingresos principales
        .when('/ingresos_princi', {
            templateUrl : 'data/ingresos_princi/app.html',
            controller  : 'ingresos_princiController',
        })
        // proceso ingreso ficha programas
        .when('/ficha_programas', {
            templateUrl : 'data/ficha_programas/app.html',
            controller  : 'ficha_programasController',
        })
        // proceso Personal de Trabajo
        .when('/personal', {
            templateUrl : 'data/personal/app.html',
            controller  : 'personalController',
        })
});

scotchApp.controller('mainController', function($scope, $rootScope){
  

  });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-about';
// });
// scotchApp.controller('mainController', function($scope) {
//     $scope.pageClass = 'page-contact';
// });

    