// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('programasController',function ($scope) {
	// formulario registro
	$('#form_programas').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_codigo: {
				required: true,
				remote: {
			        url: "data/programas/app.php",
			        type: "post",
			        data: {
			          validar_existencia: ''
			        }
			      }

			},
			txt_nombre: {
				required: true				
			},
		},
		messages: {
			txt_codigo: {
				required: "Por favor, Digíte un Código",
				remote: "Codigo ya Existe"
			},
			txt_nombre: {
				required: "Por favor, Digíte un nombre de Programa"
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
				url: 'data/programas/app.php',
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

	// Validaciones del formulario 2 de las fichas
	$('#form_programas2').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_codigo2: {
				required: true,
				remote: {
			        url: "data/programas/app.php",
			        type: "post",
			        data: {
			          validar_existencia2: ''
			        }
			      }

			},
			txt_codigo2: {
				required: true				
			},
			select_codigo: {
				required: true				
			},
		},
		messages: {
			txt_codigo2: {
				required: "Por favor, Digíte un Código de Ficha",
				remote: "Codigo ya Existe"
			},
			select_codigo: {
				required: "Por favor, Seleccione un código de Programa"
			} 		
		},
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},
		submitHandler: function (form) {
			$.ajax({
				url: 'data/programas/app.php',
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
						llenar_tabla_programas()
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
	//para el selector de código de Programas
    $("#select_codigo").css({
    	'width':'345px',
    	'text-align':'left',
    }).select2({allowClear:true})
		.on('change', function(){
		$(this).closest('form').validate().element($(this));
	}); 
	//para seleccionar el codigo del programa	
	$.ajax({
		url: 'data/programas/app.php',
		type: 'post',
		data: {llenar_programas:'asjkef'},
		success: function (data) {
			$('#select_codigo').html(data);
		}
	});
	llenar_tabla_fichas()
	llenar_tabla_programas()
	
});
//para llenar la tabla con los datos de programas
	function llenar_tabla_programas(){
		$.ajax({
			url: 'data/programas/app.php',
			type: 'post',
			data: {llenar_tabla_programas:'asjkef'},
			success: function (data) {
				$('#tbt_programas tbody').html(data);
			}
		});
	}
//para eliminar los programas con el cuadro de dialogo
	function eliminar_programas(id) {
		bootbox.confirm("ESTA SEGURO DE ELIMINAR EL PROGRAMA?", function(result) {
			if(result) {
				$.ajax({
					url: 'data/programas/app.php',
					type: 'post',
					dataType:'json',
					data: {eliminar_programas:'asjkef', id: id},
					success: function (data) {
						//$('#tbt_programas tbody').html(data);
						$.gritter.add({
							title: 'Registro Eliminado',
							class_name: 'gritter-success',
							time:2000
						});
						llenar_tabla_programas()
					}
				});
			}
		});
	}
//para modificar los programas
	function modificar_programas(id) {
		$('#obj_codigo, #obj_nombre').html('');
		$('#obj_nombre').html('<span class="editable" name="x" id="edit_nombre"></span>');
		$('#obj_codigo').html('<span class="editable" name="y" id="edit_codigo"></span>');
		$.ajax({
			url: 'data/programas/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_programas:'asjkef', id: id},
			success: function (data) {
				$("#edit_nombre").text(data['nombre'])			
				$("#edit_codigo").text(data['codigo'])
				console.log(data);
				$('#modal-actualizar').modal('show');
				$('#edit_nombre').editable({
					type: 'text',
					name: 'actualizar_nombre_programas',
					value: data['nombre'],
					pk:id,
					url:'data/programas/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_programas()
				    	var json = jQuery.parseJSON(data);
				    	if (json['valid']!='true') {
				    		$.gritter.add({
								title: 'Proceso No Modificado',
								text: 'Porvafor Verifique que sus Datos esten llenos',
								class_name: 'gritter-error',
								time:2000
							});
				    	}
				    	if (json['valid']=='true') {
				    		$.gritter.add({
								title: 'Proceso Modificado Correctamente',
								text: 'Sus Datos han sido Modificados de forma Correcta',
								class_name: 'gritter-success',
								time:2000
							});	
				    	}
				    }
			    });
			    //para actualizar los datos de codigo de Programas
		    	$('#edit_codigo').editable({
					type: 'text',
					name: 'actualizar_codigo_programas',
					value: data['codigo'],
					pk:id,
					url:'data/programas/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_programas()
				    	var json = jQuery.parseJSON(data);
				    	if (json['valid']!='true') {
				    		$.gritter.add({
								title: 'Proceso No Modificado',
								text: 'Porvafor Verifique que sus Datos esten llenos',
								class_name: 'gritter-error',
								time:2000
							});
				    	}
				    	if (json['valid']=='true') {
				    		$.gritter.add({
								title: 'Proceso Modificado Correctamente',
								text: 'Sus Datos han sido Modificados de forma Correcta',
								class_name: 'gritter-success',
								time:2000
							});	
				    	}
				    }
			    });
			}
		});
	}

//para llenar la tabla con los datos de las Fichas
	function llenar_tabla_fichas(){
		$.ajax({
			url: 'data/programas/app.php',
			type: 'post',
			data: {llenar_tabla_fichas:'asjkef'},
			success: function (data) {
				$('#tbt_fichas tbody').html(data);
			}
		});
	}
//para eliminar las fichas con el cuadro de dialogo
	function eliminar_fichas(id) {
		bootbox.confirm("ESTA SEGURO DE ELIMINAR LA FICHA?", function(result) {
			if(result) {
				$.ajax({
					url: 'data/programas/app.php',
					type: 'post',
					dataType:'json',
					data: {eliminar_fichas:'asjkef', id: id},
					success: function (data) {
						$.gritter.add({
							title: 'Registro Eliminado',
							class_name: 'gritter-success',
							time:2000
						});
						llenar_tabla_fichas()
					}
				});
			}
		});
	}

//para modificar las Fihas
	function modificar_fichas(id) {
		$('#obj_cod_ficha').html('');
		$('#obj_cod_ficha').html('<span class="editable" name="x" id="edit_cod_ficha"></span>');
		$.ajax({
			url: 'data/programas/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_fichas:'asjkef', id: id},
			success: function (data) {
				$("#edit_cod_ficha").text(data['cod_ficha'])			
				console.log(data);
				$('#modal-actualizar-fichas').modal('show');
				$('#edit_cod_ficha').editable({
					type: 'text',
					name: 'actualizar_nombre_fichas',
					value: data['cod_ficha'],
					pk:id,
					url:'data/programas/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese el Código';
				    },
				    success:function(data){
				    	llenar_tabla_fichas()
				    	var json = jQuery.parseJSON(data);
				    	if (json['valid']!='true') {
				    		$.gritter.add({
								title: 'Proceso No Modificado',
								text: 'Porvafor Verifique que sus Datos esten llenos',
								class_name: 'gritter-error',
								time:2000
							});
				    	}
				    	if (json['valid']=='true') {
				    		$.gritter.add({
								title: 'Proceso Modificado Correctamente',
								text: 'Sus Datos han sido Modificados de forma Correcta',
								class_name: 'gritter-success',
								time:2000
							});	
				    	}
				    }
			    });
			}
		});
	}