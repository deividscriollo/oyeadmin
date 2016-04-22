// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider
        // route page initial
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
        })
        // route paquetes
        .when('/paquetes', {
            templateUrl : 'data/paquetes/app.html',
            controller  : 'paquetesController',
        })
        // route tipo programa
        .when('/tipo_programa', {
            templateUrl : 'data/tipo_programa/app.html',
            controller  : 'tipo_programaController',
        })
        // route tipo vendedor
        .when('/tipo_vendedor', {
            templateUrl : 'data/tipo_vendedor/app.html',
            controller  : 'tipo_vendedoresController',
        })
        // route areas
        .when('/areas', {
            templateUrl : 'data/areas/app.html',
            controller  : 'areasController',
        })
        // route cargos
        .when('/cargos', {
            templateUrl : 'data/cargos/app.html',
            controller  : 'cargosController',
        })

        // route bancos
        .when('/bancos', {
            templateUrl : 'data/bancos/app.html',
            controller  : 'bancosController',
        })
        // route clientes
        .when('/clientes', {
            templateUrl : 'data/clientes/app.html',
            controller  : 'clientesController',
        })
        // route para los programas
        .when('/programas', {
            templateUrl : 'data/programas/app.html',
            controller  : 'programasController'
        })
          // route para el login
        .when('/login', {
            templateUrl : 'data/login/app.html',
            controller  : 'loginController'
        })
        // proceso reportes
        .when('/reportes', {
            templateUrl : 'data/reportes/app.html',
            controller  : 'reportesController',
        })
        // proceso prueba
        .when('/ficha_invitados', {
            templateUrl : 'data/ficha_invitados/app.html',
            controller  : 'invitadosController',
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
        .when('/ficha_ingresos', {
            templateUrl : 'data/ficha_ingresos/app.html',
            controller  : 'fichaingresosController',
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

    