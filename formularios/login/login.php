<?php  
include '../../procesos/base.php';
$conexion = conectarse();
$data = 0;

session_start();

$consulta = pg_query("select * from agenda_invitados.cargo,agenda_invitados.usuario  where cargo.nombre = '".$_POST['txt_nombre']."' and usuario.clave = md5('".$_POST['txt_clave']."')");
while($row = pg_fetch_row($consulta)) {
      $_SESSION['Id'] = $row[0]; 
	  $_SESSION['Nombre_usuario'] = $row[6] . " " . $row[7]; 
	  $_SESSION['Usuario'] = $row[1];
	  $data = 1;
}

echo $data;

?>