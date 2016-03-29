<?php
    require('../../reportes/fpdf/fpdf.php');
    include_once('../../admin/class.php');
    
 class PDF extends FPDF
{

//Cabecera de página
function Header()
{
$class=new constante();
//Logo
$this->Image('logo.png',9,8,55);
//Arial bold 9
$this->SetFont('Arial','',9);
//Movernos a la derecha
$this->Cell(80);
//Título
$this->Cell(40,25,'FICHA DE INGRESO',0,0,'C');
//$this->SetFillColor(200,220,255);
$this->Image('foto.png', 180, 8, 25, 28, 'PNG');
//Salto de línea
$this->Ln(20);

$resp = $class->consulta("SELECT * from corporativo.personal where estado = '1'");
        while ($row=$class->fetch_array($resp)) {
            $nombres=$row[1];
            $apellidos=$row[2];
            $ci=$row[3];
            $fecha_nacimiento=$row[4];
            $edad=$row[5];
            $tel_fijo=$row[6];
            $tel_celular=$row[7];
            $estado_civil=$row[8];
            $cargas=$row[9];
            $email=$row[10];
            $instruccion=$row[11];
            $especialidad=$row[12];
            $vivienda=$row[13];
            $direccion=$row[14];
            $sangre=$row[15];
            $alergia=$row[16];
            $enfermedad=$row[17];
        }
    $resp = $class->consulta("SELECT * from corporativo.cursos where estado = '1'");
    while ($row=$class->fetch_array($resp)) {
        $nombre_curso=$row[2];
        $establecimiento=$row[3];
        $tiempo=$row[4];
    }

    $resp = $class->consulta("SELECT nombre, nombre_cuenta, numero from corporativo.cuentas, corporativo.bancos, corporativo.personal  where cuentas.id_bancos= '2016030817175656df4f9430b1f' and bancos.id= '2016030817175656df4f9430b1f' and cuentas.id_personal='2016031716001056eb1adab509f' and personal.id='2016031716001056eb1adab509f' and cuentas.estado='1';");
    while ($row=$class->fetch_array($resp)) {
        $banco=$row[0];
        $cuenta=$row[1];
        $numero=$row[2];
    }        
   
   $resp = $class->consulta("SELECT * FROM corporativo.anterior_trab, corporativo.personal where personal.id='2016031716001056eb1adab509f' and anterior_trab.id_personal='2016031716001056eb1adab509f'");
    while ($row=$class->fetch_array($resp)) {
        $nom_empresa=$row[2];
        $cargo=$row[3];
        $direccion=$row[4];
        $te_fijo_trab=$row[5];
        $te_celular_trab=$row[6];
        $nom_jefe=$row[7];
        $tiempo_trab=$row[8];
        $ciudad_trab=$row[9];
    } 

    $resp = $class->consulta("SELECT * FROM corporativo.datos_familiar, corporativo.personal where personal.id='2016031716001056eb1adab509f' and datos_familiar.id_personal='2016031716001056eb1adab509f'");
    while ($row=$class->fetch_array($resp)) {
        $nom_familia=$row[2];
        $perentesco=$row[3];
        $telf_fami=$row[4];
        $direccion_fami=$row[5];
        $ciudad_fami=$row[6];
    } 

    $this->SetXY(10,55);
    $this->Cell(195,13,"",1);
    $this->Text(15, 60, 'NOMBRE(S):', 1, 'L');
    $this->Text(90, 60, 'APELLIDOS(S):', 1, 'L');
    $this->Text(150, 60, 'CEDULA DE IDENTIDAD:', 1, 'L');
    /////////TITULOS
    $this->Text(10, 40, 'Fecha de Aplicacion:', 1, 'L');
    $this->Text(10, 53, 'DATOS PERSONALES:', 1, 'L');
    $this->Text(10, 88, 'DATOS REFERENCIALES:', 1, 'L');
    $this->Text(10, 165, 'DATOS BANCARIOS:', 1, 'L');
    $this->Text(10, 187, 'TRABAJO ANTERIOR:', 1, 'L');
    $this->Text(10, 229, 'DATOS DE UN FAMILIAR CERCANO O REPRESENTANTE SI ES MENOR DE EDAD CON FIRMA DE AUTORIZACION:', 1, 'L');
    $this->Text(10, 263, 'Declaro que todos los datos aqui emitidos son reales por lo tanto autorizo su verificacion, aprobacion y aceptacion.', 1, 'L');
    ////////
    $this->Text(15, 74, 'FECHA DE NACIMIENTO(S):', 1, 'L');
    $this->Text(90, 74, 'EDAD:', 1, 'L');
    $this->Text(115, 74, 'TEL. FIJO:', 1, 'L');
    $this->Text(150, 74, 'TEL. CELULAR:', 1, 'L');
    $this->Text(30, 96, 'ESTADO CIVIL:', 1, 'L');
    $this->Text(90, 96, 'CARGAS FAMILIARES:', 1, 'L');
    $this->Text(150, 96, 'E-MAIL:', 1, 'L');
    $this->Text(15, 107, 'INSTRUCCION:', 1, 'L');
    $this->Text(120, 107, 'ESPECIALIDAD:', 1, 'L');
    $this->Text(15, 113, 'CURSOS REALIZADOS DE:', 1, 'L');
    $this->Text(15, 125, 'ESTABLECIMIENTO:', 1, 'L');
    $this->Text(15, 135, 'TIEMPO:', 1, 'L');
    $this->Text(150, 135, 'TIPO DE VIVIENDA:', 1, 'L');
    $this->Text(15, 150, 'DIRECCION:', 1, 'L');
    $this->Text(15, 156, 'TIPO DE SANGRE:', 1, 'L');
    $this->Text(80, 156, 'ALERGICO ANTIBIOTICO:', 1, 'L');
    $this->Text(135, 156, 'ENFERMEDAD ESPECIFICA:', 1, 'L');
    $this->Text(15, 172, 'BANCO:', 1, 'L');
    $this->Text(90, 172, 'NOMBRE CUENTA:', 1, 'L');
    $this->Text(150, 172, 'NUMERO DE CUENTA:', 1, 'L');
    $this->Text(15, 197, 'NOMBRE DE LA EMPRESA:', 1, 'L');
    $this->Text(90, 197, 'TELEFONO FIJO:', 1, 'L');
    $this->Text(150, 197, 'TELEFONO CELULAR:', 1, 'L');
    $this->Text(15, 208, 'CARGO:', 1, 'L');
    $this->Text(90, 208, 'NOMBRE DEL JEFE:', 1, 'L');
    $this->Text(150, 208, 'TIEMPO TRABAJADO:', 1, 'L');
    $this->Text(15, 219, 'DIRECCION:', 1, 'L');
    $this->Text(150, 219, 'CIUDAD:', 1, 'L');
    $this->Text(15, 238, 'NOMBRES:', 1, 'L');
    $this->Text(90, 238, 'PARENTESCO:', 1, 'L');
    $this->Text(150, 238, 'TELEFONO:', 1, 'L');
    $this->Text(15, 248, 'DIRECCION:', 1, 'L');
    $this->Text(150, 248, 'CIUDAD:', 1, 'L');
    $this->Text(20, 270, 'Fecha de Inicio de Trabajo:', 1, 'L');
    $this->Text(20, 275, 'Funcion o cargo a ocupar:', 1, 'L');

        
    $this->Text(15, 65, utf8_decode($nombres),1,0, 'L',0);/////nombre
    $this->Text(90, 65, utf8_decode($apellidos),1,0, 'L',0);/////apellidos
    $this->Text(150, 65, utf8_decode($ci),1,0, 'L',0);////ci

    $this->SetXY(10, 81);
    $this->Cell(195,-13,"",1);
    $this->Text(15, 79,utf8_decode($fecha_nacimiento),1,0, 'L',0);////fecha_nacimiento
    $this->Text(90, 79,utf8_decode($edad),1,0, 'L',0);////edad
    $this->Text(115, 79,utf8_decode($tel_fijo),1,0, 'L',0);////telefono fijo
    $this->Text(150, 79,utf8_decode($tel_celular),1,0, 'L',0);////telefono celular
    /////////////////////
    $this->SetXY(10, 90);
    $this->Cell(195,68,"",1);
    $this->Text(15, 101,utf8_decode($estado_civil),1,0, 'L',0);////estado civil
    $this->Text(105, 101,utf8_decode($cargas),1,0, 'L',0);////cargas
    $this->Text(150, 101,utf8_decode($email),1,0, 'L',0);////email
    /////////
    $this->Text(80, 107,utf8_decode($instruccion),1,0, 'L',0);////instruccion
    $this->Text(150, 107,utf8_decode($especialidad),1,0, 'L',0);////especialidad
    //////
    $this->Text(15, 118,utf8_decode($nombre_curso),1,0, 'L',0);////nombre curso
    $this->Text(15, 130,utf8_decode($establecimiento),1,0, 'L',0);////establecimiento
    $this->Text(15, 140,utf8_decode($tiempo),1,0, 'L',0);////tiempo
    $this->Text(153, 140,utf8_decode($vivienda),1,0, 'L',0);////tipo de vivienda
    //aki poner la linea de pais, provincia, ciudad
    $this->Text(55, 150,utf8_decode($direccion),1,0, 'L',0);////direccion
    $this->Text(60, 156,utf8_decode($sangre),1,0, 'L',0);////tipo de sangre
    $this->Text(120, 156,utf8_decode($alergia),1,0, 'L',0);////alergias
    $this->Text(180, 156,utf8_decode($enfermedad),1,0, 'L',0);////enfermdad especifica
    ///////////DATOS BANCARIOS
    $this->SetXY(10, 167);
    $this->Cell(195,12,"",1);
    $this->Text(15, 177,utf8_decode($banco),1,0, 'L',0);////nombre del banco
    $this->Text(90, 177,utf8_decode($cuenta),1,0, 'L',0);////nombre de cuenta de bancos
    $this->Text(150, 177,utf8_decode($numero),1,0, 'L',0);////numero de cuenta de bancos
    //////////TRABAJO ANTERIOR
    $this->SetXY(10, 190);
    $this->Cell(195,31,"",1);
    $this->Text(15, 202,utf8_decode($nom_empresa),1,0, 'L',0);////nombre empresa
    $this->Text(90, 202,utf8_decode($te_fijo_trab),1,0, 'L',0);////telf fijo
    $this->Text(150, 202,utf8_decode($te_celular_trab),1,0, 'L',0);////telf celular
    $this->Text(15, 213,utf8_decode($cargo),1,0, 'L',0);///cargo
    $this->Text(90, 213,utf8_decode($nom_jefe),1,0, 'L',0);///nombre del jefe
    $this->Text(150, 213,utf8_decode($tiempo_trab),1,0, 'L',0);///tiempo trabajado   
    $this->Text(50, 219,utf8_decode($direccion),1,0, 'L',0);///tiempo trabajado  
    $this->Text(170, 219,utf8_decode($ciudad_trab),1,0, 'L',0);///ciudad de trabajo
    ////////DATOS FAMILIAR
    $this->SetXY(10, 232);
    $this->Cell(195,22,"",1);
    $this->Text(15, 243,utf8_decode($nom_familia),1,0, 'L',0);///nombre familiar
    $this->Text(90, 243,utf8_decode($perentesco),1,0, 'L',0);///parentesco
    $this->Text(150, 243,utf8_decode($telf_fami),1,0, 'L',0);///telefono familiar
    $this->Text(15, 253,utf8_decode($direccion_fami),1,0, 'L',0);///direccion familiar
    $this->Text(150, 253,utf8_decode($ciudad_fami),1,0, 'L',0);///ciudad familiar
    ///Funcion o cargo a ocupar
    $this->SetXY(55, 271);
    $this->Cell(50,6,"",1);
}

    //Pie de página
    function Footer()
    {
        //Posición: a 1,5 cm del final
        $this->SetY(-15);
        //Arial italic 8
        $this->SetFont('Arial','I',8);
        //Número de página
        $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'C');
        }
    }


    //Creación del objeto de la clase heredada
    $pdf=new PDF();
    $pdf->AliasNbPages();
    //Primera página
    $pdf->AddPage();
    $pdf->SetFont('Arial','',15);
    $pdf->Link(10,8,10,10,"http://localhost:8080/oyeadmin/#/");
    $pdf->Output('Ficha_Personal.pdf','I');
?>