<?php  
	if(!isset($_SESSION)){
	    session_start();        
	}
	include_once('../admin/class.php');
	$class=new constante();

	if(isset($_POST['consultar_login_user'])) {
		$resultado = $class->consulta("
										SELECT *, (SELECT data FROM privilegios P WHERE  U.id= P.id_usuario) as data_privilegio 
										FROM usuario U  
										where U.usuario = '".$_POST['txt_nombre']."' and clave = md5('".$_POST['txt_clave']."')");
		if($class->num_rows($resultado) == 1) {
			$row=$class->fetch_array($resultado);
			$_SESSION['user'] = array(	'id'=>$row[0],
										'usuario' => $row[1],
										'name' => $row['nombre'].' '.$row['apellido'],
										'imagen' => $row[11],
										'privilegio' => $row['data_privilegio']);

			print_r(json_encode(array('status' => 'ok', 'privilegio' => $row['data_privilegio'])));
		} else {
			print_r(json_encode(array('status' => 'error', 'problem' => 'user no valid')));
		}		
	}
?>