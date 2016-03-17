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
			bootbox.dialog({
				message: "Gracias! Por su Información Datos Correctamente Guardados!", 
				buttons: {
					"success" : {
						"label" : "OK",
						"className" : "btn-sm btn-primary"
					}
				}
			});
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
			select_pais: {
				required: true				
			},
			select_provincia: {
				required: true				
			},
			select_ciudad: {
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
				min: "Por Favor, Ingrese número valido de cargas familiares",
				max: "Por Favor, Ingrese número valido de cargas familiares"
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
			select_pais: {
				required: "Por favor, Elija un País",
			},
			select_provincia: {
				required: "Por favor, Elija una Provincia",
			},
			select_ciudad: {
				required: "Por favor, Elija una Ciudad",
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
		rules: {
			select_banco: {
				required: true				
			},
		},
		messages: {
			select_banco: {
				required: "Por favor, Elija una opción",
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
	$('.telefonos').mask('(999) 999-9999');
	// rango de los tiempos de trabajo
	$('input[name=tiempo1], input[name=tiempo2], input[name=tiempo3]').daterangepicker({
		'applyClass' : 'btn-sm btn-success',
		'cancelClass' : 'btn-sm btn-default',
		locale: {
			applyLabel: 'Aplicar',
			cancelLabel: 'Cancelar',
		}
	})
	//Se utiliza para que el campo de texto solo acepte letras
	$(".letras").keypress(function (key) {
        window.console.log(key.charCode)
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
    $('.numeros').keyup(function (){
        this.value = (this.value + '').replace(/[^0-9]/g, '');
      });
    //////////Validación de la Cédula///////////////////////////////////
    validarDocumento  = function() {          
	    numero = document.getElementById('txt_cedula').value;
	    /* alert(numero); */
	      var suma = 0;      
	      var residuo = 0;      
	      var nat = false;      
	      var numeroProvincias = 22;                  
	      var modulo = 11;
	      if (numero.length < 10 ){              
	         $.gritter.add({
					title: 'Incorrecto',
					text: 'El número ingreado no esta completo o en invalido',
					class_name: 'gritter-error',
					time:2000
				});
	      }
	    /* Los primeros dos digitos corresponden al codigo de la provincia */
	      provincia = numero.substr(0,2);      
	      if (provincia < 1 || provincia > numeroProvincias){           
	        alert('El código de la provincia (dos primeros dígitos) es inválido');
	     	return false;       
	      }
	    /* Aqui almacenamos los digitos de la cedula en variables. */
	      d1  = numero.substr(0,1);         
	      d2  = numero.substr(1,1);         
	      d3  = numero.substr(2,1);         
	      d4  = numero.substr(3,1);         
	      d5  = numero.substr(4,1);         
	      d6  = numero.substr(5,1);         
	      d7  = numero.substr(6,1);         
	      d8  = numero.substr(7,1);         
	      d9  = numero.substr(8,1);         
	      d10 = numero.substr(9,1);                    
	    /* El tercer digito es: */                           
	    /* 9 para sociedades privadas y extranjeros   */         
	    /* 6 para sociedades publicas */         
	    /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
	    if (d3==7 || d3==8){           
	        alert('El tercer dígito ingresado es inválido');                     
	        return false;
	    }             
	    /* Solo para personas naturales (modulo 10) */         
	      if (d3 < 6){           
	        nat = true;            
	        p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
	        p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
	        p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
	        p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
	        p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
	        p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
	        p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
	        p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
	        p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
	        modulo = 10;
	    }         
	      suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
	      residuo = suma % modulo;                                         
	    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
	      digitoVerificador = residuo==0 ? 0: modulo - residuo;                
	      if(nat == true){         
	         if (digitoVerificador != d10){                          
	            $.gritter.add({
					title: 'Incorrecto',
					text: 'Porvafor Verifique que su número de cédula sea correcta',
					class_name: 'gritter-error',
					time:2000
				});
	         }         
	        
	      }      
	      return true;   
   		}            
	/////////////////////////////////////////////////////
	$("#txt_fecha_nacimiento").change(function(){
		var fecha=$(this).val()
		//console.log(fecha);
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
	///clase select para el diseño///////////
	$(".select2").css({
	    	'width':'60%',
	    	'text-align':'left',
	    }).select2().on("change", function(e) {
		$(this).closest('form').validate().element($(this));
    })
	//selectores anidados para pais-provincia
	$("#select_pais").change(function () {
        $("#select_pais option:selected").each(function () {
            id = $(this).val();
            $.ajax({
			url: 'data/personal/app.php',
			type: 'post',
			data: {llenar_provincia:'prov',id_provincia: id},
			success: function (data) {
				$('#select_provincia').html(data);
				}
			});
	   });
	})
	//selectores anidados para pais-provincia-ciudad
	$("#select_provincia").change(function () {
        $("#select_provincia option:selected").each(function () {
            id = $(this).val();
            $.ajax({
			url: 'data/personal/app.php',
			type: 'post',
			data: {llenar_ciudad:'prov',id_ciudad: id},
			success: function (data) {
				$('#select_ciudad').html(data);
				}
			});
	   });
	})
	//selector para poner el nombre de la ciudad en el cuadro de texto
	$("#select_ciudad").change(function(){
	var id_final=$(this).val()
		$.ajax({
			url: 'data/personal/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_ciudad:'nom_ciudad', id:id_final},
			success: function (data) {
			$('#txt_direccion').val(data.nom_ciudad+' /');
			}
		});
	})
	///////////////////////INICIO llamado funciones de procesos de inicio/////////////////////////////////
	llenar_select_bancos();
	llenar_select_areas();
	llenar_select_pais();
	init();
	///////////////////////FIN llamado funciones de procesos de inicio/////////////////////////////////

	function init(){
		//para la fecha del calendario
		$(".datepicker").datepicker({ 
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