// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('personalController', function ($scope) {

    jQuery(function($) {
			
		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function(e, info){
			if(info.step == 1 && $validation) {
				if(!$('#form_personal').valid()) e.preventDefault();
			}
			if(info.step == 2 && $validation) {
				if(!$('#form_bancarios').valid()) e.preventDefault();
			}
			if(info.step == 3 && $validation) {
				if(!$('#form_familia').valid()) e.preventDefault();
			}
		})
		.on('finished.fu.wizard', function(e) {
			proceso_guardar();
		}).on('stepclick.fu.wizard', function(e){
			//e.preventDefault();//this will prevent clicking and selecting steps
		});
	// formulario registro de la primera: Datos Personales
	$('#form_personal').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombres: {
				required: true				
			},
			txt_fecha_nacimiento:{
				required:true
			},
			txt_apellidos: {
				required: true				
			},
			txt_edad: {
				required: true				
			},
			txt_telf_fijo: {
				required: true				
			},
			txt_cedula: {
				required: true,
				digits: true, 
				maxlength: 10				
			},
			txt_telf_celular: {
				required: true				
			},
			select_civil: {
				required: true				
			},
			txt_cargas: {
				required: true				
			},
			txt_email: {
				required: true				
			},
			rb_instruccion: {
				required: true				
			},
			rb_vivienda: {
				required: true				
			},
			txt_direccion: {
				required: true				
			},
			select_sangre: {
				required: true				
			},
		},
		messages: {
			txt_nombres: {
				required: "Por favor, Digíte los Nombres Completos",
			},
			txt_fecha_nacimiento: {
				required: "Por favor, Elija una Fecha de Nacimiento",
			},
			txt_apellidos: {
				required: "Por favor, Digíte los Apellidos Completos",
			},
			txt_edad: {
				required: "Por favor, Se necesita la edad",
			},
			txt_telf_fijo: { 	
				required: "Por favor, Digíte un teléfono Fijo"			
			},
			txt_cedula: { 	
				required: "Por favor, Digíte el Número de Cédula",
				digits: "Sólo son permitido dígitos, Gracias",
				maxlength: "Por Favor, Ingrese los 10 dígitos del número de cédula"			
			},
			txt_telf_celular: {
				required: "Por favor, Digíte un telefono Celular",
			},
			select_civil: {
				required: "Por favor, Elija un estado civil",
			},
			txt_cargas: {
				required: "Por favor, Digíte el Número de cargas Familiares",
			},
			txt_email: {
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail valido"
			},
			rb_instruccion: {
				required: "Por favor, Elija una instruccion",
			},
			rb_vivienda: {
				required: "Por favor, Elija una Vivienda",
			},
			txt_direccion: {
				required: "Por favor, Digíte una Dirección Domiciliaria",
			},
			select_sangre: {
				required: "Por favor, Elija un Tipo de Sangre",
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
				url: 'data/personal/app.php',
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
	// FIN DEL FORMULARIO DE DATOS PERSONALES
	// formulario registro de la segunda: Datos Bancarios
	$('#form_bancarios').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
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
	// FIN DEL FORMULARIO DE DATOS BANCARIOS
	// formulario registro de la tercera: Datos Familiares
	$('#form_familia').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombres_familia: {
		      required: true
		    },
		    txt_parentesco: {
		      required: true
		    },
		    txt_telf_familia: {
		      required: true
		    },
		    txt_dir_fami: {
		      required: true
		    },
		},
		messages: {
			txt_nombres_familia: {
				required: "Por favor, Ingrese un Nombre de Familiar",
			},
			txt_parentesco: {
				required: "Por favor, Ingrese un Parentesco de Familiar",
			},
			txt_telf_familia: {
				required: "Por favor, Ingrese un Teléfono Familiar",
			},
			txt_dir_fami: {
				required: "Por favor, Ingrese una Dirección Familiar",
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
	// FIN DEL FORMULARIO DE DATOS FAMILIARES

	    
	//definir formato campos números de teléfono
		$('#txt_telf_fijo, #txt_telf_celular, #txt_telf_fijo_trab, #txt_telf_celular_trab, #txt_telf_familia').mask('(999) 999-9999');
		// rango de los tiempos de trabajo
		$('input[name=tiempo1], input[name=tiempo2], input[name=tiempo3]').daterangepicker({
			'applyClass' : 'btn-sm btn-success',
			'cancelClass' : 'btn-sm btn-default',
			locale: {
				applyLabel: 'Aplicar',
				cancelLabel: 'Cancelar',
			}
		})
			
		/////////////////////////////////////////////////////
		$("#txt_fecha_nacimiento").change(function(){
			var fecha=$(this).val()
			console.log(fecha);
			$.ajax({
				url: 'data/personal/app.php',
				type: 'post',
				data: {consulta_edad:'asjkef',fecha:fecha},
				success: function (data) {
					$('#txt_edad').val(data);
				}
			});
		})
		/////////////proceso de guardar//////
		$( "#btn_guardar" ).click(function() {
			  proceso_guardar();
			});
		$(".select2").css({
		    	'width':'60%',
		    	'text-align':'left',
		    }).select2().on("change", function(e) {
			$(this).closest('form').validate().element($(this));
        })
		// ///////////////////////INICIO llamado funciones de procesos de inicio/////////////////////////////////
		llenar_select_bancos();
		llenar_select_areas();
		llenar_select_pais();
		init();
		//llenar_text();
		// ///////////////////////FIN llamado funciones de procesos de inicio/////////////////////////////////
		function init(){
			//para la fecha del calendario
			$("#txt_fecha_aplicacion, #txt_fecha_nacimiento, #txt_ini_trab").datepicker({ 
				format: "yyyy-mm-dd",
		        autoclose: true
			}).datepicker("setDate","today");
		}

		function llenar_select_bancos(){
			$.ajax({
				url: 'data/personal/app.php',
				type: 'post',
				data: {llenar_bancos:'asjkef'},
				success: function (data) {
					$('#select_banco').html(data);
				}
			});
		}
		function llenar_select_areas(){
			$.ajax({
				url: 'data/personal/app.php',
				type: 'post',
				data: {llenar_areas:'asjkef'},
				success: function (data) {
					$('#select_areas').html(data);
				}
			});
		}

		function llenar_select_pais(){
			$.ajax({
				url: 'data/personal/app.php',
				type: 'post',
				data: {llenar_pais:'asjkef'},
				success: function (data) {
					$('#select_pais').html(data);
				}
			});
		}

		function proceso_guardar() {
			var form_uno=$("#form_personal").serialize()
			var form_dos= $("#form_bancarios").serialize()
			var form_tres= $("#form_familia").serialize()
			var submit = "btn_guardar"
			$.ajax({
            url: "data/personal/app.php",
            data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_guardar=" +submit,
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