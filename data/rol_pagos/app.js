angular.module('scotchApp').controller('rolpagosController', function ($scope) {

	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {	
		$('#tiempo_horas').ace_spinner({value:0,min:0,max:8,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		$('#dias_laborados').ace_spinner({value:0,min:0,max:31,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});	
		$('#extras').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#no_laborado').ace_spinner({value:0,min:0,max:99,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});		
		
		// formato archivo excel
		$('#archivo_excel').fileinput({
	        uploadUrl: '#',
	        uploadAsync: false,
	        minFileCount: 1,
	        maxFileCount: 20,
	        showUpload: true,
	        slugCallback: function(filename) {
	            return filename.replace('(', '_').replace(']', '_');
	        }
	    });
	    // fin

		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");

		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_empleado,#select_empleado2").select2({
		  allowClear: true
		});

		// funcion autocompletar la serie
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo_general").val();
		    for (var i = serie.length; i < 4; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin


		// funcion cargar maximo codigo rol
		function cargar_codigo() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {cargar_codigo_general:'cargar_codigo_general'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var codigo = data.codigo;
						var res = parseInt(codigo.substr(10, 30));
						res = res + 1;

						$("#codigo_general").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#codigo_general").val(validado);
					}
				}
			});
		}
		// fin

		//selectores anidados empleado
		$("#select_empleado").change(function () {
	        $("#select_empleado option:selected").each(function () {
	            id = $(this).val();

	            // cargar sueldo - cargo
	            $.ajax({
					url: 'data/rol_pagos/app.php',
					type: 'post',
					data: {llenar_cargos:'llenar_cargos',id: id},
					dataType: 'json',
					success: function (data) {
						var cargo = data.cargo;
						var sueldo = data.sueldo;
						$('#cargo').val(cargo);
						$('#sueldo').val(sueldo);
					}
				});
	            // fin

	            $.ajax({
					url: 'data/rol_pagos/app.php',
					type: 'post',
					data: {cargar_codigo_secuencia:'cargar_codigo_secuencia',id: id},
					dataType: 'json',
					success: function (data) {
						if(data != null) {
							var hoy = new Date();
							var dd = hoy.getDate();
							var mm = hoy.getMonth() + 1; 
							var anio = hoy.getFullYear();

							if(dd < 10) {
							    dd = '0' + dd;
							} 

							if(mm < 10) {
							    mm = '0' + mm;
							} 

							var codigo = data.codigo;
							var codigo_general = $('#codigo_general').val();
							var res = parseInt(codigo.substr(-9, 1));
							res = res + 1;
							console.log(res);
							var anios = anio.toString().substr(2, 4);
							var ini = codigo.substr(-7, 2);
							var cadena = 'RDP' + mm + anios + ini + res + codigo_general;
							$('#codigo').val(cadena);
						} else {
							$.ajax({
								url: 'data/facturas/app.php',
								type: 'post',
								data: {cargar_codigo:'cargar_codigo',id: id},
								dataType: 'json',
								success: function (data) {
									if(data != null) {
									// var id_empresa = data.id_empresa;
									// var inicio_fac_preimpresa = data.inicio_fac_preimpresa;
									// var item_factura = data.item_factura;

									// $("#serie_factura").val(inicio_fac_preimpresa);
									// var a = autocompletar(inicio_fac_preimpresa);
									// var validado = a + "" + inicio_fac_preimpresa;
									// $("#serie_factura").val(validado);
									}
								}
							});
						}
					}
				});

		   });
		});
		// fin

		// validacion punto
		function Valida_punto() {
		    var key;
		    if (window.event) {
		        key = event.keyCode;
		    } else if (event.which) {
		        key = event.which;
		    }

		    if (key < 48 || key > 57) {
		        if (key === 46 || key === 8) {
		            return true;
		        } else {
		            return false;
		        }
		    }
		    return true;
		}
		// fin

		// campos con validaciones
		$("#sueldo").keypress(Valida_punto);
		$("#sueldo_basico").keypress(Valida_punto);
		$("#horas_extras").keypress(Valida_punto);
		$("#comisiones").keypress(Valida_punto);
		$("#decimo_tercero").keypress(Valida_punto);
		$("#decimo_cuarto").keypress(Valida_punto);
		$("#total_ingresos").keypress(Valida_punto);
		$("#aporte_iess").keypress(Valida_punto);
		$("#pres_quierografarios").keypress(Valida_punto);
		$("#pres_anticipos").keypress(Valida_punto);
		$("#atrasos").keypress(Valida_punto);
		$("#faltas").keypress(Valida_punto);
		$("#total_descuentos").keypress(Valida_punto);
		$("#neto_pagar").keypress(Valida_punto);
		// fin

		// INICIO llamado funciones de procesos de inicio 
		llenar_select_empleado();
		llenar_select_empleado2();
		cargar_codigo();
		
		// llenar combo cargos
		function llenar_select_empleado() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado').html(data);
				}
			});
		}
		// fin

		// llenar combo cargos
		function llenar_select_empleado2() {
			$.ajax({
				url: 'data/rol_pagos/app.php',
				type: 'post',
				data: {llenar_empleado:'llenar_empleado'},
				success: function (data) {
					$('#select_empleado2').html(data);
				}
			});
		}
		// fin

		// // llenar combo cargos
		// function llenar_select_cargo() {
		// 	$.ajax({
		// 		url: 'data/rol_pagos/app.php',
		// 		type: 'post',
		// 		data: {llenar_cargo:'llenar_cargo'},
		// 		success: function (data) {
		// 			$('#select_cargo').html(data);
		// 		}
		// 	});
		// }
		// // fin

		// procesos calculos
		$('#btn_calcular').click(function() {
			if($('#select_empleado').val() == '') {
				$.gritter.add({
					title: 'Seleccione un Empleado',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
			} else {
				sueldo_basico();
			}
		});
		// fin

		// procesos calculos
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// limpiar tabla
		$('#btn_limpiar').click(function() {
			jQuery("#table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_roles.php",page:1}).trigger("reloadGrid");
		});
		// fin

		// ventana emergente importar
		$('#btn_importar').click(function() {
			$('#modal-importar').modal('show');
		});
		// fin

		// cargar excel prodcutos
		$('#btn_excel').click(function() {
			var formObj = document.getElementById("form_excel");
			var formData = new FormData(formObj);
			var inicioMinutos = 0;
			var inicioHoras = 0;
			var transcurridoMinutos = 0;
			var transcurridoHoras = 0;

			$.ajax({
                url: "data/rol_pagos/cargar_excel.php",
                type: "POST",
                data:  formData,
                mimeType:"multipart/form-data",
                dataType: 'json',
                contentType: false,
                cache: false, 
                processData:false,
                success: function(data, textStatus, jqXHR) {
	    		    var suma = 0;
	                for(var i = 0; i<data.length; i+=13) {
	                	if(data[i+11] != '') {
	                		var tiempo = data[i+11];

		                	inicioMinutos = parseInt(tiempo.substr(3,2));
	  						inicioHoras = parseInt(tiempo.substr(0,2));


	  						transcurridoMinutos = transcurridoMinutos + inicioMinutos;
	  						transcurridoHoras = transcurridoHoras + inicioHoras;
		     //            	// suma =suma + data[i+15];

		                	if (transcurridoMinutos < 0) {
							    transcurridoHoras--;
							    transcurridoMinutos = 60 + transcurridoMinutos;
							}
							  
							horas = transcurridoHoras.toString();
							minutos = transcurridoMinutos.toString();
							  
							if (horas.length < 2) {
							    horas = "0"+horas;
							}
							  
							if (horas.length < 2) {
							    horas = "0"+horas;
							}
	                	}                	
	                }
	                // alert(transcurridoMinutos)
	                // alert(horas+":"+minutos);
		        }	        
		    });
		});
		// fin

		// realizar calculos
		function sueldo_basico() {
			var sueldo = $('#sueldo').val();
			var horas = $('#tiempo_horas').val();
			var dias = $('#dias_laborados').val();
			var extras = $('#extras').val();
			var no_laborado = $('#no_laborado').val();

			var comisiones = $('#comisiones').val();

			var aporte_iess = $('#aporte_iess').val();
			var pres_quierografarios = $('#pres_quierografarios').val();
			var pres_anticipos = $('#pres_anticipos').val();
			var atrasos = $('#atrasos').val();
			var permisos = $('#permisos').val();
			var faltas = $('#faltas').val();

			var sueldo_basico = 0;
			var horas_extras = 0;
			var decimo_tercero = 0;
			var decimo_cuarto = 0;
			var total_ingresos = 0;
			var total_descuentos = 0;
			var neto_pagar = 0;
			var valor_no_laborado = 0;


			// redondeos
			sueldo = parseFloat(sueldo).toFixed(3);
			$('#sueldo').val(sueldo);
			// fin

			// calculo sueldo basico
			sueldo_basico = ((parseFloat(sueldo/30)/8) * 30 * parseFloat(horas)).toFixed(3);
			$('#sueldo_basico').val(sueldo_basico);
			// fin 

			// calculo horas extras
			horas_extras = (parseFloat(sueldo/15)/8 * parseFloat(extras)).toFixed(3);
			$('#horas_extras').val(horas_extras);
			// fin 

			// calculo decimo tercero
			decimo_tercero = ((parseFloat(sueldo/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(3); 
			$('#decimo_tercero').val(decimo_tercero);
			// fin

			// calculo decimo cuarto
			decimo_cuarto = ((parseFloat(sueldo/365)/8) * parseFloat(dias) * parseFloat(horas)).toFixed(3); 
			$('#decimo_cuarto').val(decimo_cuarto);
			// fin 

			// calculo total ingresos
			total_ingresos = (parseFloat(sueldo_basico) + parseFloat(horas_extras) + parseFloat(comisiones) + parseFloat(decimo_tercero) + parseFloat(decimo_cuarto)).toFixed(3); 
			$('#total_ingresos').val(total_ingresos);
			//

			// calculo valor horas no trabajadas
			valor_no_laborado = ((parseFloat(sueldo/30)/8) * parseFloat(horas) * parseFloat(no_laborado)).toFixed(3);
			$('#faltas').val(valor_no_laborado);
			// fin

			// calculo total descuentos
			total_descuentos = (parseFloat(aporte_iess) + parseFloat(pres_quierografarios) + parseFloat(pres_anticipos) + parseFloat(atrasos) + parseFloat(permisos) + parseFloat(valor_no_laborado)).toFixed(3); 
			$('#total_descuentos').val(total_descuentos);
			//

			// calculo neto pagar
			neto_pagar = (total_ingresos - total_descuentos).toFixed(3);
			$('#neto_pagar').val(neto_pagar);
		}
		// fin

		$('#btn_0').click(function() {
			guardar_rol();
		});


		$('#btn_filtrar').click(function() {
			gridReload();
		});

		// proceso guardar rol
		function guardar_rol() {
			var form_uno = $("#form_rolpagos").serialize();
			var submit = "btn_guardar";

			if($('#codigo').val() == '') {
				$.gritter.add({
					title: 'Ingrese un Código',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
				$('#codigo').focus();
			} else {
				if($('#select_empleado').val() == '') {
					$.gritter.add({
						title: 'Seleccione un Empleado',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
				} else {
					$.ajax({
				        url: "data/rol_pagos/app.php",
				        data: form_uno+"&btn_guardar=" + submit,
				        type: "POST",
				        success: function (data) {
				        	var val = data;
				        	if(data != '') {
				        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
								  var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
								  location.reload();
								});
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
			}	
		}
	});
	// fin

	// abrir en una nueva ventana reporte roles de pago
	$scope.methodspdf = function(id) { 
		var myWindow = window.open('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650');
	} 
	// fin

	// abrir en una nueva ventana reporte guardar roles
	$scope.methodspdfguardar = function(id) { 
		var myWindow = window.location.assign('data/reportes/rol_pagos.php?hoja=A5&id='+id,'popup','width=900,height=650','PDF');
		// myWindow.focus();
		// myWindow.print();

	} 
	// fin

	function gridReload(){
		var id_personal = $('#select_empleado2').val();
		var fecha_inicio = $('#fecha_inicio').val();
		var fecha_fin = $('#fecha_fin').val();
		jQuery("#table").jqGrid('setGridParam',{url:"data/rol_pagos/xml_empleados.php?id_personal="+id_personal+"&fecha_inicio="+fecha_inicio+"&fecha_fin="+fecha_fin,page:1}).trigger("reloadGrid");
	}
	
	/*jqgrid*/    
		jQuery(function($) {
		    var grid_selector = "#table";
		    var pager_selector = "#pager";
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {	        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#container").width()-30);
		    });
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
		            }, 0);
		        }
		    });

		    // buscador clientes
		    jQuery(grid_selector).jqGrid({	        
		        datatype: "xml",
		        url: 'data/rol_pagos/xml_roles.php',
		        colNames: ['ID','CÓDIGO ROL','IDENTIDICACIÓN','NOMBRES','APELLIDOS','DIRECCIÓN','FECHA EMISIÓN','NETO PAGAR','REPORTE'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'codigo',index:'codigo',frozen : true,align:'left',search:true,width: '150px'},
		            {name:'cedula_identificacion',index:'cedula_identificacion',frozen : true,align:'left',search:true,width: '150px'},
		            {name:'nombres',index:'nombres',frozen : true,align:'left',search:true,width: '250px'},
		            {name:'apellidos',index:'apellidos',frozen : true,align:'left',search:false,width: '250px'},
		            {name:'direccion',index:'direccion',frozen : true,align:'left',search:false,width: '250px', hidden: false},
		            {name:'fecha_emision',index:'fecha_emision',frozen : true,align:'left',search:false,width: '250px'},
		            {name:'neto_pagar',index:'neto_pagar',frozen : true,align:'left',search:false},
		            {name:'accion',index:'accion',frozen : true,align:'center',search:false,width: '100px'},
		        ],          
		        rowNum: 10,       
		        width:600,
		        shrinkToFit: false,
		        height:330,
		        rowList: [10,20,30],
		        pager: pager_selector,        
		        sortname: 'id',
		        sortorder: 'asc',
		        altRows: true,
		        multiselect: false,
		        viewrecords : true,
		        loadComplete : function() {
		            var table = this;
		            setTimeout(function(){
		                styleCheckbox(table);
		                updateActionIcons(table);
		                updatePagerIcons(table);
		                enableTooltips(table);
		            }, 0);
		        },
		        gridComplete: function() {
					var ids = jQuery(grid_selector).jqGrid('getDataIDs');
					for(var i=0;i < ids.length;i++){
						var id_rol = ids[i];
						pdf_abrir = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_rol+"')\" title='Abrir PDF'><i class='fa fa-file-pdf-o green' style='cursor:pointer; cursor: hand'></i></a>"; 
						pdf_guardar = "<a onclick=\"angular.element(this).scope().methodspdfguardar('"+id_rol+"')\" title='Guardar PDF'><i class='fa fa-save green' style='cursor:pointer; cursor: hand'></i></a>"; 
						jQuery(grid_selector).jqGrid('setRowData',ids[i],{accion:pdf_abrir +'    '+ pdf_guardar});
					}	
				},
		        ondblClickRow: function(rowid) {     	            	            
		            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
	            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	            
		        },
		        caption: "LISTA ROLES DE PAGO"
		    });
	
		    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

		    function aceSwitch( cellvalue, options, cell ) {
		        setTimeout(function(){
		            $(cell) .find('input[type=checkbox]')
		            .addClass('ace ace-switch ace-switch-5')
		            .after('<span class="lbl"></span>');
		        }, 0);
		    }	    	   

		    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
		    {   //navbar options
		        edit: false,
		        editicon : 'ace-icon fa fa-pencil blue',
		        add: false,
		        addicon : 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon : 'ace-icon fa fa-trash-o red',
		        search: false,
		        searchicon : 'ace-icon fa fa-search orange',
		        refresh: true,
		        refreshicon : 'ace-icon fa fa-refresh green',
		        view: true,
		        viewicon : 'ace-icon fa fa-search-plus grey'
		    },
		    {	        
		        recreateForm: true,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        }
		    },
		    {
		        closeAfterAdd: true,
		        recreateForm: true,
		        viewPagerButtons: false,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
		            .wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        }
		    },
		    {
		        recreateForm: true,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            if(form.data('styled')) return false;      
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_delete_form(form); 
		            form.data('styled', true);
		        },
		        onClick : function(e) {}
		    },
		    {
		        recreateForm: true,
		        afterShowSearch: function(e){
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		            style_search_form(form);
		        },
		        afterRedraw: function(){
		            style_search_filters($(this));
		        },

		        //multipleSearch: true
		        overlay: false,
		        sopt: ['eq', 'cn'],
	            defaultSearch: 'eq',            	       
		      },
		    {
		        //view record form
		        recreateForm: true,
		        beforeShowForm: function(e){
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		        }
		    })	    
		    function style_edit_form(form) {
		        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
		        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

		        //update buttons classes
		        var buttons = form.next().find('.EditButton .fm-button');
		        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
		        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
		        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
		        
		        buttons = form.next().find('.navButton a');
		        buttons.find('.ui-icon').hide();
		        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
		        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
		    }

		    function style_delete_form(form) {
		        var buttons = form.next().find('.EditButton .fm-button');
		        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
		        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
		        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
		    }
		    
		    function style_search_filters(form) {
		        form.find('.delete-rule').val('X');
		        form.find('.add-rule').addClass('btn btn-xs btn-primary');
		        form.find('.add-group').addClass('btn btn-xs btn-success');
		        form.find('.delete-group').addClass('btn btn-xs btn-danger');
		    }
		    function style_search_form(form) {
		        var dialog = form.closest('.ui-jqdialog');
		        var buttons = dialog.find('.EditTable')
		        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
		        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
		        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
		    }
		    
		    function beforeDeleteCallback(e) {
		        var form = $(e[0]);
		        if(form.data('styled')) return false; 
		        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		        style_delete_form(form);
		        form.data('styled', true);
		    }
		    
		    function beforeEditCallback(e) {
		        var form = $(e[0]);
		        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		        style_edit_form(form);
		    }

		    function styleCheckbox(table) {}
		    

		    function updateActionIcons(table) {}
		    
		    function updatePagerIcons(table) {
		        var replacement = 
		            {
		            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		        };
		        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
		            var icon = $(this);
		            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		        })
		    }

		    function enableTooltips(table) {
		        $('.navtable .ui-pg-button').tooltip({container:'body'});
		        $(table).find('.ui-pg-div').tooltip({container:'body'});
		    }

		    $(document).one('ajaxloadstart.page', function(e) {
		        $(grid_selector).jqGrid('GridUnload');
		        $('.ui-jqdialog').remove();
		    });
		});
		// fin
});