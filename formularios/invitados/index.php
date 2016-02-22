<?php include '../menu/app.php';?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>Menu Admin</title>

		
        <meta name="description" content="Dynamic tables and grids using jqGrid plugin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <!-- bootstrap & fontawesome -->
        <link rel="stylesheet" href="../../ice/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../../ice/dist/css/font-awesome.min.css" />

        <!-- page specific plugin styles -->
        <link rel="stylesheet" href="../../ice/dist/css/jquery-ui.min.css" />
        <link rel="stylesheet" href="../../ice/dist/css/datepicker.min.css" />
        <link rel="stylesheet" href="../../ice/dist/css/ui.jqgrid.min.css" />
        <link rel="stylesheet" href="../../ice/dist/css/jquery.gritter.min.css" />


        <!-- text fonts -->
        <link rel="stylesheet" href="../../ice/dist/css/fontdc.css" />

        <!-- ace styles -->
        <link rel="stylesheet" href="../../ice/dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
        
        <link type="text/css" rel="stylesheet" id="ace-rtl-stylesheet" href="../../ice/dist/css/ace-rtl.min.css">
        <script src="../../ice/dist/js/ace-extra.min.js"></script>

	</head>

	<body class="no-skin">
		<?php menu_arriba(); ?>
	

		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>
			<?php menu_lateral(); ?>

			<div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">
							try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
						</script>

						<ul class="breadcrumb">
							<li>
								<i class="ace-icon fa fa-home home-icon"></i>
								<a href="#">Home</a>
							</li>

							<li>
								<a href="#">Forms</a>
							</li>
							<li class="active">Wizard &amp; Validation</li>
						</ul><!-- /.breadcrumb -->

					</div>

					<div class="page-content">

						<div class="row">
							<div class="col-xs-12">
					
									<div id="contenedor">
										<table id="grid-table"></table>
										<div id="grid-pager"></div>
									</div>
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.page-content -->
				</div>
			</div><!-- /.main-content -->

			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
							<span class="green bolder">OyeFm</span>
							Aplicación &copy; 2016-2017
						</span>
					</div>
				</div>
			</div>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../ice/dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../ice/dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

		<script src="../../ice/dist/js/jquery-ui.min.js"></script>
        <script src="../../ice/dist/js/bootstrap.min.js"></script>
        <script src="../../ice/dist/js/date-time/bootstrap-datepicker.min.js"></script>
        <script src="../../ice/dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../ice/dist/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="../../ice/dist/js/jquery.gritter.min.js"></script>

        <!-- ace scripts -->
        <script src="../../ice/dist/js/ace-elements.min.js"></script>
        <script src="../../ice/dist/js/ace.min.js"></script>
        <script src="invitados.js"></script>

	</body>
</html>
