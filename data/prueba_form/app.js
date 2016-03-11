// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('prueba_formController', function ($scope) {

    jQuery(function($) {
			
		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function(e, info){
			if(info.step == 1 && $validation) {
				if(!$('#form_proceso1').valid()) e.preventDefault();
			}
			if(info.step == 2 && $validation) {
				if(!$('#form_proceso2').valid()) e.preventDefault();
			}
			if(info.step == 3 && $validation) {
				if(!$('#form_proceso3').valid()) e.preventDefault();
			}
		})
		.on('finished.fu.wizard', function(e) {
			proceso_guardar();
		}).on('stepclick.fu.wizard', function(e){
			//e.preventDefault();//this will prevent clicking and selecting steps
		});
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
			select_programas:{
				required:true
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
			select_programas: {
				required: "Por favor, Elija un Programa",
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
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail Valido",
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
				url: 'data/prueba_form/app.php',
				type: 'post',
				data: $(form).serialize(),
				dataType:"json",
				success: function (data) {
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
	// FIN DEL FORMULARIO DE PreEntrevista
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
			txt_video: {
		      url: true
		    }
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
			txt_video: { 	
				required: "Por favor, Ingrese una url correcta"			
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
				url: 'data/prueba_form/app.php',
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
	// FIN DEL FORMULARIO DE Entrevista
	// formulario registro de la tercera: Post-Entrevista
	$('#form_proceso3').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_video: {
		      url: true
		    }
		},
		messages: {
			txt_video: {
				required: "Por favor, Ingrese una url correcta",
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
				url: 'data/prueba_form/app.php',
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
	// FIN DEL FORMULARIO DE Entrevista
	/////////////////////////////////////////// definir formatos///////////////////////////////////
	    
	//definir formato campos números de teléfono
		$('#txt_telf, #txt_telf2, #txt_telf3').mask('(999) 999-9999');
	//el boton para seleccionar el programa y poder generar la Ficha Activa
		$('#btn_nuevo_ficha').click(function(){
			$('#modal-nuevo-fichas').modal('show');
		});
		$("#select_programas").css({
		    	'width':'100%',
		    	'text-align':'left',
		    }).select2().on("change", function(e) {
			$.ajax({
				url: 'data/prueba_form/app.php',
				type: 'post',
				dataType:'json',
				data: {consultar_datos_programas:'asjkef', id:e.val},
				success: function (data) {
					console.log(data.codigo);
				}
			});
        })

	
		/////////////proceso de guardar//////
		$( "#btn_guardar" ).click(function() {
			  proceso_guardar();
			});

	/////////////////////////////////para seleccionar el codigo de Fichas//////////////////////////////
	// ///////////////////////INICIO llamado funciones de procesos de inicio/////////////////////////////////
	// llenar select ficchas
	llenar_select_programas();
	llenar_select_usuarios();
	init();
	//llenar_text();
	// ///////////////////////FIN llamado funciones de procesos de inicio/////////////////////////////////
		function init(){
			$("#select_usuarios, #select_usuarios2, #select_usuarios3, #select_usuarios4, #select_usuarios5").css({
		    	'width':'60%',
		    	'text-align':'left',
		    }).select2({allowClear:true})
				.on('change', function(){
				$(this).closest('form').validate().element($(this));
			});
			//para la fecha del calendario
			$("#txt_fecha, #txt_fecha2, #txt_fecha3").datepicker({ 
				format: "yyyy-mm-dd",
		        autoclose: true,
		        startDate: new Date()
			}).datepicker("setDate","today");

			// //para la hora prevista
			$("#txt_hora_invitado1, #txt_hora_invitado2, #txt_hora_invitado3, #txt_hora_invitado4, #txt_hora_invitado5, #txt_hora_invitado6, #txt_hora, #txt_hora2, #txt_hora3,#txt_hora_llegada ").datetimepicker({ 
		       pickDate: false
		    });
		}

		function llenar_select_programas(){
			$.ajax({
				url: 'data/prueba_form/app.php',
				type: 'post',
				data: {llenar_programas:'asjkef'},
				success: function (data) {
					$('#select_programas').html(data);
				}
			});
		}

		function llenar_select_usuarios(){
			$.ajax({
				url: 'data/prueba_form/app.php',
				type: 'post',
				data: {llenar_usuarios:'asjkef'},
				success: function (data) {
					$('#select_usuarios,#select_usuarios2,#select_usuarios3,#select_usuarios4,#select_usuarios5').html(data);
				}
			});
		}

		function proceso_guardar() {
			var form_uno=$("#form_proceso1").serialize()
			var form_dos= $("#form_proceso2").serialize()
			var form_tres= $("#form_proceso3").serialize()
			var submit = "btn_guardar"
			var cod_ficha="id_ficha"
			$.ajax({
            url: "data/prueba_form/app.php",
            data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_guardar=" +submit+"&id_ficha="+cod_ficha,
            type: "POST",
            success: function (result) {
            },
            error: function (xhr, status, errorThrown) {
              alert("Hubo un problema!");
              console.log("Error: " + errorThrown);
              console.log("Status: " + status);
              console.dir(xhr);
            }
        });
		}

		$('#modal-wizard-container').ace_wizard();
		$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
		
		$(document).one('ajaxloadstart.page', function(e) {
			//in ajax mode, remove remaining elements before leaving page
			$('[class*=select2]').remove();
		});
	})

});	