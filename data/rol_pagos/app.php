<?php 
	if(!isset($_SESSION)){
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);
	$fecha = $class->fecha_hora();
	
	// guardar rol pagos
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_rol_pagos = $class->idz();
		$id_detalle_rol_pagos = $class->idz();
		$data = "";

		$resp = $class->consulta("INSERT INTO rol_pagos.rol_pagos VALUES  (			'$id_rol_pagos',
																					'$_POST[select_empleado]',
																					'$_POST[txt_mes]',
																					'".number_format($_POST['sueldo'], 3, '.', '')."',
																					'".number_format($_POST['neto_pagar'], 3, '.', '')."',
																					'$_POST[codigo]',
																					'1', 
																					'$fecha')");

		$resp = $class->consulta("INSERT INTO rol_pagos.detalle_rol_pagos VALUES(	'$id_detalle_rol_pagos',
																					'$id_rol_pagos',
																					'$_POST[tiempo_horas]',
																					'$_POST[dias_laborados]',
																					'$_POST[extras]',
																					'".number_format($_POST['sueldo_basico'], 3, '.', '')."',
																					'".number_format($_POST['horas_extras'], 3, '.', '')."',
																					'".number_format($_POST['comisiones'], 3, '.', '')."',
																					'".number_format($_POST['decimo_tercero'], 3, '.', '')."',
																					'".number_format($_POST['decimo_cuarto'], 3, '.', '')."',
																					'".number_format($_POST['total_ingresos'], 3, '.', '')."',
																					'".number_format($_POST['aporte_iess'], 3, '.', '')."',
																					'".number_format($_POST['pres_quirografarios'], 3, '.', '')."',
																					'".number_format($_POST['pres_anticipos'], 3, '.', '')."',
																					'".number_format($_POST['atrasos'], 3, '.', '')."',
																					'".number_format($_POST['permisos'], 3, '.', '')."',
																					'".number_format($_POST['total_descuentos'], 3, '.', '')."',
																					'1', 
																					'$fecha',
																					'$_POST[faltas]',
																					'$_POST[no_laborado]')");
		$data = $id_rol_pagos;
		echo $data;
	}
	// fin

	// guardar anticipos
	if (isset($_POST['btn_guardar_anticipo']) == "btn_guardar_anticipo") {
		$id_anticipo = $class->idz();
		$data = "";

		$resp = $class->consulta("INSERT INTO rol_pagos.anticipos VALUES  (			'$id_anticipo',
																					'".$_SESSION['user']['id']."',
																					'$_POST[serie_anticipo]',
																					'$_POST[select_empleado2]',
																					'".number_format($_POST['monto_anticipo'], 3, '.', '')."',
																					'$_POST[fecha_anticipo]',
																					'$_POST[meses_anticipo]',
																					'$_POST[select_forma_pago]',
																					'$_POST[cheque_numero]',
																					'$_POST[select_banco]',
																					'1', 
																					'$fecha')");
		$data = $id_anticipo;
		echo $data;
	}
	// fin

	// guardar permisos
	if (isset($_POST['btn_guardar_permiso']) == "btn_guardar_permiso") {
		$id_permiso = $class->idz();
		$data = "";
		$regreso = "NO";
		if(isset($_POST["regreso"]))
			$regreso = "SI";
		
		$resp = $class->consulta("INSERT INTO rol_pagos.permisos VALUES  (			'$id_permiso',
																					'".$_SESSION['user']['id']."',
																					'$_POST[serie_permiso]',
																					'$_POST[ciudad]',
																					'$_POST[fecha_permiso]',
																					'$_POST[select_empleado3]',
																					'$_POST[select_empleado4]',
																					'$_POST[horas]',
																					'$_POST[dias]',
																					'$_POST[hora_salida]',
																					'$regreso',
																					'$_POST[hora_retorno]',
																					'$_POST[tiempo_salida]',
																					'$_POST[asunto]',
																					'$_POST[lugar]',
																					'$_POST[select_parte]',
																					'$_POST[select_motivo_cargos]',
																					'1', 
																					'$fecha')");
		$data = $id_permiso;
		echo $data;
	}
	// fin

	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$resultado = $class->consulta("SELECT id, nombres, apellidos FROM corporativo.personal WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombres'].' '.$row['apellidos'].'</option>';
		}
	}
	// fin

	// consulta rol detalles
	if (isset($_POST['consulta_rol'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * from rol_pagos.rol_pagos  R, rol_pagos.detalle_rol_pagos D where R.id = D.id_rol_pagos and id_personal =  '".$_POST['id']."'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['10'];
		    $arr_data[] = $row['11'];
		    $arr_data[] = $row['12'];
		    $arr_data[] = $row['13'];
		    $arr_data[] = $row['14'];
		    $arr_data[] = $row['15'];
		    $arr_data[] = $row['16'];
		    $arr_data[] = $row['17'];
		    $arr_data[] = $row['18'];
		    $arr_data[] = $row['19'];
		    $arr_data[] = $row['20'];
		    $arr_data[] = $row['21'];
		    $arr_data[] = $row['22'];
		    $arr_data[] = $row['23'];
		    $arr_data[] = $row['24'];
		}
		echo json_encode($arr_data);
	}
	// rol

	//llenar id_cargos
	if (isset($_POST['llenar_cargos'])) {
		$resultado = $class->consulta("SELECT C.nombre, P.sueldo FROM corporativo.cargos_personal G, corporativo.cargo C, corporativo.personal P where P.id = G.id_personal and C.id = G.id_cargo  and G.id_personal = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('cargo' => $row[0], 'sueldo'=>$row[1]);
		}
		print_r(json_encode($data));
	}
	//fin

	// cargar ultima codigo rol pagos general
	if (isset($_POST['cargar_codigo_general'])) {
		$resultado = $class->consulta("SELECT max(codigo) FROM rol_pagos.rol_pagos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo anticipos
	if (isset($_POST['cargar_codigo_anticipo'])) {
		$resultado = $class->consulta("SELECT max(serie_anticipo) FROM rol_pagos.anticipos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_anticipo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo permisos
	if (isset($_POST['cargar_codigo_permisos'])) {
		$resultado = $class->consulta("SELECT max(serie_permiso) FROM rol_pagos.permisos GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie_permiso' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo rol pagos individual
	if (isset($_POST['cargar_codigo_secuencia'])) {
		$resultado = $class->consulta("SELECT max(codigo) FROM rol_pagos.rol_pagos WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin

	// cargar ultima codigo rol pagos individual
	if (isset($_POST['cargar_codigo_rol'])) {
		$resultado = $class->consulta("SELECT * FROM corporativo.codigo_rol WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row['codigo']);
		}
		print_r(json_encode($data));
	}
	// fin

	//LLena combo bancos
	if (isset($_POST['llenar_bancos'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
?>