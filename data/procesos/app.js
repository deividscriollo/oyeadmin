// create the controller and inject Angular's $scope
angular.module('scotchApp').controller('procesosController',function ($scope) {
	console.log('test');
	// configuracion tabs
	$scope.tab = 1;
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

	// //Primer Editable de Aceptado
	// //editables on first profile page
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-green'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		
	// formulario registro de la primera: PreEntrevista
	$('#form_proceso1').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_contactado_por: {
				required: true				
			},
			txt_forma: {
				required: true				
			},
			txt_contactado_con: {
				required: true				
			},
			txt_preconfirmado_por: {
				required: true				
			},
			txt_forma2: {
				required: true				
			},
			txt_preconfirmado_con: {
				required: true				
			},
			txt_confirmado_por: {
				required: true				
			},
			txt_forma3: {
				required: true				
			},
			txt_confirmado_con: {
				required: true				
			},
			txt_responsable: {
				required: true				
			},
			txt_responsable2: {
				required: true				
			},
			txt_responsable3: {
				required: true				
			},
			txt_invitado: {
				required: true				
			},
			txt_contacto: {
				required: true				
			},
			txt_empresa: {
				required: true				
			},
			txt_principal: {
				required: true				
			},
			txt_secundario: {
				required: true				
			},
		},
		messages: {
			txt_contactado_por: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_forma: {
				required: "Por favor, Digíte una Forma",
			},
			txt_contactado_con: { 	
				required: "Por favor, Digíte un Nombre"			
			},
			txt_preconfirmado_por: { 	
				required: "Por favor, Digíte un Nombre"			
			},
			txt_forma2: {
				required: "Por favor, Digíte una Forma",
			},
			txt_preconfirmado_con: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_confirmado_por: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_forma3: {
				required: "Por favor, Digíte una Forma",
			},
			txt_confirmado_con: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_responsable: {
				required: "Por favor, Necesita un Responsable",
			},
			txt_responsable2: {
				required: "Por favor, Necesita un Responsable",
			},
			txt_responsable3: {
				required: "Por favor, Necesita un Responsable",
			},
			txt_invitado: {
				required: "Por favor, Necesita un Nombre de Invitado",
			},
			txt_contacto: {
				required: "Por favor, Necesita un Contacto",
			},
			txt_empresa: {
				required: "Por favor, Necesita un Nombre de Empresa",
			},
			txt_principal: {
				required: "Por favor, Necesita un Tema Principal",
			},
			txt_secundario: {
				required: "Por favor, Necesita un Tema Secundario",
			},
			txt_email: {
				required: "Por favor, Ingrese un E-mail Valido",
				txt_email: "Por favor, Ingrese un E-mail Valido"
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/procesos/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
					console.log(data);
						if (data['valid']=="true") {
							$.gritter.add({
								title: 'Proceso Guardado Correctamente',
								text: 'Sus Datos han sido guardados de forma Correcta',
								class_name: 'gritter-success',
								time:2000
							});	
						}else{
							$.gritter.add({
								title: 'Proceso No Guardado',
								text: 'Porvafor Verifique que sus Datos esten llenos',
								class_name: 'gritter-error',
								time:2000
							});
						}

				}
			});
		}
	}); 
	// formulario registro de la segunda: Entrevista
	$('#form_proceso2').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_pregunta1: {
				required: true				
			},
			txt_director: {
				required: true				
			},
			txt_conduccion: {
				required: true				
			},
		},
		messages: {
			txt_pregunta1: {
				required: "Por favor, Almenos debe tener una pregunta",
			},
			txt_director: { 	
				required: "Por favor, Digíte un Nombre"			
			},
			txt_conduccion: { 	
				required: "Por favor, Digíte un Nombre"			
			},
		},
		//para prender y apagar los errores
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/procesos/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
					console.log(data);
						if (data['valid']=="true") {
							$.gritter.add({
								title: 'Proceso Guardado Correctamente',
								text: 'Sus Datos han sido guardados de forma Correcta',
								class_name: 'gritter-success',
								time:2000
							});	
						}else{
							$.gritter.add({
								title: 'Proceso No Guardado',
								text: 'Porvafor Verifique que sus Datos esten llenos',
								class_name: 'gritter-error',
								time:2000
							});
						}
				}
			});
		}
	});


	/////////////////////////////////////////// definir formatos////////////////////////////////////
		// //para el selector de código de Fichas
	    $(".select2").css({
	    	'width':'345px',
	    	'text-align':'left',
	    }).select2({allowClear:true})
			.on('change', function(){
			$(this).closest('form').validate().element($(this));
		}); 

		// //para la fecha del calendario
		$( ".datepicker" ).datepicker({
			format: "yyyy-mm-dd",
	        pickTime: false,
	        autoclose: true,
	        todayBtn: true,
	        language: 'es',
	        pickerPosition: "bottom-right"          
		}).datepicker("setDate","today");

		// //para la hora prevista
		$(".timepicker").datetimepicker({ 
	       pickDate: false
	    });
	    // definir formato campos números de teléfono
		$('#txt_telf, #txt_telf2, #txt_telf3').mask('(999) 999-9999');
		
		$('#btn_nuevo_ficha').click(function(){
			$('#modal-nuevo-fichas').modal('show');
		});
		
	/////////////////////////////////para seleccionar el codigo de Fichas//////////////////////////////

	// ///////////////////////INICIO llamado funciones de procesos de unicio/////////////////////////////////

	// llenar select ficah
	llenar_select_ficha();

	// ///////////////////////FIN llamado funciones de procesos de unicio/////////////////////////////////



	function llenar_select_ficha(){
		$.ajax({
			url: 'data/procesos/app.php',
			type: 'post',
			data: {llenar_ficha:'asjkef'},
			success: function (data) {
				// llenar fiichas
				$('#select_ficha').html(data);
			}
		});
	}
	
	
	

   
});
		