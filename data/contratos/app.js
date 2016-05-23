angular.module('scotchApp').controller('contratosController', function ($scope) {

	// procesos tab
	$scope.tab = 1;

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };
    // fin

	jQuery(function($) {
		function showErrorAlert (reason, detail) {
			var msg='';
			if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
			else {
				//console.log("error uploading file", reason, detail);
			}
			$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
			 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
		}

		$('#editor2').css({'height':'400px'}).ace_wysiwyg({
			toolbar_place: function(toolbar) {
				return $(this).closest('.widget-box')
				       .find('.widget-header').prepend(toolbar)
					   .find('.wysiwyg-toolbar').addClass('inline');
			},
			toolbar:
			[
				'bold',
				{name:'italic' , title:'Change Title!', icon: 'ace-icon fa fa-leaf'},
				'strikethrough',
				null,
				'insertunorderedlist',
				'insertorderedlist',
				null,
				'justifyleft',
				'justifycenter',
				'justifyright'
			],
			speech_button: false
		});

		$('[data-toggle="buttons"] .btn').on('click', function(e){
			var target = $(this).find('input[type=radio]');
			var which = parseInt(target.val());
			var toolbar = $('#editor1').prev().get(0);
			if(which >= 1 && which <= 4) {
				toolbar.className = toolbar.className.replace(/wysiwyg\-style(1|2)/g , '');
				if(which == 1) $(toolbar).addClass('wysiwyg-style1');
				else if(which == 2) $(toolbar).addClass('wysiwyg-style2');
				if(which == 4) {
					$(toolbar).find('.btn-group > .btn').addClass('btn-white btn-round');
				} else $(toolbar).find('.btn-group > .btn-white').removeClass('btn-white btn-round');
			}
		});

		//RESIZE IMAGE
		
		//Add Image Resize Functionality to Chrome and Safari
		//webkit browsers don't have image resize functionality when content is editable
		//so let's add something using jQuery UI resizable
		//another option would be opening a dialog for user to enter dimensions.
		if ( typeof jQuery.ui !== 'undefined' && ace.vars['webkit'] ) {
			
			var lastResizableImg = null;
			function destroyResizable() {
				if(lastResizableImg == null) return;
				lastResizableImg.resizable( "destroy" );
				lastResizableImg.removeData('resizable');
				lastResizableImg = null;
			}

			var enableImageResize = function() {
				$('.wysiwyg-editor')
				.on('mousedown', function(e) {
					var target = $(e.target);
					if( e.target instanceof HTMLImageElement ) {
						if( !target.data('resizable') ) {
							target.resizable({
								aspectRatio: e.target.width / e.target.height,
							});
							target.data('resizable', true);
							
							if( lastResizableImg != null ) {
								//disable previous resizable image
								lastResizableImg.resizable( "destroy" );
								lastResizableImg.removeData('resizable');
							}
							lastResizableImg = target;
						}
					}
				})
				.on('click', function(e) {
					if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
						destroyResizable();
					}
				})
				.on('keydown', function() {
					destroyResizable();
				});
		    }

			enableImageResize();

		}

		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// fin

		// stilo select2
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });
		// fin

		// limpiar select2
		$("#select_ruc,#select_cliente,#select_tipo_paquete,#select_paquete,#select_tipo_contrato").select2({
		  allowClear: true
		});
		// fin

		//selectores anidados clientes ruc
		$("#select_ruc").change(function () {
			$("#select_cliente").select2('val', 'All');
			$("#ci b").remove();

	        $("#select_ruc option:selected").each(function () {
	            id = $(this).val();

	            $.ajax({
					url: 'data/contratos/app.php',
					type: 'post',
					data: {llenar_informacion_ruc:'llenar_informacion_ruc',id: id},
					dataType: 'json',
					success: function (data) {
						$("#select_cliente").select2('val', data.id).trigger("change");
					}
				});

				var cliente = $(this).text();

				$("#ci").append($("<b>").text(cliente));
                $("#ci b").css("color","red");
		   });
		});
		// fin

		//selectores anidados clientes nombres
		// $("#select_cliente").change(function () {
		// 	$("#select_ruc").select2('val', 'All');
		// 	$('#direccion').val('');
		// 	$('#telefono').val('');
	 //        $("#select_cliente option:selected").each(function () {
	 //            id = $(this).val();

	 //            $.ajax({
		// 			url: 'data/facturas/app.php',
		// 			type: 'post',
		// 			data: {llenar_informacion_nombres:'llenar_informacion_nombres',id: id},
		// 			dataType: 'json',
		// 			success: function (data) {
		// 				$("#select_ruc").select2('val', data.id).trigger("change");
		// 				$('#direccion').val(data.direccion);
		// 				$('#telefono').val(data.telefono);
		// 			}
		// 		});
		//    });
		// });
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

		// funcion validar solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		// funcion autocompletar la serie
		function autocompletar() {
		    var temp = "";
		    var serie = $("#codigo").val();
		    for (var i = serie.length; i < 7; i++) {
		        temp = temp + "0";
		    }
		    return temp;
		}
		// fin

		// abrir en una nueva ventana reporte facturas
		$scope.methodspdf = function(id) { 
			var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+id,'popup','width=900,height=650');
		} 
		// fin

		// funcion cargar maximo serie
		function cargar_serie_secuencia() {
			$.ajax({
				url: 'data/facturas/app.php',
				type: 'post',
				data: {cargar_series:'cargar_series'},
				dataType: 'json',
				success: function (data) {
					if(data != null) {
						var serie_factura = data.serie;
						var res = parseInt(serie_factura.substr(8, 16));
						res = res + 1;

						$("#serie_factura").val(res);
						var a = autocompletar(res);
						var validado = a + "" + res;
						$("#serie_factura").val(validado);
					} else {
						$.ajax({
							url: 'data/facturas/app.php',
							type: 'post',
							data: {cargar_factura_preimpresa:'cargar_factura_preimpresa'},
							dataType: 'json',
							success: function (data) {
								if(data != null) {
								var id_empresa = data.id_empresa;
								var inicio_fac_preimpresa = data.inicio_fac_preimpresa;
								var item_factura = data.item_factura;

								$("#serie_factura").val(inicio_fac_preimpresa);
								var a = autocompletar(inicio_fac_preimpresa);
								var validado = a + "" + inicio_fac_preimpresa;
								$("#serie_factura").val(validado);
								} else {
									$.gritter.add({
										title: 'Empresa no creada',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});
								}
							}
						});
					}
				}
			});
		}
		// fin	

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// inicio llamado funciones de procesos de inicio 
		select_clientes_ruc();
		select_clientes_nombre();
		cargar_serie_secuencia();
		select_tipo_paquete();
		select_tipo_contrato();

		// llenar combo clientes ruc
		function select_clientes_ruc() {
			$.ajax({
				url: 'data/contratos/app.php',
				type: 'post',
				data: {llenar_clientes_ruc:'llenar_clientes_ruc'},
				success: function (data) {
					$('#select_ruc').html(data);
				}
			});
		}
		// fin

		// llenar combo clientes nombre
		function select_clientes_nombre() {
			$.ajax({
				url: 'data/contratos/app.php',
				type: 'post',
				data: {llenar_clientes_nombre:'llenar_clientes_nombre'},
				success: function (data) {
					$('#select_cliente').html(data);
				}
			});
		}
		// fin

		// llenar combo tipo paquete
		function select_tipo_paquete() {
			$.ajax({
				url: 'data/contratos/app.php',
				type: 'post',
				data: {llenar_tipo_paquete:'llenar_tipo_paquete'},
				success: function (data) {
					$('#select_tipo_paquete').html(data);
				}
			});
		}
		// fin

		//selectores anidados para tipo_paquete-paquete
		$("#select_tipo_paquete").change(function () {
			$("#select_paquete").select2('val', 'All');
	        $("#select_tipo_paquete option:selected").each(function () {
	            id = $(this).val();

	            $.ajax({
					url: 'data/contratos/app.php',
					type: 'post',
					data: {llenar_paquete:'llenar_paquete',id: id},
					success: function (data) {
						$('#select_paquete').html(data);
					}
				});
		   });
		});
		// fin

		// llenar combo tipo contrato
		function select_tipo_contrato() {
			$.ajax({
				url: 'data/contratos/app.php',
				type: 'post',
				data: {llenar_tipo_contrato:'llenar_tipo_contrato'},
				success: function (data) {
					$('#select_tipo_contrato').html(data);
				}
			});
		}
		// fin

		// guardar factura
		$('#btn_0').click(function() {
			guardar_factura();
		});
		// fin

		// actualizar formulario
		$('#btn_1').click(function() {
			location.reload();
		});
		// fin

		// anular facturas
		$('#btn_3').click(function() {
			if($('#id_factura').val() == '') {
				$.gritter.add({
					title: 'Seleccione factura Anular',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				bootbox.dialog({
					message: "<span class='bigger-110'>¿Esta Seguro de anular la factura?</span>",
					buttons: 			
					{
						"success" :
						 {
							"label" : "<i class='ace-icon fa fa-check'></i> Aceptar",
							"className" : "btn-sm btn-success",
							"callback": function() {
								var id = $('#id_factura').val();

								$.ajax({
									url: 'data/facturas/app.php',
									type: 'post',
									data: {anular_factura:'anular_factura',id: id},
									dataType: 'json',
									success: function (data) {
										var val = data;
							        	if(data == '1') {
							        		$.gritter.add({
												title: 'Mensaje',
												text: 'Factura Anulada correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
												time: 1000				
											});
											redireccionar();
							        	}         	
									}
								}); 
							}
						},
						"danger" :
						{
							"label" : "<i class='ace-icon fa fa-times'></i> Cancelar",
							"className" : "btn-sm btn-danger",
							"callback": function() {
								$.gritter.add({
									title: 'Mensaje',
									text: 'Accion cancelada <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
									time: 1000				
								});
							}
						}
					}
				});
			}
		});
		// fin

		// reimprimir facturas
		$('#btn_4').click(function() {
			if($('#id_factura').val() == '') {
				$.gritter.add({
					title: 'Seleccione factura a reimprimir',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				var id = $('#id_factura').val();
				var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+id,'popup','width=900,height=650');
			}
		});
		// fin

		// proceso guardar rol
		function guardar_factura() {
			var form_uno = $("#form_facturacion").serialize();
			var submit = "btn_guardar";
			var fil = jQuery("#table").jqGrid("getRowData");

			if($('#select_ruc').val() == '') {
				$.gritter.add({
					title: 'Seleccione un cliente',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});	
			} else {
				if($('#select_forma').val() == '') {
					$.gritter.add({
						title: 'Seleccione una forma de pago',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
				} else {
					if($('#serie_factura').val() == '') {
						$.gritter.add({
							title: 'Ingrese serie de la factura',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
						$('#serie_factura').focus();	
					} else {
						if(fil.length == 0) {
			                var a = autocompletar($("#serie_factura").val());
							$("#serie_factura").val(a + "" + $("#serie_factura").val());
			                $("#codigo").focus();
			                $.gritter.add({
								title: 'Ingrese productos a la Factura',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
			                $('#codigo').focus();	
			            } else {
							var v1 = new Array();
			                var v2 = new Array();
			                var v3 = new Array();
			                var v4 = new Array();
			                var v5 = new Array();

			                var string_v1 = "";
			                var string_v2 = "";
			                var string_v3 = "";
			                var string_v4 = "";
			                var string_v5 = "";

			                for (var i = 0; i < fil.length; i++) {
			                    var datos = fil[i];
			                    v1[i] = datos['id'];
			                    v2[i] = datos['cantidad'];
			                    v3[i] = datos['precio'];
			                    v4[i] = datos['descuento'];
			                    v5[i] = datos['valor_total'];
			                }
			                
			                for (i = 0; i < fil.length; i++) {
			                    string_v1 = string_v1 + "|" + v1[i];
			                    string_v2 = string_v2 + "|" + v2[i];
			                    string_v3 = string_v3 + "|" + v3[i];
			                    string_v4 = string_v4 + "|" + v4[i];
			                    string_v5 = string_v5 + "|" + v5[i];
			                }

							$.ajax({
						        url: "data/facturas/app.php",
						        data: form_uno +"&btn_guardar=" + submit + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5,
						        type: "POST",
						        success: function (data) {
						        	var val = data;
						        	if(data != '') {
						        		bootbox.alert("Gracias! Por su Información Datos Correctamente Agregados!", function() {
										  var myWindow = window.open('data/reportes/factura_oye.php?hoja=A5&id='+val,'popup','width=900,height=650'); 
										  location.reload();
										});
							    	}                                                
						        }
						    });
						}    
					}    
				}
			}	
		}
	});
	// fin
	
	/*jqgrid table 1 local*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector).jqGrid('setGridWidth', $("#grid_container").width(), true);
	    }).trigger('resize');  

	    var parent_column = $(grid_selector).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
				setTimeout(function() {
					$(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // tabla local facturas
	    jQuery(grid_selector).jqGrid({	        
	        autoencode: false,
	        datatype: "local",
			height: 250,
	        colNames: ['','ID','CÓDIGO','DESCRIPCIÓN','CANTIDAD','VALOR UNITARIO','DESCUENTO','CALCULADO','VALOR TOTAL'],
	        colModel:[  
	        	{name:'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
			        formatoptions: {keys: false, delbutton: true, editbutton: false}
			    }, 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'codigo',index:'codigo', frozen:true, align:'left', search:false, hidden: false},
	            {name:'descripcion',index:'descripcion',frozen : true,align:'left',search:true,width: '300px'},
	            {name:'cantidad',index:'cantidad',frozen : true,align:'left',search:true,width: '150px'},
	            {name:'precio',index:'precio',frozen : true,align:'left',search:true,width: '150px'},
	            {name:'descuento',index:'descuento',frozen : true,align:'left',search:true,width: '100px'},
	            {name:'cal_des', index:'cal_des', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 70},
	            {name:'valor_total',index:'valor_total',frozen : true,align:'left',search:false,width: '150px'}
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
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
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);	            
	        },
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
	        refresh: false,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: false,
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

	/*jqgrid table 2 buscador*/    
	jQuery(function($) {
	    var grid_selector2 = "#table2";
	    var pager_selector2 = "#pager2";
	    
	    $(window).on('resize.jqGrid', function () {
			$(grid_selector2).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	    }).trigger('resize');  

	    var parent_column = $(grid_selector2).closest('[class*="col-"]');
		$(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
			if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
				//setTimeout is for webkit only to give time for DOM changes and then redraw!!!
				setTimeout(function() {
					$(grid_selector2).jqGrid( 'setGridWidth', parent_column.width() );
				}, 0);
			}
	    })

	    // buscador facturas
	    jQuery(grid_selector2).jqGrid({	 
	    	datatype: "xml",
		    url: 'data/facturas/xml_facturas.php',         
	        autoencode: false,
			height: 250,
	        colNames: ['ID','IDENTIFICACIÓN','CLIENTE','DIRECCIÓN','FECHA EMISIÓN','TOTAL FACTURA','ACCIÓN'],
	        colModel:[ 
			    {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},   
	            {name:'ruc',index:'ruc', frozen:true, align:'left', search:false, hidden: false},
	            {name:'empresa',index:'empresa',frozen : true,align:'left', search:true, width: '300px'},
	            {name:'direccion',index:'direccion',frozen : true, hidden: true, align:'left', search:true,width: '300px'},
	            {name:'fecha_actual',index:'fecha_actual',frozen : true, align:'left', search:true,width: '150px'},
	            {name:'total_pagar',index:'total_pagar',frozen : true, align:'left', search:true,width: '100px'},
	            {name:'accion', index:'accion', editable: false, hidden: false, frozen: true, editrules: {required: true}, align: 'center', width: '150px'},
	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:250,
	        rowList: [10,20,30],
	        pager: pager_selector2,        
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
				var ids = jQuery(grid_selector2).jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++) {
					var id_factura = ids[i];
					pdf = "<a onclick=\"angular.element(this).scope().methodspdf('"+id_factura+"')\" title='Reporte Factura' ><i class='fa fa-file-pdf-o red2' style='cursor:pointer; cursor: hand'> PDF</i></a>"; 
					// anular = "<a onclick=\"angular.element(this).scope().methodsanular('"+id_factura+"')\" title='Anular Factura' ><i class='fa fa fa-times red2' style='cursor:pointer; cursor: hand'> ANULAR</i></a>"; 
					
					jQuery(grid_selector2).jqGrid('setRowData',ids[i],{accion:pdf});
				}	
			},
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector2).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector2).jqGrid('getRowData',gsr);
            	 $("#table").jqGrid("clearGridData", true);	

            	$.ajax({
					url: 'data/facturas/app.php',
					type: 'post',
					data: {llenar_cabezera_factura:'llenar_cabezera_factura',id: ret.id},
					dataType: 'json',
					success: function (data) {
						$('#id_factura').val(data.id_factura);
						$("#select_ruc").select2('val', data.id_clientes).trigger("change");
						$('#fecha_emision').val(data.fecha_actual);
						$("#select_forma").select2('val', data.pago).trigger("change");
						$('#serie_factura').val(data.serie.substr(8, 20));
						$('#subtotal').val(data.subtotal);
						$('#descuento_total').val(data.descuento);
						$('#base_imponible').val(data.base_imponible);
						$('#iva').val(data.iva);
						$('#otros').val(data.otros);
						$('#total_pagar').val(data.total_pagar);

						if(data.estado == "2") {
                            $("#estado").append($("<h3>").text("Anulada"));
                            $("#estado h3").css("color","red");
                            $("#btn_3").attr("disabled", true);
                        } else {
                            $("#estado h3").remove();
                            $("#btn_3").attr("disabled", false);
                        }
					}
				});

				$.ajax({
					url: 'data/facturas/app.php',
					type: 'post',
					data: {llenar_detalle_factura:'llenar_detalle_factura',id: ret.id},
					dataType: 'json',
					success: function (data) {
						var tama = data.length;
						for (var i = 0; i < tama; i = i + 7) {
							var datarow = {
                                id: data[i], 
                                codigo: data[i + 1], 
                                descripcion: data[i + 2], 
                                cantidad: data[i + 3], 
                                precio: data[i + 4], 
                                descuento: data[i + 5], 
                                valor_total: data[i + 6]
                                };

                            jQuery("#table").jqGrid('addRowData',data[i],datarow);
						}
					}
				});  

				$('#myModal').modal('hide'); 
		        $('#btn_0').attr('disabled', true);           
	        },
	         caption: "LISTA FACTURAS"
	    });

	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   

	    jQuery(grid_selector2).jqGrid('navGrid',pager_selector2,
	    {   //navbar options
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
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
	        $(grid_selector2).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
	// fin
});