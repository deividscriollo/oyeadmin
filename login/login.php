<?php  
	if(!isset($_SESSION)){
	    session_start();        
	}
	include_once('../admin/class.php');
	$class=new constante();

	if(isset($_POST['consultar_login_user'])){
		$resultado = $class->consulta("select * from agenda_invitados.cargo,agenda_invitados.usuario  where cargo.nombre = '".$_POST['txt_nombre']."' and usuario.clave = md5('".$_POST['txt_clave']."')");
		if($class->num_rows($resultado)==1) {
			$row=$class->fetch_array($resultado);
			$_SESSION['Id'] = $row[0]; 
			$_SESSION['Nombre_usuario'] = $row[6] . " " . $row[7]; 
			$_SESSION['Usuario'] = $row[1];
			print $data = 1;			
		}else{
			print $data = 0;
		}		
	}
?>