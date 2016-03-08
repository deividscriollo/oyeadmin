<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

	// LLenar el formulario del proceso 1 que es Pre-entrevista
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_ficha = $class->idz();
		$id_invitados = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.fichas VALUES (		'$id_ficha',
																					'$_POST[select_programas]',
																					'',
																					'1', '$fecha');");

		$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES (	'$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_contactado_por]',
																					'$_POST[txt_fecha]',
																					'$_POST[txt_hora]',
																					'$_POST[txt_forma]',
																					'$_POST[txt_contactado_con]',
																					'$_POST[select_usuarios]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.preconfirmado VALUES ('$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_preconfirmado_por]',
																					'$_POST[txt_fecha2]',
																					'$_POST[txt_hora2]', 
																					'$_POST[txt_forma2]', 
																					'$_POST[txt_preconfirmado_con]',
																					'$_POST[select_usuarios]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.confirmado VALUES (	'$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_confirmado_por]',
																					'$_POST[txt_fecha3]',
																					'$_POST[txt_hora3]',
																					'$_POST[txt_forma3]',
																					'$_POST[txt_confirmado_con]',
																					'$_POST[select_usuarios]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.datos_invitado VALUES ('$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_invitado]',
																					'$_POST[txt_contacto]', 
																					'$_POST[txt_empresa]', 
																					'$_POST[txt_hora_invitado1]',
																					'$_POST[txt_telf]',
																					'$_POST[txt_telf2]',
																					'$_POST[txt_telf3]',
																					'$_POST[txt_direccion]',
																					'$_POST[txt_email]',
																					'$_POST[txt_nombre1]', 
																					'$_POST[txt_nombre2]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.temas VALUES (		'$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_principal]', 
																					'$_POST[txt_secundario]',
																					'1', '$fecha');");
		//fin del primer formulario Pre-Entrevista
		// LLenar el formulario del proceso 1 que es Entrevista
		$resp = $class->consulta("INSERT INTO agenda_invitados.entrevista VALUES (	'$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_pregunta1]', 
																					'$_POST[txt_pregunta2]',
																					'$_POST[txt_pregunta3]',
																					'$_POST[txt_pregunta4]',
																					'$_POST[txt_pregunta5]',
																					'$_POST[txt_pregunta6]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.horarios VALUES (	'$id_invitados',
																					'$id_ficha',
																					'$_POST[txt_hora_llegada]', 
																					'$_POST[txt_tiempo]',
																					'$_POST[select_usuarios4]',
																					'$_POST[select_usuarios5]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.mejoras VALUES (		'$id_invitados',
																					'$id_ficha',
																					'$_POST[rb_calificacion]',
																					'$_POST[txta_sugerencia]',
																					'1', '$fecha');");
		//fin del segundo formulario Entrevista

		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}

	//LLena los programas en el Combo
	if (isset($_POST['llenar_programas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, upper(codigo) as codigo, nombre FROM agenda_invitados.programas where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena todos los usuarios
	if (isset($_POST['llenar_usuarios'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, id_cargo, nombre FROM agenda_invitados.usuario where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//para la consulta de los datos de los programas
	if(isset($_POST['consultar_datos_programas'])){
		$resultado = $class->consulta("SELECT id, codigo, nombre, estado, fecha_creacion FROM agenda_invitados.programas where id='$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data['programa'] = array('id' => $row['id'], 'codigo'=>$row['codigo'], 'nombre'=>$row['nombre']);
		}
		// $resultado = $class->consulta("SELECT count(*) FROM agenda_invitados.fichas where id_programa='$_POST[id]';");
		// while ($row=$class->fetch_array($resultado)) {
		// 	$data['num_ficha']= array('cantidad_fichas' => $row[0] );
		//}
		print_r(json_encode($data));
	}
?>