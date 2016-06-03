<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
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
																		'defaul.jpg',
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
?>