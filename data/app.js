// create the module and name it scotchApp
var dcapp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
dcapp.config(function($routeProvider) {
    
    $routeProvider
        // route page initial
        .when('/', {
            templateUrl : 'data/home/app.html',
            controller  : 'mainController',
            activetab: 'inicio'
        })
        // route usuarios
        .when('/usuarios', {
            templateUrl : 'data/usuarios/app.html',
            controller  : 'usuariosController',
            activetab: 'usuarios'
        })
        // route paquetes
        .when('/perfiles', {
            templateUrl : 'data/perfiles/app.html',
            controller  : 'perfilesController',
            activetab: 'perfiles'
        })
        // proceso privilegios
        .when('/privilegios', {
            templateUrl : 'data/privilegios/app.html',
            controller  : 'privilegiosController',
            activetab: 'privilegios'
        })
        // route paquetes
        .when('/tipo_paquetes', {
            templateUrl : 'data/tipo_paquetes/app.html',
            controller  : 'tipo_paquetesController',
            activetab: 'tipo_paquetes'
        })
        // route paquetes
        .when('/paquetes', {
            templateUrl : 'data/paquetes/app.html',
            controller  : 'paquetesController',
            activetab: 'paquetes'
        })
        // route tipo programa
        .when('/tipo_programa', {
            templateUrl : 'data/tipo_programa/app.html',
            controller  : 'tipo_programaController',
            activetab: 'tipo_programa'
        })
        // route tipo vendedor
        .when('/tipo_vendedor', {
            templateUrl : 'data/tipo_vendedor/app.html',
            controller  : 'tipo_vendedoresController',
            activetab: 'tipo_vendedor'
        })
        // route tipo vendedor
        .when('/tipo_contrato', {
            templateUrl : 'data/tipo_contrato/app.html',
            controller  : 'tipo_contratoController',
            activetab: 'tipo_contrato'
        })
        // route areas
        .when('/areas', {
            templateUrl : 'data/areas/app.html',
            controller  : 'areasController',
            activetab: 'areas'
        })
        // route cargos
        .when('/cargos', {
            templateUrl : 'data/cargos/app.html',
            controller  : 'cargosController',
            activetab: 'cargos'
        })

        // route bancos
        .when('/bancos', {
            templateUrl : 'data/bancos/app.html',
            controller  : 'bancosController',
            activetab: 'bancos'
        })
        // route empresa
        .when('/empresa', {
            templateUrl : 'data/empresa/app.html',
            controller  : 'empresaController',
            activetab: 'empresa'
        })
        // route clientes
        .when('/clientes', {
            templateUrl : 'data/clientes/app.html',
            controller  : 'clientesController',
            activetab: 'clientes'
        })
        // route para los programas
        .when('/programas', {
            templateUrl : 'data/programas/app.html',
            controller  : 'programasController',
            activetab: 'programas'
        })
          // route para el login
        .when('/login', {
            templateUrl : 'data/login/app.html',
            controller  : 'loginController',
            activetab: 'login'
        })
        // proceso reportes
        .when('/reportes', {
            templateUrl : 'data/reportes/app.html',
            controller  : 'reportesController',
            activetab: 'reportes'
        })
        // proceso prueba
        .when('/ficha_invitados', {
            templateUrl : 'data/ficha_invitados/app.html',
            controller  : 'invitadosController',
            activetab: 'ficha_invitados'
        })
        // proceso ingresos principales
        .when('/ingresos_princi', {
            templateUrl : 'data/ingresos_princi/app.html',
            controller  : 'ingresos_princiController',
            activetab: 'ingresos_princi'
        })
        // proceso ingreso ficha programas
        .when('/ficha_programas', {
            templateUrl : 'data/ficha_programas/app.html',
            controller  : 'ficha_programasController',
            activetab: 'ficha_programas'
        })
        // proceso Personal de Trabajo
        .when('/ficha_ingresos', {
            templateUrl : 'data/ficha_ingresos/app.html',
            controller  : 'fichaingresosController',
            activetab: 'ficha_ingresos'
        })
        // proceso roles de pago
        .when('/rol_pagos', {
            templateUrl : 'data/rol_pagos/app.html',
            controller  : 'rolpagosController',
            activetab: 'rol_pagos'
        })
        
        // proceso contratos
        .when('/contratos_selectivos', {
            templateUrl : 'data/contratos_selectivos/app.html',
            controller  : 'contratos_selectivosController',
            activetab: 'contratos_selectivos'
        })
        // proceso facturas
        .when('/facturas', {
            templateUrl : 'data/facturas/app.html',
            controller  : 'facturasController',
            activetab: 'facturas'
        })
});

dcapp.factory('Auth', function($location){
    var user;
    return{
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            var ruta = $location.path();
            var accesos = [ '',
                            '/',
                            '/inicio',
                            '/usuarios',
                            '/perfiles',
                            '/tipo_paquetes',
                            '/paquetes',
                            '/tipo_programa',
                            '/tipo_vendedor',
                            '/tipo_contrato',
                            '/areas',
                            '/cargos',
                            '/bancos',
                            '/empresa',
                            // '/clientes',
                            '/programas',
                            '/login',
                            '/reportes',
                            '/ficha_invitados',
                            '/ingresos_princi',
                            '/ficha_programas',
                            '/ficha_ingresos',
                            '/rol_pagos',
                            '/contratos_selectivos',
                            '/facturas',
                            '/privilegios'];
                            console.log(ruta);
            var a = accesos.lastIndexOf(ruta);
            if (a<0) {
                return false;    
            }else{
                return true;
            }
            
        }
    }
});


dcapp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        var rutablock = $location.path();
        if (!Auth.isLoggedIn()) {
            console.log('denegado');
            event.preventDefault();
            // $location.path('/inicio');
            alert('Lo Sentimos No ');
        }
        else {
            
            // console.log('ok');
            // $location.path('/home');

        }
    });
}]);
