angular.module('scotchApp').controller('programasController', function ($scope) {

	jQuery(function($) {	

		$.fn.editable.defaults.mode = 'inline';
		$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
	    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		try {
			try {
				document.createElement('IMG').appendChild(document.createElement('B'));
			} catch(e) {
				Image.prototype.appendChild = function(el){}
			}
	
			var last_gritter
			$('#avatar').editable({
				type: 'image',
				name: 'avatar',
				value: null,
				image: {
					btn_choose: 'Cambiar Logo',
					droppable: true,
					maxSize: 990000,	
					name: 'avatar',
					on_error : function(error_type) {
						if(last_gritter) $.gritter.remove(last_gritter);
						if(error_type == 1) {
							last_gritter = $.gritter.add({
								title: 'El archivo no es una imagen!',
							text: 'Por favor, elija un jpg | jpeg | imagen png!',
							class_name: 'gritter-error gritter-center'
							});
						} else if(error_type == 2) {
							last_gritter = $.gritter.add({
								title: 'Archivo muy grande!',
							text: 'Tamaño de la imagen no debe superar los 100Kb!',
							class_name: 'gritter-error gritter-center'
							});
						} else {}
					},
					on_success : function() {
						$.gritter.removeAll();
					}
				},
			    url: function(params) {
					var deferred = new $.Deferred
	
					var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
					if(!value || value.length == 0) {
						deferred.resolve();
						return deferred.promise();
					}
	
					setTimeout(function() {
						if("FileReader" in window) {
							var thumb = $('#avatar').next().find('img').data('thumb');
							if(thumb) $('#avatar').get(0).src = thumb;
						}
						
						deferred.resolve({'status':'OK'});
						if(last_gritter) $.gritter.remove(last_gritter);
						last_gritter = $.gritter.add({
							title: 'Imagen Cargada!',
							// text: 'Uploading to server can be easily implemented. A working example is included with the template.',
							class_name: 'gritter-info gritter-center'
						});
						
					 } , parseInt(Math.random() * 800 + 800))
	
					return deferred.promise();
				},
				
				success: function(response, newValue) {
				}
			})
		}catch(e) {}

		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}

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
		$("#select_tipo_programa").select2({
		  allowClear: true
		});
		// fin

		// validación codigo
		$("#ruc_empresa").keyup(function() {
        $.ajax({
            type: "POST",
            url: "data/clientes/app.php",
            data: {comparar_ruc:'comparar_ruc',ruc: $("#ruc_empresa").val()},
            dataType: 'json',
            success: function(data) {
                var val = data;
                if (val == 1) {
                    $("#ruc_empresa").val("");
                    $("#ruc_empresa").focus();
                    $.gritter.add({
						title: 'Error... El cliente ya fue registrado',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});	
                }
            }
        });
    });
	// fin

	// recargar formulario
	function redireccionar() {
		setTimeout(function() {
		    location.reload(true);
		}, 2000);
	}
	// fin

	select_tipo_programa();

	
	// llenar combo tipo pogramas
	function select_tipo_programa() {
		$.ajax({
			url: 'data/programas/app.php',
			type: 'post',
			data: {llenar_tipo_programa:'llenar_tipo_programa'},
			success: function (data) {
				$('#select_tipo_programa').html(data);
			}
		});
	}
	// fin

	// modificar formulario
	$('#btn_3').click(function() {
		if($('#id_empresa').val() == '') {
			$.gritter.add({
				title: 'Error... Seleccione un cliente',
				class_name: 'gritter-error gritter-center',
				time: 1000,
			});
			$('#myModal').modal('show'); 
		} else {
			var submit = "btn_modificar";
			var formulario = $("#form_clientes").serialize();
			$.ajax({
		        url: "data/clientes/app.php",
		        data: formulario + "&btn_modificar=" + submit+ "&img="+$("#avatar")[0].src,
		        type: "POST",
		        async: true,
		        success: function (data) {
		        	var val = data;
		        	if(data == '2') {
		        		$.gritter.add({
							title: 'Mensaje',
							text: 'Cliente Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
							time: 2000				
						});
						redireccionar();
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
	});
	// fin

	// guardar formulario
	$('#btn_0').click(function() {
		if($('#select_tipo_programa').val() == '') {
			$.gritter.add({
				title: 'Seleccione tipo programa',
				class_name: 'gritter-error gritter-center',
				time: 1000,
			});
			$('#nombre_empresa').focus();
		} else {
			if($('#codigo_programa').val() == '') {
				$.gritter.add({
					title: 'Ingrese código programa',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#codigo_programa').focus();
			} else {
				if($('#nombre_programa').val() == '') {
					$.gritter.add({
						title: 'Ingrese nombre programa',
						class_name: 'gritter-error gritter-center',
						time: 1000,
					});
					$('#nombre_programa').focus();
				} else {
					var submit = "btn_gardar";
		
					var formulario = $("#form_clientes").serialize();
					$.ajax({
				        url: "data/clientes/app.php",
				        data: formulario + "&btn_guardar=" + submit+ "&img="+$("#avatar")[0].src,
				        type: "POST",
				        async: true,
				        success: function (data) {
				        	var val = data;
				        	if(data == '1') {
				        		$.gritter.add({
									title: 'Mensaje',
									text: 'Cliente Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
									time: 2000				
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


	$('#btn_1').click(function() {
		location.reload(true);
	});

		/*jqgrid*/    
		jQuery(function($) {
		    var grid_selector = "#table";
		    var pager_selector = "#pager";
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {
		        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
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
		        url: 'data/clientes/xml_clientes.php',        
		        colNames: ['ID','EMPRESA','RUC','DIRECCIÓN','OBSERVACIONES','MAIL','SITIO','TELÉFONO','REPRESENTANTE','C.I.','FACEBOOK','TWITTER','GOOGLE','IMAGEN'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'empresa',index:'empresa',frozen : true,align:'left',search:true,width: '300px'},
		            {name:'ruc',index:'ruc',frozen : true,align:'left',search:true},
		            {name:'direccion',index:'direccion',frozen : true,align:'left',search:false,width: '250px'},
		            {name:'observaciones',index:'observaciones',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'email',index:'email',frozen : true,align:'left',search:false},
		            {name:'sitio',index:'sitio',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'telefono',index:'telefono',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'contacto',index:'contacto',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'identificacion',index:'identificacion',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'facebook',index:'facebook',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'twitter',index:'twitter',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'google',index:'google',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		            {name:'imagen',index:'imagen',frozen : true,align:'left',search:false,width: '250px', hidden: true},
		        ],          
		        rowNum: 10,       
		        width:600,
		        shrinkToFit: false,
		        height:200,
		        rowList: [10,20,30],
		        pager: pager_selector,        
		        sortname: 'id',
		        sortorder: 'asc',
		        altRows: true,
		        multiselect: false,
		        multiboxonly: true,
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

	            	$('#id_empresa').val(ret.id);
	            	$('#nombre_empresa').val(ret.empresa);
	            	$('#ruc_empresa').val(ret.ruc);
	            	$('#direccion_empresa').val(ret.direccion);
	            	$('#observaciones').val(ret.observaciones);
	            	$('#correo').val(ret.email);
	            	$('#txt_sitio_web').val(ret.sitio);
	            	$('#txt_telefono').val(ret.telefono);
	            	$('#txt_contacto').val(ret.contacto);
	            	$('#identificacion').val(ret.identificacion);
	            	$('#txt_facebook').val(ret.facebook);
	            	$('#txt_twitter').val(ret.twitter);
	            	$('#txt_google').val(ret.google);
		            $("#avatar").attr("src","data/clientes/imagenes/"+ret.imagen);	   	            
	
		            $('#myModal').modal('hide'); 
		            $('#btn_0').attr('disabled', true)  	            
		        },
		        
		        caption: "LISTA CLIENTES"
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
		    {   
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
		        $(grid_selector).jqGrid('GridUnload');
		        $('.ui-jqdialog').remove();
		    });
		});
		// fin
	});
});