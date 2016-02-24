// create the controller and inject Angular's $scope
angular.module('scotchApp').controller('procesosController', function ($scope) {
	
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
			name: 'contactado_por',
			pk:'asdf',
			url:'data/procesos/app.php',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre';
		    }  
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
			name: 'forma',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Forma';
		    } 
	    });
		//editables para El Contactado con    
		//text editable
	    $('#contactado_con').editable({
			type: 'text',
			name: 'contactado_con',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre Contactado';
		    } 
	    });
	//Fin del Primer Editable de Aceptado

	//Segundo Editable de Preconfirmado
		//editables on first profile page    
		//text editable
	    $('#preconfirmado_por').editable({
			type: 'text',
			name: 'preconfirmado_por',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre';
		    } 
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
			name: 'forma2',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Forma';
		    } 
	    });
		//editables para El Preconfirmado con    
		//text editable
	    $('#preconfirmado_con').editable({
			type: 'text',
			name: 'preconfirmado_con',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre Preconfirmado';
		    } 
	    });
	//Fin del Segundo Editable de Preconfirmado

	//Tercer Editable de Confirmado
		//editables on first profile page    
		//text editable
	    $('#confirmado_por').editable({
			type: 'text',
			name: 'confirmado_por',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre';
		    } 
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
			name: 'forma3',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Forma';
		    } 
	    });
		//editables para El Confirmado con    
		//text editable
	    $('#confirmado_con')
		.editable({
			type: 'text',
			name: 'confirmado_con',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre Confirmado';
		    } 
	    });
	//Fin del Tercer Editable de Confirmado

	//Cuarto Editable de Datos del Invitado 
		//editables on first profile page    
		//text editable
	    $('#nombre_invitado').editable({
			type: 'text',
			name: 'nombre_invitado',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre';
		    } 
	    });
		//editables para el nombre del contacto    
		//text editable
	    $('#nom_contacto').editable({
			type: 'text',
			name: 'nom_contacto',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre del Contacto';
		    } 
	    });
		//editables para la Institución o empresa    
		//text editable
	    $('#inst_empresa').editable({
			type: 'text',
			name: 'inst_empresa',
			validate:function(value){		                
		       if(value=='') return 'Campo Requerido Ingrese Nombre de la Empresa';
		    } 
	    });
		//editables para Primer Teléfono    
		//text editable
	    $('#telefono1').editable({
			type: 'text',
			name: 'telefono1',
			validate: function(value) {
		       var regex = /^[0-9]+$/;
		        if(! regex.test(value)) {
		            return 'Solo Números';
        	}}
	    });
	    	//editables para Segundo Teléfono    
		//text editable
	    $('#telefono2').editable({
			type: 'text',
			name: 'telefono2',
			validate: function(value) {
		       var regex = /^[0-9]+$/;
		        if(! regex.test(value)) {
		            return 'Solo Números';
        	}}
	    });
	    	//editables para Tercer Teléfono    
		//text editable
	    $('#telefono3').editable({
			type: 'text',
			name: 'telefono3',
			validate: function(value) {
		       var regex = /^[0-9]+$/;
		        if(! regex.test(value)) {
		            return 'Solo Números';
        	}}
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
	
	//Panel de Entrevistas
		//Preguntas Tema 1
	    $('#pregunta1').editable({
			type: 'text',
			name: 'pregunta1'
	    });	
	    //Preguntas Tema 2
	    $('#pregunta2').editable({
			type: 'text',
			name: 'pregunta2'
	    });	
	     //Preguntas Tema 3
	    $('#pregunta3').editable({
			type: 'text',
			name: 'pregunta3'
	    });	    
	    //Preguntas Tema 4
	    $('#pregunta4').editable({
			type: 'text',
			name: 'pregunta4'
	    });	
	    //Preguntas Tema 5
	    $('#pregunta5').editable({
			type: 'text',
			name: 'pregunta5'
	    });	
	     //Preguntas Tema 6
	    $('#pregunta6').editable({
			type: 'text',
			name: 'pregunta6'
	    });	
	      //Hora de llegada
	    $('#hora_llegada').editable({
			type: 'text',
			name: 'hora_llegada'
	    });	 
	      //Tiempo de la entrevista
	    $('#tiempo_entre').editable({
			type: 'text',
			name: 'tiempo_entre'
	    }); 
	     //Director del Programa 
	    $('#director').editable({
			type: 'text',
			name: 'director'
	    }); 
	     //Conducción de Entrevista
	    $('#condu_entre').editable({
			type: 'text',
			name: 'condu_entre'
	    }); 
	    //para el selector de código
	    $(".select2").css({
	    	'width':'300px',
	    	'text-align':'left',
	    }).select2({allowClear:true})
				.on('change', function(){
					$(this).closest('form').validate().element($(this));
		});      

});