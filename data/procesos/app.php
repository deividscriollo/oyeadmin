<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	$class=new constante();

	if (isset($_POST['name'])=='contactado_por') {
			// $resultado = $class->consulta("select");
			// $acu='';
			// while ($row=$class->fetch_array($resultado)) {
			// 	$acu[] = array('id' => $row['id'],'categoria' => $row['categoria']);
			// }
			// print json_encode($acu);
			print'holas';		
	}
?>