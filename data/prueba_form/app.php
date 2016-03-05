<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

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
	// if(isset($_POST['consultar_datos_programas'])){
	// 	$resultado = $class->consulta("SELECT id, codigo, nombre, estado, fecha_creacion FROM agenda_invitados.programas where id='$_POST[id]';");
	// 	while ($row=$class->fetch_array($resultado)) {
	// 		$data = array('id' => $row['id'], 'codigo'=>$row['codigo'], 'nombre'=>$row['nombre']);
	// 	}
	// 	print_r(json_encode($data));
	// }
	//consulta de nombres de programas
	//Llena el código del programa
	// if (isset($_POST['llenar_cod_programa'])) {
	// 	$id = $class->idz();
	// 	$resultado = $class->consulta("select F.id, P.codigo, F.cod_ficha from agenda_invitados.programas P, agenda_invitados.fichas F where P.id=F.id_programa and F.estado='1'");
	// 	$sum=0;
	// 	while ($row=$class->fetch_array($resultado)) {
	// 		print '<option value="'.$row['F.id'].'">'.$row['P.codigo'].'</option>';
	// 	}
	// }
?>