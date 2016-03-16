// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('ficha_programasController', function ($scope) {

    jQuery(function($) {
		$(".chosen-select").chosen({
			width: '100%',
		});

		$('[data-rel=tooltip]').tooltip();
		var $validation = true;
		$('#fuelux-wizard-container').ace_wizard({
			//step: 2 //optional argument. wizard will jump to step "2" at first
			//buttons: '.wizard-actions:eq(0)'
		})
		.on('actionclicked.fu.wizard' , function(e, info){
			if(info.step == 1 && $validation) {
				if(!$('#form_etapa1').valid()) e.preventDefault();
			}
			if(info.step == 2 && $validation) {
				if(!$('#form_etapa2').valid()) e.preventDefault();
			}
			if(info.step == 3 && $validation) {
				if(!$('#form_etapa3').valid()) e.preventDefault();
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
	$('#form_etapa1').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_diseño: {
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
			txt_email: {
				required: true				
			},
			txt_direccion: {
				required: true				
			},
			txt_nom_pro1: {
				required: true
			},
			txt_tipo_pro: {
				required: true
			},
			txt_publico: {
				required: true
			},
			txt_tematica: {
				required: true
			},
			txt_tiempo_dise: {
				required: true
			},
		},
		messages: {
			txt_diseño: {
				required: "Por favor, Digíte un Diseño de Proyecto",
			},
			txt_telf_fijo: { 	
				required: "Por favor, Digíte un teléfono Fijo",			
			},
			txt_cedula: { 	
				required: "Por favor, Digíte el Número de Cédula",
				digits: "Sólo son permitido dígitos, Gracias",
				maxlength: "Por Favor, Ingrese los 10 dígitos del número de cédula"			
			},
			txt_telf_celular: {
				required: "Por favor, Digíte un telefono Celular",
			},
			txt_email: {
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail valido"
			},
			txt_direccion: {
				required: "Por favor, Digíte una Dirección Domiciliaria",
			},
			txt_nom_pro1: {
				required: "Por favor, Digíte almenos un nombre de programa",
			},
			txt_tipo_pro: {
				required: "Por favor, Digíte un Tipo de Programa",
			},
			txt_publico: {
				required: "Por favor, Digíte un Público Objetivo",
			},
			txt_tematica: {
				required: "Por favor, Digíte una Temática",
			},
			txt_tiempo_dise: {
				required: "Por favor, Digíte un Tiempo correspondiente",
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
				url: 'data/ficha_programas/app.php',
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
	$('#form_etapa2').validate({
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
				url: 'data/ficha_programas/app.php',
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
	$('#form_etapa3').validate({
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
				url: 'data/ficha_programas/app.php',
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
	// FIN DEL FORMULARIO ETAPA 3
	// INICIO DE VALIDACION FORMULARIO MODAL
	$('#btn_agregarprogramas').click(function(){
		var respuesta = $('#form_modal_equipo').valid();
		var cont = 1;
		if (respuesta == true) {
			
			var html_fila = '<tr>'
						+'<td>'+cont+'</td>'
						+'<td>'+$('#txt_nombre_conf').val()+'</td>'
						+'<td>'+$('#txt_telf_conf').val()+'</td>'
						+'<td>'+$('#txt_email_conf').val()+'</td>'
						+'<td>'+$('#select_cargo_conf').text()+'</td>'
						+'<td><button class="btn btn-xs btn-danger"><i class="ace-icon fa fa-trash-o bigger-120"></i></button></td>'
					+'</tr>'
			$('#tabla_equipo tbody').append(html_fila);			
			$('#form_modal_equipo').each (function(){
              this.reset();
            });
            llenar_select_equipo();
		}
	});

	$('#form_modal_equipo').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombre_conf: {
				required: true				
			},
			txt_telf_conf: {
				required: true				
			},
			txt_email_conf: {
				required: true				
			},
			select_cargo_conf: {
				required: true				
			},
		},
		messages: {
			txt_nombre_conf: {
				required: "Por favor, Digíte un Nombre",
			},
			txt_telf_conf: { 	
				required: "Por favor, Digíte un teléfono",			
			},
			txt_email_conf: {
				required: "Por favor, Ingrese un E-mail",
				email: "Por favor, Ingrese un E-mail valido"
			},
			select_cargo_conf: {
				required: "Por favor, Elija un cargo",
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
			
		}
	});
	// FIN DE VALIDACION FORMULARIO MODAL
	//////////////////PROCESO DE LA TABLA EQUIPO QUE LO CONFORMAN///////////////
	$('#btn_agregar').click(function(){
		$('#modal-equipo-conforma').modal('show')
	})
	///////////////FIN DE PROCESO DE LA TABLA////////////////////////////
	//definir formato campos números de teléfono
	$('.telefonos, #txt_telf_conf').mask('(999) 999-9999');
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
	/////////////proceso de guardar//////
	$( "#btn_guardar" ).click(function() {
		  proceso_guardar();
		});
	///clase select para el diseño///////////\
	$(".select2").css({
	    	'width':'100%',
	    	'text-align':'left',
	    }).select2().on("change", function(e) {
		$(this).closest('form').validate().element($(this));
    })
	///////////
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				  //console.log(e.target.getAttribute("href"));
				});
					
				$('#accordion').on('shown.bs.collapse', function (e) {
					//console.log($(e.target).is('#collapseTwo'))
				});
				
				
				$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
					//if($(e.target).attr('href') == "#home") doSomethingNow();
				});
	///////////
	///////////////////////INICIO llamado funciones de procesos de inicio/////////////////////////////////
	llenar_select_equipo();
	init();
	///////////////////////FIN llamado funciones de procesos de inicio/////////////////////////////////

	function init(){
	//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// //para la hora prevista
			$("#inicio_hora,#fin_hora ").datetimepicker({ 
		       pickDate: false
		    });
	}

	function llenar_select_equipo(){
		$("#select_cargo_conf").select2('val', 'All');
		$.ajax({
			url: 'data/ficha_programas/app.php',
			type: 'post',
			data: {llenar_equipo:'equip'},
			success: function (data) {
				$('#select_cargo_conf').html(data);
			}
		});
	}

	function proceso_guardar() {
		var form_uno=$("#form_etapa1").serialize()
		var form_dos= $("#form_etapa2").serialize()
		var form_tres= $("#form_etapa3").serialize()
		var submit = "btn_guardar"
		$.ajax({
        url: "data/ficha_programas/app.php",
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