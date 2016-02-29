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


	if (isset($_POST['form-procesos'])) {
		$id = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO agenda_invitados.aceptado VALUES ('$id','$_POST[select_ficha]','$_POST[txt_contactado_por]', '$_POST[txt_fecha]', '$_POST[txt_hora]', '$_POST[txt_forma]', '$_POST[txt_contactado_con]', '$_POST[txt_responsable]', '1', '$fecha');");
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