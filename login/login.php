<?php  
	if(!isset($_SESSION)){
	    session_start();        
	}
	include_once('../admin/class.php');
	$class=new constante();

	if(isset($_POST['consultar_login_user'])){
		$resultado = $class->consulta("SELECT * FROM usuario  where usuario = '".$_POST['txt_nombre']."' and clave = md5('".$_POST['txt_clave']."')");
		if($class->num_rows($resultado)==1) {
			$row=$class->fetch_array($resultado);
			$_SESSION['user'] = array('id'=>$row[0], 'usuario' => $row[1], 'name' => $row['nombre'].' '.$row['apellido']);
			print 1;		
		}else{
			print 0;
		}		
	}
?>