<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class = new constante();
	$id_paquetes = $class->idz();
	$fecha = $class->fecha_hora();

	if ($_POST['oper'] == "add") {
		$resultado = $class->consulta("SELECT count(*) FROM paquetes WHERE nombre = '$_POST[nombre]'");
		while ($row=$class->fetch_array($resultado)) {
			$data = $row[0];
		}

		if ($data != 0) {
			$data = "3";
		} else {
			$resp = $class->consulta("INSERT INTO paquetes VALUES ('$id_paquetes','$_POST[nombre]','$_POST[observaciones]','1','$fecha');");
			$data = "1";
		}
	} else {
	    if ($_POST['oper'] == "edit") {
	    	$resultado = $class->consulta("SELECT count(*) FROM paquetes WHERE nombre = '$_POST[nombre]' AND id NOT IN ('$_POST[id]')");
			while ($row=$class->fetch_array($resultado)) {
				$data = $row[0];
			}

			if ($data != 0) {
			 	$data = "3";
			} else {
				$resp = $class->consulta("UPDATE paquetes SET   nombre = '$_POST[nombre]',observaciones = '$_POST[observaciones]',fecha_creacion = '$fecha' WHERE id = '$_POST[id]'");
	    		$data = "2";
			}
	    }
	}    
	echo $data;
?>