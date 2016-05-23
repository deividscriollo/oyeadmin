<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	error_reporting(0);

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_rol_pagos = $class->idz();
		$id_detalle_rol_pagos = $class->idz();
		$fecha = $class->fecha_hora();

		$data = "";

		$resp = $class->consulta("INSERT INTO rol_pagos.rol_pagos VALUES  (			'$id_rol_pagos',
																					'$_POST[select_empleado]',
																					'$_POST[txt_mes]',
																					'$_POST[sueldo]',
																					'$_POST[neto_pagar]',
																					'$_POST[codigo]',
																					'1', 
																					'$fecha')");

		$resp = $class->consulta("INSERT INTO rol_pagos.detalle_rol_pagos VALUES(	'$id_detalle_rol_pagos',
																					'$id_rol_pagos',
																					'$_POST[tiempo_horas]',
																					'$_POST[dias_laborados]',
																					'$_POST[extras]',
																					'$_POST[sueldo_basico]',
																					'$_POST[horas_extras]',
																					'$_POST[comisiones]',
																					'$_POST[decimo_tercero]',
																					'$_POST[decimo_cuarto]',
																					'$_POST[total_ingresos]',
																					'$_POST[aporte_iess]',
																					'$_POST[pres_quierografarios]',
																					'$_POST[pres_anticipos]',
																					'$_POST[atrasos]',
																					'$_POST[permisos]',
																					'$_POST[total_descuentos]',
																					'1', 
																					'$fecha',
																					'$_POST[faltas]',
																					'$_POST[no_laborado]')");
		$data = $id_rol_pagos;
		echo $data;
	}




	//LLena combo empleados
	if (isset($_POST['llenar_empleado'])) {
		$id = $class->idz();
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

	// cargar ultima codigo rol pagos individual
	if (isset($_POST['cargar_codigo_secuencia'])) {
		$resultado = $class->consulta("SELECT max(codigo) FROM rol_pagos.rol_pagos WHERE id_personal = '".$_POST['id']."' GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('codigo' => $row[0]);
		}
		print_r(json_encode($data));
	}
	// fin


?>