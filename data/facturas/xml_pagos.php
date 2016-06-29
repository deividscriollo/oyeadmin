<?php
    include_once('../../admin/class.php');
    $class = new constante();   
    date_default_timezone_set('America/Guayaquil');
    setlocale (LC_TIME,"spanish");

    $page = $_GET['page'];
    $limit = $_GET['rows'];
    $sidx = $_GET['sidx'];
    $sord = $_GET['sord'];
    $search = $_GET['_search'];
    if (!$sidx)
        $sidx = 1;
    
    $count = 0;
    $resultado = $class->consulta("SELECT  COUNT(*) AS count FROM contratos.detalle_cuentas_cobrar");         
    while ($row = $class->fetch_array($resultado)) {
        $count = $count + $row[0];    
    }    
    if ($count > 0 && $limit > 0) {
        $total_pages = ceil($count / $limit);
    } else {
        $total_pages = 0;
    }
    if ($page > $total_pages)
        $page = $total_pages;
    $start = $limit * $page - $limit;
    if ($start < 0)
        $start = 0;
    
    if ($search == 'false') {
        $SQL = "SELECT D.id, D.id_cuentas_cobrar, D.fecha_pagos, cuotas, D.saldo, D.estado FROM contratos.cuentas_cobrar C, contratos.detalle_cuentas_cobrar D WHERE D.id_cuentas_cobrar = C.id AND C.id_cliente = '$_GET[id_cliente]' AND D.estado = '1' ORDER BY $sidx $sord offset $start limit $limit";
    } else {
        $campo = $_GET['searchField'];
      
        if ($_GET['searchOper'] == 'eq') {
            $SQL = "SELECT D.id, D.id_cuentas_cobrar, D.fecha_pagos, cuotas, D.saldo, D.estado FROM contratos.cuentas_cobrar C, contratos.detalle_cuentas_cobrar D WHERE D.id_cuentas_cobrar = C.id AND C.id_cliente = '$_GET[id_cliente]' AND D.estado = '1' $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }         
        if ($_GET['searchOper'] == 'cn') {
            $SQL = "SELECT D.id, D.id_cuentas_cobrar, D.fecha_pagos, cuotas, D.saldo, D.estado FROM contratos.cuentas_cobrar C, contratos.detalle_cuentas_cobrar D WHERE D.id_cuentas_cobrar = C.id AND C.id_cliente = '$_GET[id_cliente]' AND D.estado = '1' $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
    }  

    $resultado = $class->consulta($SQL);  
    $ss = "<span class=label label-danger arrowed>PENDIENTE</span>";
    $tt = "<span class=label label-danger arrowed>CANCELADO</span>";
    
    header("Content-Type: text/html;charset=utf-8");   
    $s = "<?xml version='1.0' encoding='utf-8'?>";
    $s .= "<rows>";
        $s .= "<page>" . $page . "</page>";
        $s .= "<total>" . $total_pages . "</total>";
        $s .= "<records>" . $count . "</records>";
        while ($row = $class->fetch_array($resultado)) {
            $s .= "<row id='" . $row[0] . "'>";
            $s .= "<cell>" . $row[0] . "</cell>";
            $s .= "<cell>" . $row[1] . "</cell>";
            $s .= "<cell>" . $row[2] . "</cell>";
            $s .= "<cell>" . $row[3] . "</cell>";
            $s .= "<cell>" . $row[4] . "</cell>";
            $s .= "<cell>" . $row[5] . "</cell>";          
            $s .= "</row>";
        }
    $s .= "</rows>";
    echo $s;    
?>