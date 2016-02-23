// create the controller and inject Angular's $scope
angular.module('scotchApp').controller('procesosController', ["xeditable", "ui.bootstrap"],function ($scope) {
	
	// configuracion tabs
	$scope.tab = 1;
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

	//Primer Editable de Aceptado
	//editables on first profile page
		$.fn.editable.defaults.mode = 'inline';
		$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-green'></i></div>";
	    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		//text editable
	    $('#contactado_por')
		.editable({
			type: 'text',
			name: 'contactado_por'
	    });
		//custom date editable /para las fechas
		$('#fecha').editable({
			type: 'adate',
			date: {
				//datepicker plugin options
				    format: 'yyyy/mm/dd',
				viewformat: 'yyyy/mm/dd',
				 weekStart: 1
			}
		})
		//editables para la Hora    
		//text editable
	    $('#hora').editable({
			type: 'text',
			name: 'hora'
	    });
		//editables para la Forma    
		//text editable
	    $('#forma').editable({
			type: 'text',
			name: 'forma'
	    });
		//editables para El Contactado con    
		//text editable
	    $('#contactado_con').editable({
			type: 'text',
			name: 'contactado_con'
	    });
	//Fin del Primer Editable de Aceptado

	//Segundo Editable de Preconfirmado
		//editables on first profile page    
		//text editable
	    $('#preconfirmado_por').editable({
			type: 'text',
			name: 'preconfirmado_por'
	    });
	//custom date editable /para las fechas
		$('#fecha2').editable({
			type: 'adate',
			date: {
				//datepicker plugin options
				    format: 'yyyy/mm/dd',
				viewformat: 'yyyy/mm/dd',
				 weekStart: 1
			}
		})
		//editables para la Hora    
		//text editable
	    $('#hora2').editable({
			type: 'text',
			name: 'hora2'
	    });
		//editables para la Forma    
		//text editable
	    $('#forma2').editable({
			type: 'text',
			name: 'forma2'
	    });
		//editables para El Preconfirmado con    
		//text editable
	    $('#preconfirmado_con').editable({
			type: 'text',
			name: 'preconfirmado_con'
	    });
	//Fin del Segundo Editable de Preconfirmado

	//Tercer Editable de Confirmado
		//editables on first profile page    
		//text editable
	    $('#confirmado_por').editable({
			type: 'text',
			name: 'confirmado_por'
	    });
	//custom date editable /para las fechas
		$('#fecha3').editable({
			type: 'adate',
			date: {
				//datepicker plugin options
				    format: 'yyyy/mm/dd',
				viewformat: 'yyyy/mm/dd',
				 weekStart: 1
			}
		})
		//editables para la Hora    
		//text editable
	    $('#hora3').editable({
			type: 'text',
			name: 'hora3'
	    });
		//editables para la Forma    
		//text editable
	    $('#forma3').editable({
			type: 'text',
			name: 'forma3'
	    });
		//editables para El Confirmado con    
		//text editable
	    $('#confirmado_con')
		.editable({
			type: 'text',
			name: 'confirmado_con'
	    });
	//Fin del Tercer Editable de Confirmado

	//Cuarto Editable de Datos del Invitado 
		//editables on first profile page    
		//text editable
	    $('#nombre_invitado').editable({
			type: 'text',
			name: 'nombre_invitado'
	    });
		//editables para el nombre del contacto    
		//text editable
	    $('#nom_contacto').editable({
			type: 'text',
			name: 'nom_contacto'
	    });
		//editables para la Institución o empresa    
		//text editable
	    $('#inst_empresa').editable({
			type: 'text',
			name: 'inst_empresa'
	    });
		//editables para Primer Teléfono    
		//text editable
	    $('#telefono1').editable({
			type: 'text',
			name: 'telefono1'
	    });
	    	//editables para Segundo Teléfono    
		//text editable
	    $('#telefono2').editable({
			type: 'text',
			name: 'telefono2'
	    });
	    	//editables para Tercer Teléfono    
		//text editable
	    $('#telefono3').editable({
			type: 'text',
			name: 'telefono3'
	    });
		//Inicio de Temas a tratar 
		//editables on first profile page    
		//text editable
	    $('#tema_prin').editable({
			type: 'text',
			name: 'tema_prin'
	    });
		//editables para el nombre del contacto    
		//text editable
	    $('#tema_secu').editable({
			type: 'text',
			name: 'tema_secu'
	    });
		//editables para la Institución o empresa    
		//text editable
	    $('#nom_asis1').editable({
			type: 'text',
			name: 'nom_asis1'
	    });
		//editables para Primer Teléfono    
		//text editable
	    $('#nom_asis2').editable({
			type: 'text',
			name: 'nom_asis2'
	    });
	//Fin de Editable de Temas a Tratar 
		$('#horauno').editable({
			format: 'yyyy-mm-dd hh:ii',    
	        viewformat: 'dd/mm/yyyy hh:ii',    
	        datetimepicker: {
                weekStart: 1
           }
	        
		});

		

		
});