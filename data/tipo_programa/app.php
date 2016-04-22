<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_tipo_programa = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM tipo_programa WHERE nombre = '$_POST[nombre]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO tipo_programa VALUES ('$id_tipo_programa','$_POST[nombre]','$_POST[categoria]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM tipo_programa WHERE nombre = '$_POST[nombre]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
		    	$resp = $class->consulta("UPDATE tipo_programa SET nombre = '$_POST[nombre]',observaciones = '$_POST[observaciones]',categoria = '$_POST[categoria]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
		    	$data = "2";
		    }
	    }
	}    
	echo $data;
?>