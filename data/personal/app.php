<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();
	// LLenar el formulario del proceso 1 que es Pre-entrevista
	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id = $class->idz();
		$id_personal = $class->idz();
		$fecha = $class->fecha_hora();
		$resp = $class->consulta("INSERT INTO corporativo.personal VALUES (			'$id_personal',
																					'$_POST[txt_nombres]',
																					'$_POST[txt_apellidos]',
																					'$_POST[txt_cedula]',
																					'$_POST[txt_fecha_nacimiento]',
																					'$_POST[txt_edad]',
																					'$_POST[txt_telf_fijo]',
																					'$_POST[txt_cedula]',
																					'$_POST[select_civil]',
																					'$_POST[txt_cargas]',
																					'$_POST[txt_email]',
																					'$_POST[rb_instruccion]',
																					'$_POST[txt_especialidad]',
																					'$_POST[rb_vivienda]',
																					'$_POST[txt_direccion]',
																					'$_POST[select_sangre]',
																					'$_POST[txt_alergia]',
																					'$_POST[txt_enfermedad]',
																					'$_POST[inp_relacion]',
																					'1', '$_POST[txt_fecha_aplicacion]');");
		$resp = $class->consulta("INSERT INTO corporativo.cuentas VALUES (			'$id',
																					'$_POST[select_banco]',
																					'$id_personal',
																					'$_POST[txt_numero_banco]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO corporativo.anterior_trab VALUES (	'$id',
																					'$id_personal',
																					'$_POST[txt_cargo]',
																					'$_POST[txt_direccion_trab]',
																					'$_POST[txt_telf_fijo_trab]',
																					'$_POST[txt_telf_celular_trab]',
																					'$_POST[txt_jefe]',
																					'$_POST[tiempo3]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO corporativo.datos_familiar VALUES (	'$id',
																					'$id_personal',
																					'$_POST[txt_nombres_familia]',
																					'$_POST[txt_parentesco]',
																					'$_POST[txt_telf_familia]',
																					'$_POST[txt_dir_fami]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO corporativo.cargos VALUES (			'$id',
																					'$_POST[select_areas]',
																					'$id_personal',
																					'$_POST[txt_cargo_desempe]',
																					'1', '$fecha');");
		$resp = $class->consulta("INSERT INTO corporativo.cursos VALUES (			'$id',
																					'$id_personal',
																					'$_POST[txta_curso1],$_POST[txta_curso2]',
																					'$_POST[txta_establecimiento],$_POST[txta_establecimiento2]',
																					'$_POST[tiempo1],$_POST[tiempo2]',
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

	//LLena los bancos en el Combo
	if (isset($_POST['llenar_bancos'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.bancos where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena las areas en el Combo
	if (isset($_POST['llenar_areas'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.areas where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
	//LLena los paises del Combo
	if (isset($_POST['llenar_pais'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nom_pais FROM localizacion.pais where stado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nom_pais'].'</option>';
		}
	}
	//consulta la edad del personal con la fecha de nacimiento y fecha actual
	if (isset($_POST['consulta_edad'])) {
		$datetime1 = date_create($_POST['fecha']);
		$datetime2 = date_create($class->fecha());
		$interval = date_diff($datetime1, $datetime2);
		//echo $interval->format('%R%a días');
		print($interval->y) ;
	}
?>