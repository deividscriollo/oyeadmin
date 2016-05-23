<?php 
	if(!isset($_SESSION)){
        session_start();        
    }
	include_once('../../admin/class.php');
	include_once('../funciones_generales.php');
	$class = new constante();
	error_reporting(0);
	
	$fecha = $class->fecha_hora();

	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';
	$cont = 0;

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		$id_clientes = $class->idz();

		if(strpos($cadena, $buscar) ==  FALSE) {
			$resp = $class->consulta("INSERT INTO clientes VALUES (			'$id_clientes',
																			'$_POST[nombre_empresa]',
																			'$_POST[ruc_empresa]',
																			'$_POST[direccion_empresa]',
																			'$_POST[observaciones]',
																			'$_POST[correo]',
																			'$_POST[txt_sitio_web]',
																			'$_POST[txt_telefono]',
																			'$_POST[txt_contacto]',
																			'$_POST[txt_facebook]',
																			'$_POST[txt_twitter]',
																			'$_POST[txt_google]',
																			'defaul.jpg',
																			'1', '$fecha');");	
		} else {
			$resp = img_64("imagenes",$_POST['img'],'png',$id_clientes);
			$resp = $class->consulta("INSERT INTO clientes VALUES (			'$id_clientes',
																			'$_POST[nombre_empresa]',
																			'$_POST[ruc_empresa]',
																			'$_POST[direccion_empresa]',
																			'$_POST[observaciones]',
																			'$_POST[correo]',
																			'$_POST[txt_sitio_web]',
																			'$_POST[txt_telefono]',
																			'$_POST[txt_contacto]',
																			'$_POST[txt_facebook]',
																			'$_POST[txt_twitter]',
																			'$_POST[txt_google]',
																			'".$id_clientes.".png',
																			'1', '$fecha');");
		}

		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		if(strpos($cadena, $buscar) ==  FALSE) {
			$resp = $class->consulta("UPDATE clientes SET			        empresa = '$_POST[nombre_empresa]',
																			ruc = '$_POST[ruc_empresa]',
																			direccion = '$_POST[direccion_empresa]',
																			observaciones = '$_POST[observaciones]',
																			email = '$_POST[correo]',
																			sitio = '$_POST[txt_sitio_web]',
																			telefono = '$_POST[txt_telefono]',
																			contacto = '$_POST[txt_contacto]',
																			facebook = '$_POST[txt_facebook]',
																			twitter = '$_POST[txt_twitter]',
																			google = '$_POST[txt_google]',
																			fecha_creacion = '$fecha' WHERE id = '$_POST[id_empresa]'");	
		} else {
			$resp = img_64("imagenes",$_POST['img'],'png',$_POST['id_empresa']);
			$resp = $class->consulta("UPDATE clientes SET			        empresa = '$_POST[nombre_empresa]',
																			ruc = '$_POST[ruc_empresa]',
																			direccion = '$_POST[direccion_empresa]',
																			observaciones = '$_POST[observaciones]',
																			email = '$_POST[correo]',
																			sitio = '$_POST[txt_sitio_web]',
																			telefono = '$_POST[txt_telefono]',
																			contacto = '$_POST[txt_contacto]',
																			facebook = '$_POST[txt_facebook]',
																			twitter = '$_POST[txt_twitter]',
																			google = '$_POST[txt_google]',
																			imagen = '$_POST[id_empresa].png',
																			fecha_creacion = '$fecha' WHERE id = '$_POST[id_empresa]'");
		}
		$data = 2;
		echo $data;
	}

	//LLena combo empleados
	if (isset($_POST['comparar_ruc'])) {
		$resultado = $class->consulta("SELECT * FROM clientes C WHERE C.ruc = '$_POST[ruc]' AND estado = '1'");
		while ($row=$class->fetch_array($resultado)) {
			$cont++;
		}

		if ($cont == 0) {
		    $data = 0;
		} else {
		    $data = 1;
		}
		echo $data;
	}
	// fin



?>