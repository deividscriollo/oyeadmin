<?php        
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	// guardar facturas
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_facturas = $class->idz();
		$fecha = $class->fecha_hora();
		$fecha_corta = $class->fecha();
		$data = "";
		$serie = "001-001-".$_POST['serie_factura'];

		$resp = $class->consulta("INSERT INTO factura_venta VALUES  (				'$id_facturas',
																					'$_POST[select_ruc]',
																					'$_SESSION[Id]',
																					'$_POST[fecha_emision]',
																					'$_POST[fecha_emision]',
																					'$_POST[select_forma]',
																					'$serie',
																					'$_POST[subtotal]',
																					'$_POST[descuento_total]',
																					'$_POST[base_imponible]',
																					'$_POST[iva]',
																					'$_POST[otros]',
																					'$_POST[total_pagar]',
																					'',
																					'1', 
																					'$fecha')");

	}
	// fin


	//cargar ultima serie factura venta
	if (isset($_POST['cargar_series'])) {
		$resultado = $class->consulta("SELECT MAX(serie) FROM factura_venta GROUP BY id ORDER BY id asc");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('serie' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin

	//cargar numero factura preimpresa
	if (isset($_POST['cargar_factura_preimpresa'])) {
		$resultado = $class->consulta("SELECT E.inicio_fac_preimpresa, E.item_factura FROM empresa E WHERE estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('inicio_fac_preimpresa' => $row[0],'item_factura' => $row[1]);
		}
		print_r(json_encode($data));
	}
	//fin

	//LLenar combo clientes ruc
	if (isset($_POST['llenar_clientes_ruc'])) {
		$resultado = $class->consulta("SELECT  C.id, C.ruc FROM clientes C WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['ruc'].'</option>';
		}
	}
	// fin

	//LLenar combo clientes nombre
	if (isset($_POST['llenar_clientes_nombre'])) {
		$resultado = $class->consulta("SELECT  C.id, C.empresa FROM clientes C WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['empresa'].'</option>';
		}
	}
	// fin

	//llenar clientes ruc  anidado
	if (isset($_POST['llenar_informacion_ruc'])) {
		$resultado = $class->consulta("SELECT C.id, C.direccion, C.telefono FROM clientes C WHERE estado = '1' AND C.id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id' => $row[0], 'direccion'=>$row[1], 'telefono'=>$row[2]);
		}
		print_r(json_encode($data));
	}
	//fin

	//llenar clientes nombres anidado
	if (isset($_POST['llenar_informacion_nombres'])) {
		$resultado = $class->consulta("SELECT C.id, C.direccion, C.telefono FROM clientes C WHERE estado = '1' AND C.id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id' => $row[0], 'direccion'=>$row[1], 'telefono'=>$row[2]);
		}
		print_r(json_encode($data));
	}
	//fin

	//LLenar combo tipo paquete
	if (isset($_POST['llenar_tipo_paquete'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_paquetes WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_paquete'].'</option>';
		}
	}
	// fin

	//LLenar combo paquetes
	if (isset($_POST['llenar_paquete'])) {
		$resultado = $class->consulta("SELECT * FROM paquetes P, tipo_paquetes T WHERE P.id_tipo_paquete = T.id AND P.id_tipo_paquete = '".$_POST['id']."';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['descripcion'].'</option>';
		}
	}
	// fin

	//LLenar combo tipo contrato
	if (isset($_POST['llenar_tipo_contrato'])) {
		$resultado = $class->consulta("SELECT  * FROM tipo_contrato WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_tipo'].'</option>';
		}
	}
	// fin

	//LLenar programas
	if (isset($_POST['llenar_programa'])) {
		$resultado = $class->consulta("SELECT  * FROM programas.programa WHERE estado = '1'");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nombre_programa'].'</option>';
		}
	}
	// fin

?>