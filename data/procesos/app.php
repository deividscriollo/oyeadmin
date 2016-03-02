<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();
	// solo ejemplo
	// if (isset($_POST['name'])=='contactado_por') {
	// 	$id = $class->idz();
	// 	$fecha = $class->fecha_hora();
	// 	$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES ('$id','$_POST[pk]','$_POST[value]', '$fecha', '$fecha', '', '', '', '1', '$fecha');");
	// 	if ($resp) {
	// 		print_r(json_encode(array('valid' => 'true')));	
	// 	}else {
	// 		print_r(json_encode(array('valid' => 'false')));	
	// 	}
			
	// }

	// LLenar el formulario del proceso 1 que es Pre-entrevista
	if (isset($_POST['form-procesos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES ('$id','$_POST[select_ficha]','$_POST[txt_contactado_por]', '$_POST[txt_fecha]', '$_POST[txt_hora]', '$_POST[txt_forma]', '$_POST[txt_contactado_con]', '$_POST[txt_responsable]', '1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.preconfirmado VALUES ('$id','$_POST[select_ficha]','$_POST[txt_preconfirmado_por]', '$_POST[txt_fecha2]', '$_POST[txt_hora2]', '$_POST[txt_forma2]', '$_POST[txt_preconfirmado_con]', '$_POST[txt_responsable2]', '1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.confirmado VALUES ('$id','$_POST[select_ficha]','$_POST[txt_confirmado_por]', '$_POST[txt_fecha3]', '$_POST[txt_hora3]', '$_POST[txt_forma3]', '$_POST[txt_confirmado_con]', '$_POST[txt_responsable3]', '1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.datos_invitado VALUES ('$id','$_POST[select_ficha]','$_POST[txt_invitado]', '$_POST[txt_contacto]', '$_POST[txt_empresa]', '$_POST[txt_hora_invitado1]', '$_POST[txt_telf]', '$_POST[txt_telf2]','$_POST[txt_telf3]','$_POST[txt_direccion]','$_POST[txt_email]','$_POST[txt_nombre1]', '$_POST[txt_nombre2]', '1', '$fecha');");
		$resp = $class->consulta("INSERT INTO agenda_invitados.temas VALUES ('$id','$_POST[select_ficha]','$_POST[txt_principal]', '$_POST[txt_secundario]','1', '$fecha');");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	// Llenar el formulario del proceso2 que es la Entrevista
	if (isset($_POST['form-procesos2'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.entrevista VALUES ('$id','$_POST[select_ficha]','$_POST[txt_pregunta1]', '$_POST[txt_pregunta2]', '$_POST[txt_pregunta3]', '$_POST[txt_pregunt4]', '$_POST[txt_pregunta5]', '$_POST[txt_pregunta6]', '1', '$fecha');");
		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
	//llenada del combo con las fichas de los programas
	if (isset($_POST['llenar_ficha'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resultado = $class->consulta("SELECT id, cod_ficha FROM agenda_invitados.fichas where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['cod_ficha'].'</option>';
		}
		if ($resultado) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}
?>