<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	// include_once('../funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();

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
		$result = $class->consulta("SELECT * FROM privilegios WHERE id_usuario='".$_SESSION['user']['id']."'");
		while ($row=$class->fetch_array($result)) {
			$sum = json_decode($row['data']);
		}
		// print json_decode($sum);
		$acumulador = 
		array(
			'Ingresos' => 
				array(
					'text' => 'Ingresos',
					'type' => 'folder',
					'additionalParameters' => 
						array(
							'id' => 1,
							'children' => 
								array(
									'Generales' => 
										array(
											'text' => 'Generales',
											'type' => 'folder',
											'additionalParameters' => 
												array(
													'id' => '1',
													'children'=> 
														array(
															'TipoPaquetes' => 
																array(
																	'text' => 'Tipo Paquetes', 
																	'type' => 'item',
																	'additionalParameters' => 
																		array(
																			'id' => '101',
																			'item-selected' => buscarstatus($sum,'TipoPaquetes')
																		 )
																	),
															'Paquetes'=> 
																array(
																	'text' => 'Paquetes', 
																	'type' => 'item',
																	'additionalParameters' => 
																		array(
																			'id' => '101',
																			'item-selected' => buscarstatus($sum,'Paquetes')
																		 )
																),
															'TipoProgramas'=> 
																array(
																	'text' => 'Tipo Programas', 
																	'type' => 'item',
																	'additionalParameters' => 
																		array(
																			'id' => '101',
																			'item-selected' => buscarstatus($sum,'TipoProgramas')
																		 )
																),
															'TipoVendedor'=> 
																array(
																	'text' => 'Tipo Vendedor', 
																	'type' => 'item',
																	'additionalParameters' => 
																		array(
																			'id' => '101',
																			'item-selected' => buscarstatus($sum,'TipoVendedor')
																		 )
																),
															'TipoContrato'=> 
																array(
																'text' => 'Tipo Contrato', 
																'type' => 'item',
																'additionalParameters' => 
																	array(
																		'id' => '101',
																		'item-selected' => buscarstatus($sum,'TipoContrato')
																	 )
																)
															,'Areas'=> 
																array(
																'text' => 'Areas', 
																'type' => 'item',
																'additionalParameters' => 
																	array(
																		'id' => '101',
																		'item-selected' => buscarstatus($sum,'Areas')
																	 )
																)
															,'Cargo'=> 
																array(
																'text' => 'Cargo', 
																'type' => 'item',
																'additionalParameters' => 
																	array(
																		'id' => '101',
																		'item-selected' => buscarstatus($sum,'Cargo')
																	 )
																)
															,'Bancos'=> 
																array(
																'text' => 'Bancos', 
																'type' => 'item',
																'additionalParameters' => 
																	array(
																		'id' => '101',
																		'item-selected' => buscarstatus($sum,'Bancos')
																	 )
															)
														)
													)
										),
									'Empresa'=> 
										array(
											'text' => 'Empresa', 
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'Bancos')
												 )
										),
									'Clientes'=> 
										array(
											'text' => 'Clientes', 
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'Clientes')
												 )
										),
									'Programas'=> 
										array(
											'text' => 'Programas', 
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'Programas')
												 )
										),
									'Vendedores'=> 
										array(
											'text' => 'Vendedores', 
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'Vendedores')
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
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'FichaIngreso')
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
											'text' => 'Ficha Invitados', 
											'type' => 'item',
											'additionalParameters' => 
												array(
													'id' => '101',
													'item-selected' => buscarstatus($sum,'AgendaInvitados')
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
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'FichaProgramas')
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
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'ContratoSelectivo')
											 )
									),
								'ContratoRotativo'=> 
									array(
										'text' => 'Contrato Rotativo', 
										'type' => 'item',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'ContratoRotativo')
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
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'IngresoFacturas')
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
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'IngresoRoles')
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
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'NuevoUsuario')
											 )
									),
								'Perfiles'=> 
									array(
										'text' => 'Perfiles', 
										'type' => 'item',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'Perfiles')
											 )
									),
								'Privilegios'=> 
									array(
										'text' => 'Privilegios', 
										'type' => 'item',
										'additionalParameters' => 
											array(
												'id' => '101',
												'item-selected' => buscarstatus($sum,'Privilegios')
											 )
									)
								)
						)
				)
			);


		$acu = array(
					'Empresa',
					'Clientes',
					'Programas',
					'Vendedores',
					'TipoPaquetes',
					'Paquetes',
					'TipoProgramas',
					'TipoVendedor',
					'TipoContrato',
					'Area',
					'Cargo',
					'Bancos',
					'Empresa',
					'Clientes',
					'Programas',
					'Vendedores'
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

