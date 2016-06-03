<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	// error_reporting(0);
	
	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_usuarios = $class->idz();
		$contrasenia = md5($_POST['clave2']);

		$resp = $class->consulta("INSERT INTO usuario VALUES (			'$id_usuarios',
																		'$_POST[select_cargo]',
																		'$_POST[nombres]',
																		'$_POST[apellidos]',
																		'$_POST[identificacion]',
																		'$_POST[telefono1]',
																		'$_POST[telefono2]',
																		'$_POST[correo]',
																		'$_POST[direccion]',
																		'$_POST[usuario]',
																		'$contrasenia',
																		'1', 
																		'$fecha');");	
		

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE usuario SET			        id_cargo = '$_POST[select_cargo]',
																		nombre = '$_POST[nombres]',
																		apellido = '$_POST[apellidos]',
																		cedula = '$_POST[identificacion]',
																		telefono = '$_POST[telefono1]',
																		celular = '$_POST[telefono2]',
																		email = '$_POST[correo]',
																		direccion = '$_POST[direccion]',
																		usuario = '$_POST[usuario]',
																		fecha = '$fecha' WHERE id = '$_POST[id_usuario]'");	

		$data = 2;
		echo $data;
	}

	//comparar identificacion usuarios
	if (isset($_POST['comparar_identificacion'])) {
		$resultado = $class->consulta("SELECT * FROM usuario U WHERE U.cedula = '$_POST[identificacion]' AND estado = '1'");
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
		$resultado = $class->consulta("SELECT id, nombre FROM cargo WHERE estado='1' order by id asc");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	// fin
?>