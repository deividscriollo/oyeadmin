// create the controller and inject Angular's $scope
var app = angular.module('scotchApp').controller('ingresos_princiController',function ($scope) {
	// formulario registro de areas
	$('#form_areas').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombre_area: {
				required: true,
				remote: {
			        url: "data/ingresos_princi/app.php",
			        type: "post",
			        data: {
			          validar_existencia: ''
			        }
			      }
			},
		},
		messages: {
			txt_nombre_area: {
				required: "Por favor, Ingrese un Nombre",
				remote: "El nombre del área ya Existe"
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
				url: 'data/ingresos_princi/app.php',
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
						llenar_tabla_areas()
				}
			});
		}		
	}); 
//Fin de las validaciones de areas   
// Inicio Formulario registro de Bancos
	$('#form_bancos').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_nombre_banco: {
				required: true,
				required: true,
				remote: {
			        url: "data/ingresos_princi/app.php",
			        type: "post",
			        data: {
			          validar_existencia2: ''
			        }
			      }
			},
			txt_direccion: {
				required: true				
			},
		},
		messages: {
			txt_nombre_banco: {
				required: "Por favor, Ingrese un Nombre",
				remote: "El nombre del Banco ya Existe"
			},
			txt_direccion: {
				required: "Por favor, Ingrese una dirección",
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
				url: 'data/ingresos_princi/app.php',
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
						llenar_tabla_bancos()
				}
			});
		}		
	}); 

// fin de las validaciones de bancos
//llenado de la tabla de areas
	llenar_tabla_areas()
	llenar_tabla_bancos()
	init_principales()
});
////funciones principales
	function init_principales(){
			///formatos de telefono
			$('#txt_telf').mask('(999) 999-9999');
		}
//para llenar la tabla con los datos de las areas
	function llenar_tabla_areas(){
		$.ajax({
			url: 'data/ingresos_princi/app.php',
			type: 'post',
			data: {llenar_tabla_areas:'asjkef'},
			success: function (data) {
				$('#tbt_areas tbody').html(data);
			}
		});
	}
//para eliminar las areas con el cuadro de dialogo
	function eliminar_areas(id) {
		bootbox.confirm("ESTA SEGURO DE ELIMINAR EL AREA?", function(result) {
			if(result) {
				$.ajax({
					url: 'data/ingresos_princi/app.php',
					type: 'post',
					dataType:'json',
					data: {eliminar_areas:'asjkef', id: id},
					success: function (data) {
						//$('#tbt_programas tbody').html(data);
						$.gritter.add({
							title: 'Registro Eliminado',
							class_name: 'gritter-success',
							time:2000
						});
						llenar_tabla_areas()
					}
				});
			}
		});
	}
//para modificar las areas
	function modificar_areas(id) {
		$('#obj_nombre').html('');
		$('#obj_nombre').html('<span class="editable" name="x" id="edit_nombre"></span>');
		$.ajax({
			url: 'data/ingresos_princi/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_areas:'asjkef', id: id},
			success: function (data) {
				$("#edit_nombre").text(data['nombre'])			
				console.log(data);
				$('#modal-actualizar').modal('show');
				$('#edit_nombre').editable({
					type: 'text',
					name: 'actualizar_nombre_areas',
					value: data['nombre'],
					pk:id,
					url:'data/ingresos_princi/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_areas()
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
// FIN DE TODO LO CORRESPONDIENTE A AREAS
		//para llenar la tabla con los datos de programas
	function llenar_tabla_bancos(){
		$.ajax({
			url: 'data/ingresos_princi/app.php',
			type: 'post',
			data: {llenar_tabla_bancos:'asjkef'},
			success: function (data) {
				$('#tbt_bancos tbody').html(data);
			}
		});
	}
	//para eliminar los bancos con el cuadro de dialogo
	function eliminar_bancos(id) {
		bootbox.confirm("ESTA SEGURO DE ELIMINAR EL BANCO?", function(result) {
			if(result) {
				$.ajax({
					url: 'data/ingresos_princi/app.php',
					type: 'post',
					dataType:'json',
					data: {eliminar_bancos:'asjkef', id: id},
					success: function (data) {
						$.gritter.add({
							title: 'Registro Eliminado',
							class_name: 'gritter-success',
							time:2000
						});
						llenar_tabla_bancos()
					}
				});
			}
		});
	}

	//PARA MODIFICAR LOS BANCOS
	function modificar_bancos(id) {
		$('#obj_nom_banco, #obj_telefono, #obj_direccion').html('');
		$('#obj_nom_banco').html('<span class="editable" name="x" id="edit_nom_banco"></span>');
		$('#obj_telefono').html('<span class="editable" name="y" id="edit_telefono"></span>');
		$('#obj_direccion').html('<span class="editable" name="z" id="edit_direccion"></span>');
		$.ajax({
			url: 'data/ingresos_princi/app.php',
			type: 'post',
			dataType:'json',
			data: {consultar_datos_bancos:'asjkef', id: id},
			success: function (data) {
				$("#edit_nom_banco").text(data['nombre'])			
				$("#edit_telefono").text(data['telefono'])
				$("#edit_direccion").text(data['direccion'])
				console.log(data);
				$('#modal-actualizar-bancos').modal('show');
				//para actualizar el nombre de los Bancos
				$('#edit_nom_banco').editable({
					type: 'text',
					name: 'actualizar_nombre_bancos',
					value: data['nombre'],
					pk:id,
					url:'data/ingresos_princi/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_bancos()
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
			    //para actualizar los datos de telefono de Bancos
		    	$('#edit_telefono').editable({
					type: 'text',
					name: 'actualizar_telefono_bancos',
					value: data['telefono'],
					pk:id,
					url:'data/ingresos_princi/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_bancos()
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
			    //para actualizar los datos de Direccion de Bancos
		    	$('#edit_direccion').editable({
					type: 'text',
					name: 'actualizar_direccion_bancos',
					value: data['direccion'],
					pk:id,
					url:'data/ingresos_princi/app.php',
					validate:function(value){		                
				    	if(value=='') return 'Campo Requerido Ingrese Nombre';
				    },
				    success:function(data){
				    	llenar_tabla_bancos()
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