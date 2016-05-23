<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

	if (isset($_POST['llenar_categoria'])) {
		$resultado = $class->consulta("select");
		$acu='';
		while ($row=$class->fetch_array($resultado)) {
			$acu[] = array('id' => $row['id'],'categoria' => $row['categoria']);
		}
		print json_encode($acu);		
	}
	if (isset($_POST['form-programas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.programas VALUES ('$id', '$_POST[txt_codigo]', '$_POST[txt_nombre]', '1', '$fecha')");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}

	}
	//Validar la existencia del codigo de programa
	if (isset($_POST['validar_existencia'])) {
		$resp = $class->consulta("SELECT count(*) FROM agenda_invitados.programas where codigo='$_POST[txt_codigo]';");
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

	//para el guardado de Fichas
	if (isset($_POST['form-programas2'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.fichas VALUES ('$id', '$_POST[select_codigo]', '$_POST[txt_codigo2]', '1', '$fecha')");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//validar la existencia del codigo de ficha
	if (isset($_POST['validar_existencia2'])) {
		$resultado = $class->consulta("SELECT count(*) FROM agenda_invitados.fichas where cod_ficha='$_POST[txt_codigo2]';");
		while ($row=$class->fetch_array($resultado)) {
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
	//Eliminar Programas
	if (isset($_POST['eliminar_programas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("UPDATE agenda_invitados.programas set estado = '0' where id = '$_POST[id]'");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//Actualiza el nombre de los programas
	if (isset($_POST['name'])) {
		$entrada = $_POST['name'];
		if ($entrada=='actualizar_nombre_programas') {
			$resp = $class->consulta("UPDATE agenda_invitados.programas set nombre = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
	//Actualizar el código de los programas
	if ($entrada=='actualizar_codigo_programas') {
		$resp = $class->consulta("UPDATE agenda_invitados.programas set codigo = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
	}

//Actualiza el codigo de las Fichas
	if (isset($_POST['name'])) {
		$entrada = $_POST['name'];
		if ($entrada=='actualizar_nombre_fichas') {
			$resp = $class->consulta("UPDATE agenda_invitados.fichas set cod_ficha = '$_POST[value]' where id = '$_POST[pk]'");
			if ($resp) {
				//respuesta correcta
				print_r(json_encode(array('valid' => 'true')));	
			}else{
				//respuesta false
				print_r(json_encode(array('valid' => 'false')));
			}
		}
	}
	//LLena los programas del Combo
	if (isset($_POST['llenar_programas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT id, upper(codigo) as codigo, nombre FROM agenda_invitados.programas where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['codigo'].'</option>';
		}
		
	}
	//Llena las tablas de Programas
	if (isset($_POST['llenar_tabla_programas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT id, upper(codigo) as codigo, nombre FROM agenda_invitados.programas where estado='1';");
		$sum=0;
		while ($row=$class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[1].'</td>
						<td>'.$row[2].'</td>
						<td>
							<div class="hidden-sm hidden-xs btn-group">
								<button class="btn btn-xs btn-info" onclick=modificar_programas("'.$row[0].'")>
									<i class="ace-icon fa fa-pencil bigger-120"></i>
								</button>

								<button class="btn btn-xs btn-danger" onclick=eliminar_programas("'.$row[0].'")>
									<i class="ace-icon fa fa-trash-o bigger-120"></i>
								</button>
							</div> 
						</td>
					</tr>';
		}
	}
	//para la consulta de los datos de los programas
	if(isset($_POST['consultar_datos_programas'])){
		$resultado = $class->consulta("SELECT id, codigo, nombre, estado, fecha_creacion FROM agenda_invitados.programas where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data = array('id' => $row['id'], 'codigo'=>$row['codigo'], 'nombre'=>$row['nombre']);
		}
		print_r(json_encode($data));
	}
		//para la consulta de los datos de las Fichas
	if(isset($_POST['consultar_datos_fichas'])){
		$resultado = $class->consulta("SELECT id, id_programa, cod_ficha, estado, fecha FROM agenda_invitados.fichas where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data = array('id' => $row['id'], 'id_programa'=>$row['id_programa'], 'cod_ficha'=>$row['cod_ficha']);
		}
		print_r(json_encode($data));
	}

	//Llena las tablas de Fichas
	if (isset($_POST['llenar_tabla_fichas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("select F.id, P.nombre, F.cod_ficha from agenda_invitados.programas P, agenda_invitados.fichas F where P.id=F.id_programa and F.estado='1'");
		$sum=0;
		while ($row=$class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$sum++.'</td>					
						<td>'.$row[1].'</td>
						<td>'.$row[2].'</td>
						<td>
							<div class="hidden-sm hidden-xs btn-group">
								<button class="btn btn-xs btn-info" onclick=modificar_fichas("'.$row[0].'")>
									<i class="ace-icon fa fa-pencil bigger-120"></i>
								</button>

								<button class="btn btn-xs btn-danger" onclick=eliminar_fichas("'.$row[0].'")>
									<i class="ace-icon fa fa-trash-o bigger-120"></i>
								</button>
							</div> 
						</td>
					</tr>';
		}
	}
//Eliminar Fichas
	if (isset($_POST['eliminar_fichas'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("UPDATE agenda_invitados.fichas set estado = '0' where id = '$_POST[id]'");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}

	
?>



