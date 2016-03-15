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
		$id_bancos = $class->idz();
		$fecha = $class->fecha_hora();

		$elemento_relacion='false';
		if(isset($_POST['inp_relacion']))
			$elemento_relacion='true';

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
																					'$elemento_relacion',
																					'1', '$_POST[txt_fecha_aplicacion]');");

		if ($resp) {
			//respuesta correcta
			print_r(json_encode(array('valid' => 'true')));	
		}else{
			//respuesta false
			print_r(json_encode(array('valid' => 'false')));
		}
	}

	//LLena los cargos en el Combo
	if (isset($_POST['llenar_equipo'])) {
		$id = $class->idz();
		$resultado = $class->consulta("SELECT id, nombre FROM corporativo.cargos where estado='1';");
		print'<option value="">&nbsp;</option>';
		while ($row=$class->fetch_array($resultado)) {
			 print '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
		}
	}
?>