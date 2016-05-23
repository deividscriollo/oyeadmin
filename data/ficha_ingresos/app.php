<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();

	// LLenar el formulario del proceso 1 
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id = $class->idz();
		$id_personal = $class->idz();
		$id_ant_trab = $class->idz();
		$id_familia = $class->idz();
		$id_cargos = $class->idz();
		
		$id_nacionalidad = $class->idz();
		$fecha = $class->fecha_hora();

		$elemento_relacion='false';
		if(isset($_POST['inp_relacion']))
			$elemento_relacion='true';

		// descomponer cursos
		$campos1 = json_decode($_POST['campos1']);
		$campos2 = json_decode($_POST['campos2']);
		$data = "";

		$resp = $class->consulta("INSERT INTO corporativo.personal VALUES  (	'$id_personal',
																				'$elemento_relacion',
																				'$_POST[txt_nombres]',
																				'$_POST[txt_apellidos]',
																				'$_POST[txt_cedula]',
																				'$_POST[txt_fecha_nacimiento]',
																				'$_POST[txt_edad]',
																				'$_POST[txt_telf_fijo]',
																				'$_POST[txt_telf_celular]',
																				'$_POST[select_civil]',
																				'$_POST[txt_cargas]',
																				'$_POST[txt_email]',
																				'$_POST[rb_instruccion]',
																				'$_POST[txt_especialidad]',
																				'$_POST[rb_vivienda]',
																				'$_POST[txt_barrio]',
																				'$_POST[txt_sector]',
																				'$_POST[txt_direccion]',
																				'$_POST[select_sangre]',
																				'$_POST[txt_alergia]',
																				'$_POST[txt_enfermedad]',
																				'$_POST[txt_ini_trab]',
																				'$_POST[txt_fecha_aplicacion]',
																				'$_POST[sueldo]',
																				'1', 
																				'$fecha')");

		for ($i = 0; $i < count($campos1); $i++) {
			$id_cursos = $class->idz();

			$resp = $class->consulta("INSERT INTO corporativo.cursos VALUES (	'$id_cursos',
																				'$id_personal',
																				'".$campos1[$i]->curso."',
																				'".$campos1[$i]->estab."',
																				'".$campos1[$i]->tiempo."',
																				'1', 
																				'$fecha');");
		}

		for ($i = 0; $i < count($campos2); $i++) {
		$id_bancos = $class->idz();
		$resp = $class->consulta("INSERT INTO corporativo.cuentas VALUES (			'$id_bancos',
																					'".$campos2[$i]->id_cuen."',
																					'$id_personal',
																					'".$campos2[$i]->numero_cuen."',
																					'".$campos2[$i]->tipo_cuen."',
																					'1', 
																					'$fecha');");
		}

		$resp = $class->consulta("INSERT INTO corporativo.anterior_trab VALUES (	'$id_ant_trab',
																					'$id_personal',
																					'$_POST[txt_empresa]',
																					'$_POST[txt_cargo]',
																					'$_POST[txt_direccion_trab]',
																					'$_POST[txt_telf_fijo_trab]',
																					'$_POST[txt_telf_celular_trab]',
																					'$_POST[txt_jefe]',
																					'$_POST[tiempo3]',
																					'$_POST[txt_ciudad_trab]',
		 																			'1', 
																					'$fecha');");


		$resp = $class->consulta("INSERT INTO corporativo.datos_familiar VALUES (	'$id_familia',
																					'$id_personal',
																					'$_POST[txt_nombres_familia]',
																					'$_POST[txt_parentesco]',
																					'$_POST[txt_telf_familia]',
																					'$_POST[txt_dir_fami]',
																					'$_POST[txt_ciudad_fami]',
																					'1',
																					'$fecha');");


		$resp = $class->consulta("INSERT INTO corporativo.cargos_personal VALUES (	'$id_cargos',
																					'$_POST[select_areas]',
																					'$id_personal',
																					'$_POST[select_cargo]',
																					'1', 
																					'$fecha');");

	
		$resp = $class->consulta("INSERT INTO corporativo.nacionalidad VALUES  (	'$id_nacionalidad',
																					'$id_personal',
																					'$_POST[select_ciudad]',
																					'1', 
																					'$fecha');");
		$data = $id_personal;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {
		$elemento_relacion ='false';
		if(isset($_POST['inp_relacion']))
			$elemento_relacion ='true';

		$fecha = $class->fecha_hora();

		$resp = $class->consulta("UPDATE corporativo.personal set   		relacion_dependencia = '$elemento_relacion',
																			nombres = '$_POST[txt_nombres]',
																			apellidos ='$_POST[txt_apellidos]',
																			cedula_identificacion = '$_POST[txt_cedula]',
																			fecha_nacimiento = '$_POST[txt_fecha_nacimiento]',
																			edad = '$_POST[txt_edad]',
																			telf_fijo = '$_POST[txt_telf_fijo]',
																			telf_celular = '$_POST[txt_telf_celular]',
																			estado_civil = '$_POST[select_civil]',
																			cargas_familiares = '$_POST[txt_cargas]',
																			email = '$_POST[txt_email]',
																			instruccion = '$_POST[rb_instruccion]',
																			especialidad = '$_POST[txt_especialidad]',
																			tipo_vivienda = '$_POST[rb_vivienda]',
																			barrio = '$_POST[txt_barrio]',
																			sector = '$_POST[txt_sector]',
																			direccion = '$_POST[txt_direccion]',
																			tipo_sangre = '$_POST[select_sangre]',
																			alergia_antibio = '$_POST[txt_alergia]',
																			enfermedad = '$_POST[txt_enfermedad]',
																			fecha_ing_trab = '$_POST[txt_ini_trab]',
																			fecha_aplicacion = '$_POST[txt_fecha_aplicacion]', 
																			sueldo = '$_POST[sueldo]',
																			fecha_creacion = '$fecha'
																			where id = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.nacionalidad set 		id_ciudad_pais = '$_POST[select_ciudad]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.anterior_trab set  	nomre_empresa = '$_POST[txt_empresa]',
																			cargo = '$_POST[txt_cargo]',
																			direccion = '$_POST[txt_direccion_trab]',
																			telf_fijo = '$_POST[txt_telf_fijo_trab]',
																			telf_celular = '$_POST[txt_telf_celular_trab]',
																			nombre_jefe = '$_POST[txt_jefe]',
																			tiempo_trab = '$_POST[tiempo3]',
																			ciudad = '$_POST[txt_ciudad_trab]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.datos_familiar set     nombres = '$_POST[txt_nombres_familia]',
																			parentesco = '$_POST[txt_parentesco]',
																			telefono = '$_POST[txt_telf_familia]',
																			direccion = '$_POST[txt_dir_fami]',
																			ciudad_fami = '$_POST[txt_ciudad_fami]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

		$resp = $class->consulta("UPDATE corporativo.cargos_personal set 	id_areas = '$_POST[select_areas]',
																			id_cargo = '$_POST[select_cargo]',
																			fecha_creacion = '$fecha'
																			where id_personal = '$_POST[id_personal]'");

	$data = $_POST['id_personal'];
	echo $data;
	}

	//LLena los bancos en el Combo
	if (isset($_POST['llenar_bancos'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena las areas en el Combo
	if (isset($_POST['llenar_areas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena las areas en el Combo
	if (isset($_POST['llenar_cargo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.cargo WHERE estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena los paises del Combo
	if (isset($_POST['llenar_pais'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nom_pais FROM localizacion.pais WHERE stado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nom_pais'].'</option>';
		}
	}
	//LLena las provincia del Combo
	if (isset($_POST['llenar_provincia'])) {
		$id = $class->idz();
		$id_provincia = $_POST['id_provincia'];
		$resultado = $class->consulta("SELECT provincia.id, provincia.nom_provincia FROM localizacion.pais ,localizacion.provincia WHERE provincia.id_pais='$id_provincia' AND pais.id='$id_provincia' AND provincia.stado = '1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nom_provincia'].'</option>';
		}
	}
	//LLena las  ciudades del Combo
	if (isset($_POST['llenar_ciudad'])) {
		$id = $class->idz();
		$id_ciudad = $_POST['id_ciudad'];
		$resultado = $class->consulta("SELECT ciudad.id, ciudad.nom_ciudad FROM localizacion.ciudad ,localizacion.provincia WHERE ciudad.id_provincia='$id_ciudad' AND provincia.id='$id_ciudad' AND ciudad.stado = '1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			print '<option value="'.$row['id'].'">'.$row['nom_ciudad'].'</option>';
		}
	}
	//para la consulta de los datos de la ciudad
	if(isset($_POST['consultar_datos_ciudad'])){
		$resultado = $class->consulta("SELECT id, nom_ciudad, stado, fecha FROM localizacion.ciudad WHERE id = '$_POST[id]';");
		while ($row=$class->fetch_array($resultado)) {
			$data= array('id' => $row['id'], 'nom_ciudad'=>$row['nom_ciudad']);
		}
		print_r(json_encode($data));
	}
	//llenar id_ciudad
	if (isset($_POST['cargar_id_ciudad'])) {
		$resultado = $class->consulta("SELECT N.id_ciudad_pais FROM corporativo.nacionalidad N WHERE estado = '1' AND id_personal = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id_ciudad' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin
	//llenar id provincia
	if (isset($_POST['cargar_id_provincia'])) {
		$resultado = $class->consulta("SELECT C.id_provincia FROM localizacion.ciudad C where id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id_provincia' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin
	//llenar id pais
	if (isset($_POST['cargar_id_pais'])) {
		$resultado = $class->consulta("SELECT P.id_pais FROM localizacion.provincia P WHERE id = '$_POST[id]'");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('id_pais' => $row[0]);
		}
		print_r(json_encode($data));
	}
	//fin
	// consulta la edad del personal con la fecha de nacimiento y fecha actual
	if (isset($_POST['consulta_edad'])) {
		$datetime1 = date_create($_POST['fecha']);
		$datetime2 = date_create($class->fecha());
		$interval = date_diff($datetime1, $datetime2);
		print($interval->y) ;
	}
	// consultar ficha de ingreso general
	if(isset($_POST['cargar_tabla_fichas'])){
		$resultado = $class->consulta("SELECT  P.id, P.cedula_identificacion, P.nombres, P.apellidos, P.fecha_aplicacion FROM corporativo.personal P WHERE P.estado = '1';");
		while ($row=$class->fetch_array($resultado)) {
			$lista[] = array('id' => $row['id'],
						'cedula_identificacion' => $row['cedula_identificacion'],
						'nombres' => $row['nombres'],
						'apellidos' => $row['apellidos'],
						'fecha_aplicacion' => $row['fecha_aplicacion']
						);
		}
		echo $lista = json_encode($lista);
	}
	// consultar ficha de ingreso personal
	if(isset($_POST['llenar_personal'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT  * FROM corporativo.personal P WHERE P.estado = '1' AND id = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['1'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
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
		}
		echo json_encode($arr_data);
	}
	// Llenar cursos realizados
	if (isset($_POST['llenar_cursos_realizados'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT C.nombre, C.establecimiento, C.tiempo FROM corporativo.cursos C  WHERE C.id_personal = '$_POST[id]' ");
		while ($row = $class->fetch_array($resultado)) {
			$accion = '<div class="hidden-sm hidden-xs action-buttons"> <a class="red dc_btn_accion tooltip-error" data-rel="tooltip" data-original-title="Eliminar"><i class="ace-icon fa fa-trash-o bigger-130" onclick=\"angular.element(this).scope().methodseliminar(event)\"></i></a></div>';
			print '	<tr>
						<td>'.$row['0'].'</td>					
						<td>'.$row['1'].'</td>
						<td>'.$row['2'].'</td>
						<td>'.$accion.'</td>
					</tr>';
		}
	}
	// Llenar cuentas bancarias
	if (isset($_POST['llenar_cuentas_bancarias'])) {
		$resultado = $class->consulta("SELECT C.nombre_cuenta, B.nombre, C.numero FROM corporativo.cuentas  C, corporativo.bancos B WHERE C.id_bancos = B.id AND C.id_personal = '$_POST[id]' ");
		while ($row = $class->fetch_array($resultado)) {
			print '	<tr>
						<td>'.$row['0'].'</td>					
						<td>'.$row['1'].'</td>
						<td>'.$row['2'].'</td>
						<td><div class="hidden-sm hidden-xs action-buttons"> <a class="red dc_btn_accion tooltip-error" data-rel="tooltip" data-original-title="Eliminar"><i class="ace-icon fa fa-trash-o bigger-130" onclick=\"angular.element(this).scope().methodseliminar2(event)\"></i></a></div></td>
					</tr>';
		}
	}
	// consultar ficha de ingreso nacionalidad
	if(isset($_POST['llenar_nacionalidad'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT L.id FROM corporativo.nacionalidad N, Localizacion.ciudad L, corporativo.personal P WHERE N.id_ciudad_pais = L.id AND N.id_personal = P.id and N.id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
				$data = array('id' => $row['id']);
		}
		print_r(json_encode($data));
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_trabajos_anteriores'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM corporativo.anterior_trab  WHERE estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		    $arr_data[] = $row['7'];
		    $arr_data[] = $row['8'];
		    $arr_data[] = $row['9'];
		}
		echo json_encode($arr_data);
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_datos_familiares'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT * FROM corporativo.datos_familiar  WHERE estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['2'];
		    $arr_data[] = $row['3'];
		    $arr_data[] = $row['4'];
		    $arr_data[] = $row['5'];
		    $arr_data[] = $row['6'];
		}
		echo json_encode($arr_data);
	}
	// consultar ficha de trabajos anteriores
	if(isset($_POST['llenar_cargos_personales'])) {
		$arr_data = array();
		$resultado = $class->consulta("SELECT C.id_areas, C.id_cargo FROM corporativo.cargos_personal C  WHERE  estado = '1' AND id_personal = '$_POST[id]'");
		while ($row=$class->fetch_array($resultado)) {
			$arr_data[] = $row['0'];
		    $arr_data[] = $row['1'];
		}
		echo json_encode($arr_data);
	}
?>