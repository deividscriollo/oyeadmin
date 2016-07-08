<?php 
if(!isset($_SESSION)){
        session_start();        
    }

    include_once('../../admin/class.php');
	$class = new constante();

    $resultado = $class->consulta("SELECT count(*) FROM areas");
	while ($row=$class->fetch_array($resultado)) {
		$data = $row[0];
	}

	echo $data;
 ?>