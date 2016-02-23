// create the module and name it scotchApp
    var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngAnimate']);
    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'vista/home.html',
                controller  : 'mainController',
            })
            // route for the corporativo
            .when('/corporativo', {
                templateUrl : 'vista/corporativo.html',
                controller  : 'corporativoController',
            })

            // route for the programacio page
            .when('/programacion', {
                templateUrl : 'vista/programacion.html',
                controller  : 'programacionController',
            })
            // route for the noticias page
            .when('/noticias', {
                templateUrl : 'vista/noticias.html',
                controller  : 'noticiasController',
            })
            // route for the corporativo
            .when('/tarifa', {
                templateUrl : 'vista/tarifa.html',
                controller  : 'tarifaController',
            })
            // route for the noticias page
            .when('/despertador', {
                templateUrl : 'vista/programas/programa1.html',
                controller  : 'programa1Controller',
            })
            // route for the podtcats page
            .when('/podcast', {
                templateUrl : 'vista/podcast.html',
                controller  : 'podcastController'
            })

            // route for the contact page
            .when('/contactos', {
                templateUrl : 'vista/contactos.html',
                controller  : 'contactosController'
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

    