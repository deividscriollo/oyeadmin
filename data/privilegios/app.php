<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	// include_once('../funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();


	if (isset($_POST['updateprivilegios'])) {
		$data = json_encode($_POST['data']);
		$resp = $class->consulta("UPDATE privilegios SET data='$data' WHERE id_usuario='$_POST[user]';");
		if ($resp) {
			print_r(array('status' => 'ok' ));
		}else{
			print_r(array('status' => 'error', 'problem' => 'proces update denegate'));
		}
	}

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_usuarios = $class->idz();
		$contrasenia = md5($_POST['clave2']);

		$resp = $class->consulta("INSERT INTO usuarios VALUES (			'$id_usuarios',
																		'$_POST[identificacion]',
																		'$_POST[nombres_completos]',
																		'$_POST[telefono1]',
																		'$_POST[telefono2]',
																		'$_POST[ciudad]',
																		'$_POST[direccion]',
																		'$_POST[correo]',
																		'$_POST[usuario]',
																		'$contrasenia',
																		'$_POST[select_cargo]',
																		'$_POST[observaciones]',
																		'1', 
																		'$fecha');");	
		

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE usuarios SET			        identificacion = '$_POST[identificacion]',
																		nombres_completos = '$_POST[nombres_completos]',
																		telefono1 = '$_POST[telefono1]',
																		telefono2 = '$_POST[telefono2]',
																		ciudad = '$_POST[ciudad]',
																		direccion = '$_POST[direccion]',
																		correo = '$_POST[correo]',
																		usuario = '$_POST[usuario]',
																		id_cargo = '$_POST[select_cargo]',
																		observaciones = '$_POST[observaciones]',
																		fecha_creacion = '$fecha' WHERE id = '$_POST[id_usuario]'");	

		$data = 2;
		echo $data;
	}

	//comparar identificacion usuarios
	if (isset($_POST['comparar_identificacion'])) {
		$resultado = $class->consulta("SELECT * FROM usuarios U WHERE U.identificacion = '$_POST[identificacion]' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$cont++;
		}

		if ($cont == 0) {
		    $data = 0;
		} else {
		    $data = 1;
		}
		echo $data;
	}
	// fin

	//LLena combo cargos
	if (isset($_POST['llenar_cargo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre_cargo FROM cargos WHERE estado='1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_cargo'].'</option>';
		}
	}
	// fin
	//LLena combo cargos
	if (isset($_POST['llenar_usuarios'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT * FROM usuario WHERE ESTADO='1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].' '.$row['apellido'].'</option>';
		}
	}
	// fin

	function buscarstatus($array, $valor){
		// print_r($array);
		// print_r($valor);
		$retorno = array_search($valor, $array);
		if ($retorno) {
			return true;
		}else{
			return false;
		}
		
	}
	// Inicios methodo recursos data
	if (isset($_POST['retornar'])) {
		$sum;
		$result = $class->consulta("SELECT * FROM privilegios WHERE id_usuario='".$_POST['id']."'");
		while ($row=$class->fetch_array($result)) {
			$sum = json_decode($row['data']);
			// print_r($sum);
		}
		// print json_decode($sum);
		$acumulador = 
		array(
			
			'IngresosGenerales' => 
				array(
					'text' => 'Ingresos Generales',
					'type' => 'folder',
					'additionalParameters' => 
						array(
							'id' => 1,
							'children' => 
								array(
									'TipoPaquetes' => 
										array(
											'text' => 'Tipo Paquetes',
											'id' => 'tipo_paquetes',
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'tipo_paquetes')
												)
											),
									'Paquetes'=> 
										array(
											'text' => 'Paquetes', 
											'type' => 'item',
											'id' => 'paquetes',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'paquetes')
												 )
										),
									'TipoProgramas'=> 
										array(
											'text' => 'Tipo Programas', 
											'type' => 'item',
											'id' => 'tipo_programa',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'tipo_programa')
												 )
										),
									'TipoVendedor'=> 
										array(
											'text' => 'Tipo Vendedor', 
											'type' => 'item',
											'id' => 'tipo_vendedor',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'tipo_vendedor')
												 )
										),
									'TipoContrato'=> 
										array(
										'text' => 'Tipo Contrato', 
										'type' => 'item',
										'id' => 'tipo_contrato',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'tipo_contrato')
											 )
										)
									,'Areas'=> 
										array(
										'text' => 'Areas', 
										'type' => 'item',
										'id' => 'areas',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'areas')
											 )
										)
									,'Cargo'=> 
										array(
										'text' => 'Cargo', 
										'type' => 'item',
										'id' => 'cargos',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'cargos')
											 )
										)
									,'Bancos'=> 
										array(
										'text' => 'Bancos', 
										'type' => 'item',
										'id' => 'bancos',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'bancos')
											 )
										)
																	
									)
								
							)
					),
			'Ingresos' => 
				array(
					'text' => 'Ingresos',
					'type' => 'folder',
					'additionalParameters' => 
						array(
							'id' => 1,
							'children' => 
								array(
									
									'Empresa'=> 
										array(
											'text' => 'Empresa', 
											'type' => 'item',
											'id' => 'empresa',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'empresa')
												 )
										),
									'Clientes'=> 
										array(
											'text' => 'Clientes', 
											'type' => 'item',
											'id' => 'clientes',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'clientes')
												 )
										),
									'Programas'=> 
										array(
											'text' => 'Programas', 
											'type' => 'item',
											'id' => 'programas',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'programas')
												 )
										),
									'Vendedores'=> 
										array(
											'text' => 'Vendedores', 
											'type' => 'item',
											'id' => 'vendedores',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'vendedores')
												 )
										)									
									)
								
							)
					),
			'Corporativo' => 
				array(
					'text' => 'Corporativo',
					'type' => 'folder',
					'additionalParameters' => 
						array(
							'id' => 1,
							'children' => 
								array(
									'FichaIngreso'=> 
										array(
											'text' => 'Ficha Ingreso', 
											'type' => 'item',
											'id' => 'ficha_ingresos',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'ficha_ingresos')
												 )
										),
									)
							)
					),
			'AgendaInvitados' => 
				array(
					'text' => 'Agenda Invitados',
					'type' => 'folder',
					'additionalParameters' => 
						array(
							'id' => 1,
							'children' => 
								array(
									'FichaInvitados'=> 
										array(
											'text' => 'Agenda Invitados', 
											'type' => 'item',
											'id' => 'ficha_invitados',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'ficha_invitados')
												 )
										),
									)
							)
					),
			'Programas' => 
				array(
					'text' => 'Programas',
					'type' => 'folder',
					'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
							array(
								'FichaProgramas'=> 
									array(
										'text' => 'Ficha Programas', 
										'type' => 'item',
										'id' => 'ficha_programas',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'ficha_programas')
											 )
									),
								)
						)
				),
			'Contratos' => 
				array(
					'text' => 'Contratos',
					'type' => 'folder',
					'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
							array(
								'ContratoSelectivo'=> 
									array(
										'text' => 'Contrato Selectivo', 
										'type' => 'item',
										'id' => 'contratos_selectivos',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'contratos_selectivos')
											 )
									),
								'ContratoRotativo'=> 
									array(
										'text' => 'Contrato Rotativo', 
										'type' => 'item',
										'id' => 'contratos_rotativos',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'contratos_rotativos')
											 )
									)
								)
						)
				),
			'Facturacion' => 
				array(
					'text' => 'Facturación',
					'type' => 'folder',
					'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
							array(
								'IngresoFacturas'=> 
									array(
										'text' => 'Ingreso Facturas', 
										'type' => 'item',
										'id' => 'facturas',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'facturas')
											 )
									),
								)
						)
				),
			'RolDePagos' => 
				array(
					'text' => 'Rol De Pagos',
					'type' => 'folder',
					'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
							array(
								'IngresoRoles'=> 
									array(
										'text' => 'Ingreso Roles', 
										'type' => 'item',
										'id' => 'rol_pagos',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'rol_pagos')
											 )
									),
								)
						)
				),
			'Usuarios' => 
				array(
					'text' => 'Usuarios',
					'type' => 'folder',
					'additionalParameters' => 
					array(
						'id' => 1,
						'children' => 
							array(
								'NuevoUsuario'=> 
									array(
										'text' => 'Nuevo Usuario', 
										'type' => 'item',
										'id' => 'usuarios',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'usuarios')
											 )
									),
								'Perfiles'=> 
									array(
										'text' => 'Perfiles', 
										'type' => 'item',
										'id' => 'perfiles',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'perfiles')
											 )
									),
								'Privilegios'=> 
									array(
										'text' => 'Privilegios', 
										'type' => 'item',
										'id' => 'privilegios',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'privilegios')
											 )
									)
								)
						)
				)
			);
		$resultado = $class->consulta("SELECT * FROM usuario WHERE ESTADO='1' order by id asc");
		while ($row=$class->fetch_array($resultado)) {
		}
		$acu2;
		for ($i=0; $i < count($acu); $i++) { 
			$acu2[$i] = array(
							'text' => $acu[$i], 
							'type' => 'folder',
							'additionalParameters' => 
												array(
													'id' => '1',
													'children'=> 
														array('opcion2' => 
															array(
																'text' => 'opcion2', 
																'type' => 'item',
																'id'=>'moji',
																'additionalParameters' => 
																	array(
																		'id' => '101',
																		'item-selected' => true
																	 )
																)
															)
													 )
											);
		}
		// print(json_encode($acu));
		print(json_encode($acumulador));
		
	}
?>

