angular.module('scotchApp').controller('privilegiosController', function ($scope) {

	jQuery(function($) {
		var sampleData = initiateDemoData();//see below

		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_empleado,#select_empleado2").select2({
		  allowClear: true
		});

		$('#tree1').ace_tree({
			dataSource: sampleData['dataSource1'],
			multiSelect: true,
			cacheItems: true,
			'open-icon' : 'ace-icon tree-minus',
			'close-icon' : 'ace-icon tree-plus',
			'selectable' : true,
			'selected-icon' : 'ace-icon fa fa-check',
			'unselected-icon' : 'ace-icon fa fa-times',
			loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
		});

		function initiateDemoData(){
			var tree_data = {
				
				'Ingresos' : {text: 'Ingresos', type: 'folder'}	,
				'coorporativo' : {text: 'Coorporativo', type: 'folder'}	,
				'invitados' : {text: 'Agenda Invitados', type: 'folder'}	,
				'programas' : {text: 'Programas', type: 'folder'}	,
				'contratos' : {text: 'Contratos', type: 'folder'}	,
				'facturacion' : {text: 'Facturación', type: 'item'}	,
				'roles' : {text: 'Roles de Pagos', type: 'item'}	,
				'reportes' : {text: 'Reportes', type: 'item'}
			}
			
			tree_data['Ingresos']['additionalParameters'] = {
				'children' : {
					'cars' : {text: 'Generales', type: 'folder'},
					'usuario' : {text: 'Usuarios', type: 'item'},
					'perfil' : {text: 'Perfil', type: 'item'},
					'privilegios' : {text: 'Privilegios', type: 'item'},
					'empresa' : {text: 'Empresa', type: 'item'},
					'usuarios' : {text: 'Usuarios', type: 'item'},
					'clientes' : {text: 'Clientes', type: 'item'},
					'programas' : {text: 'Programas', type: 'item'},
					'vendedores' : {text: 'Vendedores', type: 'item'}
				}
			}
			tree_data['Ingresos']['additionalParameters']['children']['cars']['additionalParameters'] = {
				'children' : {
					'classics' : {text: 'Tipo Paquetes', type: 'item'},
					'convertibles' : {text: 'Paquetes', type: 'item'},
					'coupes' : {text: 'Tipo Programa', type: 'item'},
					'hatchbacks' : {text: 'Tipo Vendedor', type: 'item'},
					'hybrids' : {text: 'Tipo Contrato', type: 'item'},
					'suvs' : {text: 'Areas', type: 'item'},
					'sedans' : {text: 'Cargos', type: 'item'},
					'trucks' : {text: 'Bancos', type: 'item'}
				}
			}

			tree_data['coorporativo']['additionalParameters'] = {
				'children' : {
					'appliances' : {text: 'Ficha ingresos', type: 'item'}
				}
			}

			tree_data['invitados']['additionalParameters'] = {
				'children' : {
					'apartments-rentals' : {text: 'Ficha invitados', type: 'item'}
				}
			}
			tree_data['programas']['additionalParameters'] = {
				'children' : {
					'apartments' : {text: 'Ficha programas', type: 'item'}
				}
			}
			tree_data['contratos']['additionalParameters'] = {
				'children' : {
					'rotativo' : {text: 'Rotativo', type: 'item'},
					'selectivo' : {text: 'Selectivo', type: 'item'}
				}
			}

			var dataSource1 = function(options, callback){
				var $data = null
				if(!("text" in options) && !("type" in options)){
					$data = tree_data;//the root tree
					callback({ data: $data });
					return;
				}
				else if("type" in options && options.type == "folder") {
					if("additionalParameters" in options && "children" in options.additionalParameters)
						$data = options.additionalParameters.children || {};
					else $data = {}//no data
				}
				
				if($data != null)//this setTimeout is only for mimicking some random delay
					setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

				//we have used static data here
				//but you can retrieve your data dynamically from a server using ajax call
				//checkout examples/treeview.html and examples/treeview.js for more info
			}
			
			return {'dataSource1': dataSource1}
		}

		// inicio de procesos
			llenar_select_usuarios()
		// llenar select usuario
			function llenar_select_usuarios() {
				$.ajax({
					url: 'data/privilegios/app.php',
					type: 'post',
					data: {llenar_usuarios:'llenar_usuarios'},
					success: function (data) {
						$('#select_usuario').html(data);
					}
				});
			}
	});
});