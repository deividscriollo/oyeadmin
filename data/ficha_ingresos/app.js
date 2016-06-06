// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('fichaingresosController', function ($scope) {

    jQuery(function($) {

    	$('#txt_cargas').ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

    	$('#btn_agregar').click(function () {
			$('#modal-cursos-realizados').modal('show');
		});

    	$('#btn_agregar_cuentas').click(function () {
			$('#modal-cuentas-bancarias').modal('show');
		});
			
		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function(e, info) {
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
			var val =  "";
			val = $("#btn_0").attr("data-last")
			if (val == 'Guardar') {
				proceso_guardar();
			} else {
				if (val == 'Modificar') {
					proceso_modificar();
				}
			}

		}).on('stepclick.fu.wizard', function (e) {
	});

	//INICIO DE VALIDACION FORNULARIO cursos realizados
	// $('#form_modal_cursos').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		txt_nombre_curso: {
	// 			required: true				
	// 		},
	// 		txt_establecimiento_curso: {
	// 			required: true				
	// 		},
	// 		txt_tiempo_curso: {
	// 			required: true				
	// 		},
	// 	},
	// 	messages: {
	// 		txt_nombre_curso: {
	// 			required: "Por favor, Indique nombre del curso",
	// 		},
	// 		txt_establecimiento_curso: { 	
	// 			required: "Por favor, Indique establecimiento",			
	// 		},
	// 		txt_tiempo_curso: {
	// 			required: "Por favor, Indique tiempo del curso",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
			
	// 	}
	// });
	// Fin

	// formulario registro de la primera: Datos Personales
	// $('#form_personal').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		txt_nombres: {
	// 			required: true				
	// 		},
	// 		txt_fecha_nacimiento:{
	// 			required:true
	// 		},
	// 		txt_apellidos: {
	// 			required: true				
	// 		},
	// 		txt_edad: {
	// 			required: true				
	// 		},
	// 		txt_cedula: {
	// 			required: true,
	// 			digits: true, 
	// 			maxlength: 10				
	// 		},
	// 		txt_telf_celular: {
	// 			required: true				
	// 		},
	// 		select_civil: {
	// 			required: true				
	// 		},
	// 		txt_email: {
	// 			required: true				
	// 		},
	// 		rb_instruccion: {
	// 			required: true				
	// 		},
	// 		rb_vivienda: {
	// 			required: true				
	// 		},
	// 		txt_direccion: {
	// 			required: true				
	// 		},
	// 		select_pais: {
	// 			required: true				
	// 		},
	// 		select_provincia: {
	// 			required: true				
	// 		},
	// 		select_ciudad: {
	// 			required: true				
	// 		},
	// 		select_sangre: {
	// 			required: true				
	// 		},
	// 	},
	// 	messages: {
	// 		txt_nombres: {
	// 			required: "Por favor, Digíte los Nombres Completos",
	// 		},
	// 		txt_fecha_nacimiento: {
	// 			required: "Por favor, Elija una Fecha de Nacimiento",
	// 		},
	// 		txt_apellidos: {
	// 			required: "Por favor, Digíte los Apellidos Completos",
	// 		},
	// 		txt_edad: {
	// 			required: "Por favor, Se necesita la edad",
	// 		},
	// 		txt_cedula: { 	
	// 			required: "Por favor, Digíte el Número de Cédula",
	// 			digits: "Sólo son permitido dígitos, Gracias",
	// 			maxlength: "Por Favor, Ingrese los 10 dígitos del número de cédula"			
	// 		},
	// 		txt_telf_celular: {
	// 			required: "Por favor, Digíte un telefono Celular",
	// 		},
	// 		select_civil: {
	// 			required: "Por favor, Elija un estado civil",
	// 		},
	// 		txt_cargas: {
	// 			min: "Por Favor, Ingrese número valido de cargas familiares",
	// 			max: "Por Favor, Ingrese número valido de cargas familiares"
	// 		},
	// 		txt_email: {
	// 			required: "Por favor, Ingrese un E-mail",
	// 			email: "Por favor, Ingrese un E-mail valido"
	// 		},
	// 		rb_instruccion: {
	// 			required: "Por favor, Elija una instruccion",
	// 		},
	// 		rb_vivienda: {
	// 			required: "Por favor, Elija tipo Vivienda",
	// 		},
	// 		txt_direccion: {
	// 			required: "Por favor, Digíte una Dirección Domiciliaria",
	// 		},
	// 		select_pais: {
	// 			required: "Por favor, Elija un País",
	// 		},
	// 		select_provincia: {
	// 			required: "Por favor, Elija una Provincia",
	// 		},
	// 		select_ciudad: {
	// 			required: "Por favor, Elija una Ciudad",
	// 		},
	// 		select_sangre: {
	// 			required: "Por favor, Elija un Tipo de Sangre",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
	// 	}
	// });
	// Fin

	// Validacion: Datos Bancarios modal
	// $('#form_modal_cuentas').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		select_cuenta: {
	// 			required: true				
	// 		},
	// 		select_banco: {
	// 			required: true				
	// 		},
	// 		txt_tiempo_curso: {
	// 			required: true				
	// 		},
	// 	},
	// 	messages: {
	// 		select_cuenta: {
	// 			required: "Por favor, Elija una opción",
	// 		},
	// 		select_banco: {
	// 			required: "Por favor, Elija una opción",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
			
	// 	}
	// });
	// Fin

	// formulario registro de la tercera: Datos Familiares
	// $('#form_familia').validate({
	// 	errorElement: 'div',
	// 	errorClass: 'help-block',
	// 	focusInvalid: false,
	// 	ignore: "",
	// 	rules: {
	// 		txt_nombres_familia: {
	// 	      required: true
	// 	    },
	// 	    txt_parentesco: {
	// 	      required: true
	// 	    },
	// 	    txt_telf_familia: {
	// 	      required: true
	// 	    },
	// 	    txt_dir_fami: {
	// 	      required: true
	// 	    },
	// 	    txt_ciudad_fami: {
	// 	      required: true
	// 	    },
	// 	    select_areas: {
	// 	      required: true
	// 	    },
	// 	    select_cargo: {
	// 	      required: true
	// 	    },
	// 	    sueldo: {
	// 	      required: true
	// 	    },
	// 	},
	// 	messages: {
	// 		txt_nombres_familia: {
	// 			required: "Por favor, Ingrese un Nombre de Familiar",
	// 		},
	// 		txt_parentesco: {
	// 			required: "Por favor, Ingrese un Parentesco de Familiar",
	// 		},
	// 		txt_telf_familia: {
	// 			required: "Por favor, Ingrese un Teléfono Familiar",
	// 		},
	// 		txt_dir_fami: {
	// 			required: "Por favor, Ingrese una Dirección Familiar",
	// 		},
	// 		txt_ciudad_fami: {
	// 			required: "Por favor, Ingrese una Ciudad",
	// 		},
	// 		select_areas: {
	// 			required: "Por favor, Seleccione una Área",
	// 		},
	// 		select_cargo: {
	// 			required: "Por favor, Ingrese un cargo",
	// 		},
	// 		sueldo: {
	// 			required: "Por favor, Ingrese uel sueldo",
	// 		},
	// 	},
	// 	//para prender y apagar los errores
	// 	highlight: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	// 	},
	// 	success: function (e) {
	// 		$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	// 		$(e).remove();
	// 	},
	// 	submitHandler: function (form) {
	// 	}
	// });
	// FIN DEL FORMULARIO DE DATOS FAMILIARES

	// definir formato campos números de teléfono
	$('.telefonos').mask('(999) 999-9999');
	$('.fijo').mask('(999) 999-999');
	// rango de los tiempos de trabajo
	$('input[name=tiempo1], input[name=tiempo2], input[name=tiempo3]').daterangepicker({
		'applyClass' : 'btn-sm btn-success',
		'cancelClass' : 'btn-sm btn-default',
		locale: {
			applyLabel: 'Aplicar',
			cancelLabel: 'Cancelar',
		}
	})
	// fin 

	// Se utiliza para que el campo de texto solo acepte letras
	$(".letras").keypress(function (key) {
        // window.console.log(key.charCode)
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
            && (key.charCode < 65 || key.charCode > 90) //letras minusculas
            && (key.charCode != 45) //retroceso
            && (key.charCode != 241) //ñ
            && (key.charCode != 209) //Ñ
            && (key.charCode != 32) //espacio
            && (key.charCode != 225) //á
            && (key.charCode != 233) //é
            && (key.charCode != 237) //í
            && (key.charCode != 243) //ó
            && (key.charCode != 250) //ú
            && (key.charCode != 193) //Á
            && (key.charCode != 201) //É
            && (key.charCode != 205) //Í
            && (key.charCode != 211) //Ó
            && (key.charCode != 218) //Ú
            )
            return false;
    });	

    //Se utiliza para que el campo de texto solo acepte numeros
    $('.numeros').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });

    // Validación de la Cédula
   //  validarDocumento  = function() {          
	  //   numero = document.getElementById('txt_cedula').value;
	  //   /* alert(numero); */
	  //   var suma = 0;      
	  //   var residuo = 0;      
	  //   var nat = false;      
	  //   var numeroProvincias = 22;                  
	  //   var modulo = 11;

	  //   if (numero.length < 10 ) {              
	  //       $.gritter.add({
			// 	title: 'Incorrecto',
			// 	text: 'El número ingreado no esta completo o en invalido',
			// 	class_name: 'gritter-error',
			// 	time:2000
			// });
	  //   }
	  //   /* Los primeros dos digitos corresponden al codigo de la provincia */
	  //   provincia = numero.substr(0,2);      
	  //   if (provincia < 1 || provincia > numeroProvincias) {           
	  //       // alert('El código de la provincia (dos primeros dígitos) es inválido');
	  //    	return false;       
	  //   }
	  //   /* Aqui almacenamos los digitos de la cedula en variables. */
	  //     d1  = numero.substr(0,1);         
	  //     d2  = numero.substr(1,1);         
	  //     d3  = numero.substr(2,1);         
	  //     d4  = numero.substr(3,1);         
	  //     d5  = numero.substr(4,1);         
	  //     d6  = numero.substr(5,1);         
	  //     d7  = numero.substr(6,1);         
	  //     d8  = numero.substr(7,1);         
	  //     d9  = numero.substr(8,1);         
	  //     d10 = numero.substr(9,1);                    
	  //   /* El tercer digito es: */                           
	  //   /* 9 para sociedades privadas y extranjeros   */         
	  //    6 para sociedades publicas          
	  //   /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
	  //   if (d3 == 7 || d3 == 8){           
	  //       alert('El tercer dígito ingresado es inválido');                     
	  //       return false;
	  //   } 

	  //   /* Solo para personas naturales (modulo 10) */         
	  //   if (d3 < 6) {           
	  //       nat = true;            
	  //       p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
	  //       p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
	  //       p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
	  //       p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
	  //       p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
	  //       p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
	  //       p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
	  //       p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
	  //       p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
	  //       modulo = 10;
	  //   }         
	  //   suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
	  //   residuo = suma % modulo;    

	  //   /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
	  //   digitoVerificador = residuo == 0 ? 0: modulo - residuo;                
	  //   if(nat == true) {         
	  //       if (digitoVerificador != d10) {                          
	  //           $.gritter.add({
			// 		title: 'Incorrecto',
			// 		text: 'Porvafor Verifique que su número de cédula sea correcta',
			// 		class_name: 'gritter-error',
			// 		time:2000
			// 	});
	  //       }         
	  //   }      
	  //   return true;   
   // 	}   

	// fecha de nacimiento
	$("#txt_fecha_nacimiento").change(function() {
		var fecha = $(this).val();
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {consulta_edad:'consulta_edad',fecha:fecha},
			success: function (data) {
				$('#txt_edad').val(data);
			}
		});
	});
	// fin

	// clase select para el diseño 
	$(".select2").css({
	    'width': '100%',
	    allow_single_deselect: true,
	    no_results_text: "No se encontraron resultados",
	    }).select2().on("change", function (e) {
		$(this).closest('form').validate().element($(this));
    });

	$("#select_civil,#select_pais,#select_provincia,#select_ciudad,#select_sangre,#select_areas,#select_cargo").select2({
	  placeholder: "Seleccione una opción",
	  allowClear: true
	});

	//selectores anidados para pais-provincia
	$("#select_pais").change(function () {
		$("#select_provincia").select2('val', 'All');
		$("#select_ciudad").select2('val', 'All');
        $("#select_pais option:selected").each(function () {
            id = $(this).val();
            $.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_provincia:'llenar_provincia',id_provincia: id},
				success: function (data) {
					$('#select_provincia').html(data);
				}
			});
	   });
	});
	// fin

	//selectores anidados para pais-provincia-ciudad
	$("#select_provincia").change(function () {
		$("#select_ciudad").select2('val', 'All');

        $("#select_provincia option:selected").each(function () {
            id = $(this).val();
            $.ajax({
				url: 'data/ficha_ingresos/app.php',
				type: 'post',
				data: {llenar_ciudad:'llenar_ciudad',id_ciudad: id},
				success: function (data) {
					$('#select_ciudad').html(data);
				}
			});
	   });
	});
	// fin 

	// INICIO llamado funciones de procesos de inicio 
	llenar_select_bancos();
	llenar_select_areas();
	llenar_select_cargo();
	llenar_select_pais();
	llenar_tabla();
	llenar_tabla_fichas();
	init();
	// FIN llamado funciones de procesos de inicio

	function init () {
		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
	}

	// lenar combo bancos
	function llenar_select_bancos() {
		$("#select_banco").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_bancos:'llenar_bancos'},
			success: function (data) {
				$('#select_banco').html(data);
			}
		});
	}
	// 

	// llenar combo de las areas
	function llenar_select_areas() {
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_areas:'llenar_areas'},
			success: function (data) {
				$('#select_areas').html(data);
			}
		});
	}
	// fin

	// llenar combo cargos
	function llenar_select_cargo() {
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_cargo:'llenar_cargo'},
			success: function (data) {
				$('#select_cargo').html(data);
			}
		});
	}
	// fin

	// llenar combo del pais
	function llenar_select_pais() {
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_pais:'llenar_pais'},
			success: function (data) {
				$('#select_pais').html(data);
			}
		});
	}
	// fin

	// abrir en una nueva ventana reporte fichas
	$scope.methodspdf = function(id) { 
		var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+id,'_blank'); 
	} 
	// fin

	// eliminar tr tabla cursos realizados
	$scope.methodseliminar = function() { 
		$("a.dc_btn_accion").click(function() {
			$(this).parents("tr").fadeOut("normal", function() {
	        	$(this).remove(); 
	        }); 
		});
	} 
	// fin

	// eliminar tr tabla cuentas bancarias
	$scope.methodseliminar2 = function() { 
		$("a.dc_btn_accion2").click(function() {
			$(this).parents("tr").fadeOut("normal", function() {
	        	$(this).remove(); 
	        }); 
		});
	}
	// fin 

	// cargar datos desde la tabla a los formularios
	$scope.methodsedit = function(id) { 
		// cargar datos personales
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_personal:'llenar_personal', id:id},
			dataType: 'json',
			success: function (data) {
				var tama = data.length;
				for (var i = 0; i < tama; i = i + 23) {
					$("#id_personal").val(data[i]);
					if(data[i + 1] == 'true') {
						document.getElementById("inp_relacion").checked = true
					} else {
						document.getElementById("inp_relacion").checked = false
					}
					$("#txt_nombres").val(data[i + 2]);
					$("#txt_apellidos").val(data[i + 3]);
					$("#txt_cedula").val(data[i + 4]);
					$("#txt_fecha_nacimiento").val(data[i + 5]);
					$("#txt_edad").val(data[i + 6]);
					$("#txt_telf_fijo").val(data[i + 7]);
					$("#txt_telf_celular").val(data[i + 8]);
					$("#select_civil").select2('val', data[i + 9]).trigger("change");
					$("#txt_cargas").val(data[i + 10]);
					$("#txt_email").val(data[i + 11]);
					if(data[i + 12] == 'Primaria') {
						document.getElementById("rb_primaria").checked = true
					} else {
						document.getElementById("rb_primaria").checked = false	
					}

					if(data[i + 12] == 'Ciclo Basico') {
						document.getElementById("rb_basico").checked = true
					} else {
						document.getElementById("rb_basico").checked = false
					}

					if(data[i + 12] == 'Bachiller') {
						document.getElementById("rb_bachiller").checked = true
					} else {
						document.getElementById("rb_bachiller").checked = false
					}

					if(data[i + 12] == 'Universitario') {
						document.getElementById("rb_universitario").checked = true
					} else {
						document.getElementById("rb_universitario").checked = false
					}

					$("#txt_especialidad").val(data[i + 13]);
					if(data[i + 14] == 'PROPIA') {
						document.getElementById("rb_propia").checked = true
					} else {
						document.getElementById("rb_propia").checked = false
					}

					if(data[i + 14] == 'ARRIENDO') {
						document.getElementById("rb_arriendo").checked = true
					} else {
						document.getElementById("rb_arriendo").checked = false
					}

					if(data[i + 14] == 'FAMILIAR') {
						document.getElementById("rb_familiar").checked = true
					} else {
						document.getElementById("rb_familiar").checked = false
					}

					if(data[i + 14] == 'OTRO') {
						document.getElementById("rb_otro").checked = true
					} else {
						document.getElementById("rb_otro").checked = false
					}
					$("#txt_barrio").val(data[i + 15]);
					$("#txt_sector").val(data[i + 16]);
					$("#txt_direccion").val(data[i + 17]);
					$("#select_sangre").select2('val', data[i + 18]).trigger("change");
					$("#txt_alergia").val(data[i + 19]);
					$("#txt_enfermedad").val(data[i + 20]);
					$("#txt_ini_trab").val(data[i + 21]);
					$("#txt_fecha_aplicacion").val(data[i + 22]);
				}	
			}
		});

		// llenar cursos realizados
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_cursos_realizados:'llenar_cursos_realizados', id:id},
			success: function (response) {
				$('#tbt_cursos tbody').html(response);
			}
		});

		// llenar cuentas bancarias
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_cuentas_bancarias:'llenar_cuentas_bancarias', id:id},
			success: function (data) {
				$('#tbt_cuentas tbody').html(data);
			}
		});

		// cargar trabajos anteriores
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_trabajos_anteriores:'llenar_trabajos_anteriores', id:id},
			dataType: 'json',
			success: function (data) {
				var tama = data.length;
				for (var i = 0; i < tama; i = i + 8) {
					$("#txt_empresa").val(data[i]);
					$("#txt_cargo").val(data[i + 1]);
					$("#txt_direccion_trab").val(data[i + 2]);
					$("#txt_telf_fijo_trab").val(data[i + 3]);
					$("#txt_telf_celular_trab").val(data[i + 4]);
					$("#txt_jefe").val(data[i + 5]);
					$("#id-date-range-picker-1").val(data[i + 6]);
					$("#txt_ciudad_trab").val(data[i + 7]);
				}	
			}
		});

		// cargar datos familiares
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_datos_familiares:'llenar_datos_familiares', id:id},
			dataType: 'json',
			success: function (data) {
				var tama = data.length;
				for (var i = 0; i < tama; i = i + 6) {
					$("#txt_nombres_familia").val(data[i + 1]);
					$("#txt_parentesco").val(data[i + 2]);
					$("#txt_telf_familia").val(data[i + 3]);
					$("#txt_dir_fami").val(data[i + 4]);
					$("#txt_ciudad_fami").val(data[i + 5]);
				}	
			}
		});
		// fin

		// cargar cargos personales
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {llenar_cargos_personales:'llenar_cargos_personales', id:id},
			dataType: 'json',
			success: function (data) {
				var tama = data.length;
				for (var i = 0; i < tama; i = i + 2) {
					$("#select_areas").select2('val', data[i]).trigger("change");
					$("#select_cargo").select2('val', data[i + 1]).trigger("change");
				}	
			}
		});
		// fin

		// cargar combos dependientes
		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {cargar_id_ciudad:'cargar_id_ciudad', id:id},
			dataType: 'json',
			success: function (data) {
				id_ciudad = data.id_ciudad;

				$.ajax({
					url: 'data/ficha_ingresos/app.php',
					type: 'post',
					data: {cargar_id_provincia:'cargar_id_provincia', id:id_ciudad},
					dataType: 'json',
					success: function (data) {
						id_provincia = data.id_provincia;
						
						$.ajax({
							url: 'data/ficha_ingresos/app.php',
							type: 'post',
							data: {cargar_id_pais:'cargar_id_pais', id:id_provincia},
							dataType: 'json',
							success: function (data) {
								id_pais = data.id_pais;

								$("#select_pais").select2('val', id_pais).trigger("change");

								$.ajax({
									url: 'data/ficha_ingresos/app.php',
									type: 'post',
									data: {llenar_provincia:'llenar_provincia',id_provincia: id_pais},
									success: function (data) {
										$('#select_provincia').html(data);
										$("#select_provincia").select2('val', id_provincia).trigger("change");

										$.ajax({
											url: 'data/ficha_ingresos/app.php',
											type: 'post',
											data: {llenar_ciudad:'llenar_ciudad',id_ciudad: id_provincia},
											success: function (data) {
												$('#select_ciudad').html(data);
												$("#select_ciudad").select2('val', id_ciudad).trigger("change");
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
		// fin 

		$("#btn_0").attr('data-last','Modificar');
	    $('#myModal').modal('hide');
	} 
	// fin 

	// llenar tablas de fichas
	function llenar_tabla_fichas() {
		$('#dynamic-table').dataTable().fnClearTable();

		$.ajax({
			url: 'data/ficha_ingresos/app.php',
			type: 'post',
			data: {cargar_tabla_fichas:'cargar_tabla_fichas'},
			dataType: 'json',
			success: function(response) { 
				var tabla = $('#dynamic-table').DataTable();
				for (var i = 0; i < response.length; i++) {
					var pdf = "<button type='button' class='btn btn-white btn-pink btn-sm'  onclick=\"angular.element(this).scope().methodspdf('"+response[i].id+"')\"><span class='fa fa-file-pdf-o pink'> PDF</button>";
					var editar = "<button type='button' class='btn btn-white btn-green btn-sm'  onclick=\"angular.element(this).scope().methodsedit('"+response[i].id+"')\"><span class='fa fa fa-pencil green'> EDITAR</button>";
					var acciones =  editar + ' ' + pdf;

					tabla.row.add([
			            response[i]['cedula_identificacion'],
			            response[i]['nombres'],
			            response[i]['apellidos'],
			            response[i]['fecha_aplicacion'],
			            acciones
	                ]).draw(false);                            
		        }
			}
		});
	}
	// fin

	// modal fichas de ingreso
	function abrir_buscador() {
		$('#myModal').modal('show');
	}
	// fin

	// estilo tabla dinamica
	function llenar_tabla() {
		$('#dynamic-table').dataTable({
			language: {
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_ registros",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
			    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar: ",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			}
		});
	}
	// fin

	// guardar fichas
	function proceso_guardar() {
		$('#dynamic-table').dataTable().fnClearTable();
		var form_uno=$("#form_personal").serialize();
		var form_dos= $("#form_bancarios").serialize();
		var form_tres= $("#form_familia").serialize();
		var submit = "btn_guardar";

		//varibles cursos realizados
		var cursos = [];
       	$("#tbt_cursos tbody tr").each(function (index) {  
       		var element = {};
	        $(this).children("td").each(function (index) {                               
	            switch (index) {                                            
	                case 0:
	                	element.curso = $(this).text();
	                    break; 
	                case 1:
	                    element.estab = $(this).text();
	                    break; 
	                case 2:
	                    element.tiempo = $(this).text();
	                    break;
	            }	            
	        });
	        cursos.push(element);
	    });
	    // fin variables cursos

	    //varibles cuentas
	    var cuentas = [];
	    $("#tbt_cuentas tbody tr").each(function (index) {  
       		var element = {};
	        $(this).children("td").each(function (index) {                               
	            switch (index) {                                            
	                case 0:
	                	element.tipo_cuen = $(this).text();
	                    break; 
	                case 1:
	                    element.id_cuen = $(this).text();
	                    break; 
	                case 3:
	                    element.numero_cuen = $(this).text();
	                    break;
	            }	            
	        });
	        cuentas.push(element);
	    });
	    // fin variables cuentas

		$.ajax({
	        url: "data/ficha_ingresos/app.php",
	        data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_guardar=" +submit+"&campos1="+JSON.stringify(cursos)+"&campos2="+JSON.stringify(cuentas),
	        type: "POST",
	        success: function (data) {
	        	var val = data;
	        	if(data != '') {
					bootbox.alert("Gracias! Por su Información Datos Correctamente Guardados!", function() {
					  var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+val,'_blank'); 
					  location.reload();
					});
					llenar_tabla_fichas();
		    	}
	        },
	        error: function (xhr, status, errorThrown) {
		        alert("Hubo un problema!");
		        console.log("Error: " + errorThrown);
		        console.log("Status: " + status);
		        console.dir(xhr);
	        }
	    });
	}
	// fin

	// modificar las fichas
	function proceso_modificar() {
		$('#dynamic-table').dataTable().fnClearTable();
		var form_uno = $("#form_personal").serialize();
		var form_dos = $("#form_bancarios").serialize();
		var form_tres = $("#form_familia").serialize();
		var submit = "btn_modificar";

		//varibles cursos realizados
		var cursos = [];
       	$("#tbt_cursos tbody tr").each(function (index) {  
       		var element = {};
	        $(this).children("td").each(function (index) {                               
	            switch (index) {                                            
	                case 0:
	                	element.curso = $(this).text();
	                    break; 
	                case 1:
	                    element.estab = $(this).text();
	                    break; 
	                case 2:
	                    element.tiempo = $(this).text();
	                    break;
	            }	            
	        });
	        cursos.push(element);
	    });
	    // fin variables cursos

	    //varibles cuentas
	    var cuentas = [];
	    $("#tbt_cuentas tbody tr").each(function (index) {  
       		var element = {};
	        $(this).children("td").each(function (index) {                               
	            switch (index) {                                            
	                case 0:
	                	element.tipo_cuen = $(this).text();
	                    break; 
	                case 1:
	                    element.id_cuen = $(this).text();
	                    break; 
	                case 3:
	                    element.numero_cuen = $(this).text();
	                    break;
	            }	            
	        });
	        cuentas.push(element);
	    });
	    // fin variables cuentas

	    $.ajax({
	        url: "data/ficha_ingresos/app.php",
	        data: form_uno+"&"+form_dos+"&"+form_tres+"&btn_modificar=" +submit+"&campos1="+JSON.stringify(cursos)+"&campos2="+JSON.stringify(cuentas),
	        type: "POST",
	        success: function (data) {
	        	var val = data;
	        	if(data != '') {
	        		bootbox.alert("Gracias! Por su Información Datos Correctamente Modificados!", function() {
					  var myWindow = window.open("data/reportes/ficha_ingreso.php?hoja=A4&id="+val,'_blank'); 
					  location.reload();
					});
					llenar_tabla_fichas();
		    	}                                                
	        },
	        error: function (xhr, status, errorThrown) {
		        alert("Hubo un problema!");
		        console.log("Error: " + errorThrown);
		        console.log("Status: " + status);
		        console.dir(xhr);
	        }
	    });
	}
	// fin

	// abrir buscador fichas de ingreso
	$('#abrir_buscador').click(function() {
		abrir_buscador();
	});
	// fin

	// cargar datos a la tabla de cursos realizados
	$('#btn_cargar').click(function() {
		var respuesta = $('#form_modal_cursos').valid();
		var celdas = document.getElementById("tbt_cursos").rows.length;
		var vector = new Array();
		var cont = 0;
		var repe = 0;

		if (respuesta == true) {
			if(celdas != '5') {
				$("#tbt_cursos tbody tr").each(function (index) {                                                                 
		            $(this).children("td").each(function (index) {                               
		                switch (index) {                                            
		                    case 0:
		                    vector[cont] = $(this).text();   
		                    break;                                                                                                                               
		                }                                         
		            });
		            cont++;
		        });

		        for(var i=0 ; i<vector.length; i++) {
		            if(vector[i] == $('#txt_nombre_curso').val()) {
		                repe++;
		            }
		        }

		        if(repe == '0') {
				var html_fila = '<tr>'
						+'<td>'+$('#txt_nombre_curso').val()+'</td>'
						+'<td>'+$('#txt_establecimiento_curso').val()+'</td>'
						+'<td>'+$('#id-date-range-picker-1').val()+'</td>'
						+'<td>'+"<div class='hidden-sm hidden-xs action-buttons'><a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick=\"angular.element(this).scope().methodseliminar(event)\"></i></a></div>"+'</td>'
					+'</tr>'

				$('#tbt_cursos tbody').append(html_fila);	
				$('#txt_nombre_curso').val('');
				$('#txt_establecimiento_curso').val('');
				$('#modal-cursos-realizados').modal('hide');
				} else {
					if(repe == '1') {
						$.gritter.add({
							title: 'El curso ya esta ingresado',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$('#txt_nombre_curso').val('');
					}
				}
			} else {
				$.gritter.add({
					title: 'Alcanzo límite de cursos permitidos',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
			}
		}
	});
	// fin

	// cargar datos a la tabla de cuentas
	$('#btn_cargar_cuentas').click(function() {
		var respuesta = $('#form_modal_cuentas').valid();
		var combo = document.getElementById("select_banco");
		var celdas = document.getElementById("tbt_cuentas").rows.length;
		var vector = new Array();
		var cont = 0;
		var repe = 0;

		if (respuesta == true) {
			if(celdas != '3') {
				$("#tbt_cuentas tbody tr").each(function (index) {                                                                 
		            $(this).children("td").each(function (index) {                               
		                switch (index) {                                            
		                    case 0:
		                    vector[cont] = $(this).text();   
		                    break;                                                                                                                               
		                }                                         
		            });
		            cont++;
		        });

		        for(var i=0 ; i<vector.length; i++) {
		            if(vector[i] == $('#select_cuenta').val()) {
		                repe++;
		            }
		        }

		        if(repe == '0') {
				var html_fila = '<tr>'
						+'<td>'+$('#select_cuenta').val()+'</td>'
						+'<td style="display: none;">'+$('#select_banco').val()+'</td>'
						+'<td>'+combo.options[combo.selectedIndex].text+'</td>'
						+'<td>'+$('#txt_numero_banco').val()+'</td>'
						+'<td>'+"<div class='hidden-sm hidden-xs action-buttons'><a class='red dc_btn_accion2 tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick=\"angular.element(this).scope().methodseliminar2(event)\"></i></a></div>"+'</td>'
					+'</tr>'

				$('#tbt_cuentas tbody').append(html_fila);	
				$('#txt_numero_banco').val('');
				$('#modal-cuentas-bancarias').modal('hide');
				llenar_select_bancos();
				$("#select_cuenta").select2('val', 'All');
				} else {
					if(repe == '1') {
						$.gritter.add({
							title: 'El tipo de cuenta ya esta ingresada',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$("#select_cuenta").select2('val', 'All');
					}
				}
			} else {
				$.gritter.add({
					title: 'Alcanzo límite de cuentas permitidas',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
			}
		}
	});
	// fin

	// id general
	function equipo(id) {
		var data_global;
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			dataType: 'json',
			data: {consultar_id_cargo:'consultar_id_cargo', id:id},
			async:false,
			success: function (data) {
				data_global = data.nombre
			}
		});
		return data_global;
	}
	// fin

		$('#modal-wizard-container').ace_wizard();
		$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
		
		$(document).one('ajaxloadstart.page', function (e) {
			//in ajax mode, remove remaining elements before leaving page
			$('[class*=select2]').remove();
		});
	})
});	