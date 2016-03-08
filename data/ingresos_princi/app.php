<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();
	//guardar datos del area
	if (isset($_POST['form-areas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO corporativo.areas VALUES (	'$id',
																		 	'$_POST[txt_nombre_area]', 
																		 	'1', '$fecha')");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//Validar la existencia del area
	if (isset($_POST['validar_existencia'])) {
		$resp = $class->consulta("SELECT count(*) FROM corporativo.areas where nombre='$_POST[txt_nombre_area]';");
		while ($row=$class->fetch_array($resp)) {
			$val=$row[0];
		}
		if ($val==1) {
			print'false';	
		}else{
			if ($val==0) {
			print'true';
			}
		}
	}
	//Eliminar areas
	if (isset($_POST['eliminar_areas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("UPDATE corporativo.areas set estado = '0' where id = '$_POST[id]'");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//Actualiza el nombre de las areas
	if (isset($_POST['name'])) {
		$entrada = $_POST['name'];
		if ($entrada=='actualizar_nombre_areas') {
			$resp = $class->consulta("UPDATE corporativo.areas set nombre = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
	}
	//Llena las tablas de areas
	if (isset($_POST['llenar_tabla_areas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas where estado='1';");
		$sum=0;
		while ($row=$class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[1].'</td>
						<td>
							<div class="hidden-sm hidden-xs btn-group">
								<button class="btn btn-xs btn-info" onclick=modificar_areas("'.$row[0].'")>
									<i class="ace-icon fa fa-pencil bigger-120"></i>
								</button>

								<button class="btn btn-xs btn-danger" onclick=eliminar_areas("'.$row[0].'")>
									<i class="ace-icon fa fa-trash-o bigger-120"></i>
								</button>
							</div> 
						</td>
					</tr>';
		}
	}
	//Para la consulta de los datos de las areas y poder modificar
	if(isset($_POST['consultar_datos_areas'])){
		$resultado = $class->consulta("SELECT id, nombre, estado, fecha_creacion FROM corporativo.areas where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data = array('id' => $row['id'], 'nombre'=>$row['nombre']);
		}
		print_r(json_encode($data));
	}
	// FIN DE TODO LO CORRESPONDIENTE A AREAS

	//Guardar datos de los Bancos
	if (isset($_POST['form-bancos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO corporativo.bancos VALUES (	'$id',
																			'$_POST[txt_nombre_banco]',
																			'$_POST[txt_telf]', 
																			'$_POST[txt_direccion]',
																			'1', '$fecha')");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
		//Llena las tablas de Bancos
	if (isset($_POST['llenar_tabla_bancos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT id, nombre, telefono, direccion FROM corporativo.bancos where estado='1';");
		$sum=0;
		while ($row=$class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[1].'</td>
						<td>'.$row[3].'</td>
						<td>'.$row[2].'</td>
						<td>
							<div class="hidden-sm hidden-xs btn-group">
								<button class="btn btn-xs btn-info" onclick=modificar_bancos("'.$row[0].'")>
									<i class="ace-icon fa fa-pencil bigger-120"></i>
								</button>

								<button class="btn btn-xs btn-danger" onclick=eliminar_bancos("'.$row[0].'")>
									<i class="ace-icon fa fa-trash-o bigger-120"></i>
								</button>
							</div> 
						</td>
					</tr>';
		}
	}
	//Validar la existencia del Nombre de Bancos
	if (isset($_POST['validar_existencia2'])) {
		$resp = $class->consulta("SELECT count(*) FROM corporativo.bancos where nombre='$_POST[txt_nombre_banco]';");
		while ($row=$class->fetch_array($resp)) {
			$val=$row[0];
		}
		if ($val==1) {
			print'false';	
		}else{
			if ($val==0) {
			print'true';
			}
		}
	}
	//Eliminar bancos
	if (isset($_POST['eliminar_bancos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("UPDATE corporativo.bancos set estado = '0' where id = '$_POST[id]'");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//Para la consulta de los datos de las bancos y poder modificar
	if(isset($_POST['consultar_datos_bancos'])){
		$resultado = $class->consulta("SELECT id, nombre, telefono, direccion, estado, fecha_creacion FROM corporativo.bancos where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data = array('id' => $row['id'], 'nombre'=>$row['nombre'], 'telefono'=>$row['telefono'], 'direccion'=>$row['direccion']);
		}
		print_r(json_encode($data));
	}
	//Actualiza el nombre del banco
	if (isset($_POST['name'])) {
		$entrada = $_POST['name'];
		if ($entrada=='actualizar_nombre_bancos') {
			$resp = $class->consulta("UPDATE corporativo.bancos set nombre = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
		//Actualizar el telefono de bancos
	if ($entrada=='actualizar_telefono_bancos') {
		$resp = $class->consulta("UPDATE corporativo.bancos set telefono = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
		//Actualizar la Direccion de bancos
	if ($entrada=='actualizar_direccion_bancos') {
		$resp = $class->consulta("UPDATE corporativo.bancos set direccion = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
	}
?>



