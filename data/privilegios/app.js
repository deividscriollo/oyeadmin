angular.module('scotchApp').controller('privilegiosController', function ($scope) {

	jQuery(function($) {
		

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

		

		$('#select_usuario').change(function(){
			
			$('#element_tree').html('<ul id="tree1"></ul>');
			var id = $(this).val();
			console.log(id);
			var sampleData = initiateDemoData(id);//see below
			$('#tree1').ace_tree({
				dataSource: sampleData['dataSource1'],
				multiSelect: true,
				loaded:true,
				cacheItems: true,
				'open-icon' : 'ace-icon tree-minus',
				'close-icon' : 'ace-icon tree-plus',
				'selectable' : true,
				'selected-icon' : 'ace-icon fa fa-check',
				'unselected-icon' : 'ace-icon fa fa-times',
				loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
			});
			// $('#tree1').ace_tree('update');
			$('.tree-branch-name').trigger("click");
		});



	    $('#btn_importar').click(function(){
	    	// console.log("selected items: ", $('#tree1').tree('selectedItems'));
	    	// console.log(itemselecttree());
	    	
	    	// $('#tree1').tree('collapse');

	    	var vector = itemselecttree();
	    	// vector.insert(0, 'require');
	    	$.ajax({
				url: 'data/privilegios/app.php',
				type: 'post',
				dataType: 'json',
				data: {updateprivilegios:'ok', data:vector, user:$('#select_usuario').val()},
				success: function (data) {
					console.log(data);
				}
			});

	    	// buscar_seleccionados()
	    	
	    });
	    // $('.tree-branch .tree-branch-header .tree-branch-name').trigger("click");
	    
		function recursosdata(){
			var retorno;
			$.ajax({
				url: 'data/privilegios/app.php',
				dataType: "json",
				type: 'post',
				data: {'retornar':'recursosdata', id:$('#select_usuario').val()},
				// datatype :'json',
				async:false,
				success: function (data) {
					retorno = data;
				}
			});
			return retorno;
		}

		function initiateDemoData(){
			var tree_data = recursosdata();

			var dataSource1 = function(options, callback){
				var _data = null
				if(!("text" in options) && !("type" in options)){
					_data = recursosdata();//the root tree
					callback({ data: _data });
					return;
				}
				else if("type" in options && options.type == "folder") {
					if("additionalParameters" in options && "children" in options.additionalParameters)
						_data = options.additionalParameters.children || {};
					else _data = {}//no data
				}
				
				if(_data != null)//this setTimeout is only for mimicking some random delay
					setTimeout(function(){callback({ data: _data });} , parseInt(Math.random() * 500) + 200);

				//we have used static data here
				//but you can retrieve your data dynamically from a server using ajax call
				//checkout examples/treeview.html and examples/treeview.js for more info
			}
			
			return {'dataSource1': dataSource1}
		}
		// $('#tree1').tree('discloseAll')
		// $().tree('discloseAll');
		$('#tree1')
		// .on('loaded.fu.tree', function(e) {
		// 	console.log('1',e);
		// })
		.on('updated.fu.tree', function(e, result) {
			// console.log('2',result);
		})
		.on('selected.fu.tree', function(evt, data) {
			// console.log('deselected', data);
			// var m = $('#tree1 input[type="checkbox"]:checked');;
		})
		.on('deselected.fu.tree', function(e, result) {
			console.log('4',e, result);//deselected
		})


		// .on('opened.fu.tree', function(e) {
		// 	console.log('5',e);
		// })
		// .on('closed.fu.tree', function(e) {
		// 	console.log('6',e);
		// });


		function itemselecttree() {
            var output = "";
            var ids = "";
            var vec = ['require'];
			
            var items = $('#tree1').tree('selectedItems');
            for (var i in items) if (items.hasOwnProperty(i)) {
                var item = items[i];
                ids += item.additionalParameters['id'] + ",";
                output += item.text + ",";
                vec.push(item.id);
            }
            return vec;
        }

		// inicio de procesos
			llenar_select_usuarios()
		// llenar select usuario
			function llenar_select_usuarios() {
				$.ajax({
					url: 'data/privilegios/app.php',
					type: 'post',
					data: {llenar_usuarios:'llenar_usuarios'},
					success: function (data) {
						$('#select_usuario').html(data);
					}
				});
			}
	});
});