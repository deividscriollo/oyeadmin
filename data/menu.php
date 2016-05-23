<?php 
function  menu_lateral() {
	print'
	<script type="text/javascript">
		try{ace.settings.check("sidebar" , "fixed")}catch(e){}
	</script>';
	print'
	<ul class="nav nav-list">
		<li class="active">
			<a href="#/">
				<i class="menu-icon fa fa-home"></i>
				<span class="menu-text"> Inicio </span>
			</a>

			<b class="arrow"></b>
		</li>

		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-files-o"></i>
				<span class="menu-text">
					Ingresos
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<li class="">
					<a href="" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Generales
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="">
							<a href="#/tipo_paquetes">
								<i class="menu-icon fa fa-caret-right"></i>
								Tipo Paquetes
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/paquetes">
								<i class="menu-icon fa fa-caret-right"></i>
								Paquetes
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/tipo_programa">
								<i class="menu-icon fa fa-caret-right"></i>
								Tipo Programa
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/tipo_vendedor">
								<i class="menu-icon fa fa-caret-right"></i>
								Tipo Vendedor
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/tipo_contrato">
								<i class="menu-icon fa fa-caret-right"></i>
								Tipo Contrato
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/areas">
								<i class="menu-icon fa fa-caret-right"></i>
								Areas
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/cargos">
								<i class="menu-icon fa fa-caret-right"></i>
								Cargos
							</a>

							<b class="arrow"></b>
						</li>

						<li class="">
							<a href="#/bancos">
								<i class="menu-icon fa fa-caret-right"></i>
								Bancos
							</a>
							<b class="arrow"></b>
						</li>
					</ul>
				</li>

				<li class="">
					<a href="#/empresa" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Empresa
					</a>
					<b class="arrow"></b>
				</li>

				<li class="">
					<a href="#/clientes" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Clientes
					</a>
					<b class="arrow"></b>
				</li>

				<li class="">
					<a href="#/programas" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Programas
					</a>
					<b class="arrow"></b>
				</li>

				<li class="">
					<a href="#/vendedores" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Vendedores
					</a>
					<b class="arrow"></b>
				</li>
			</ul>
		</li>

		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-users"></i>
				<span class="menu-text">
					Corporativo
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<!-- <li class="">
					<a href="#/ingresos_princi" class="dropdown-toggle">
						<i class="menu-icon fa fa-caret-right"></i>
						Ingresos Principales
					</a>

					<b class="arrow"></b>
				</li>-->

				<li class="">
					<a href="" class="dropdown-toggle">
						<i class="menu-icon fa fa-user"></i>
						Ficha de Ingresos
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="">
							<a href="#/ficha_ingresos">
								<i class="menu-icon fa fa-caret-right"></i>
								Ingresar Ficha
							</a>
							<b class="arrow"></b>
						</li>

						<li class="">
							<a id="abrir_buscador" style="cursor:pointer; cursor: hand">
								<i class="menu-icon fa fa-caret-right"></i>
								Buscar Ficha
							</a>
							<b class="arrow"></b>
						</li>
					</ul>
				</li>
			</ul>
		</li>
		<!-- Fin de Personal oyefm -->

		<!-- inicio de agenda invitados -->
		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-desktop"></i>
				<span class="menu-text">
					Agenda Invitados
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<!--<li class="">
					<a href="#/programas">
						<i class="menu-icon fa fa-music"></i>
						Programas
						<i class="menu-icon fa fa-music"></i>
					</a>
					<b class="arrow"></b>
				</li>-->

				<li class="">
					<a href="" class="dropdown-toggle">
						<i class="menu-icon fa fa-user"></i>
						Ficha de Invitados
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

					<ul class="submenu">
						<li class="">
							<a href="#/ficha_invitados">
								<i class="menu-icon fa fa-caret-right"></i>
								Ingresar Invitados
							</a>
							<b class="arrow"></b>
						</li>

						<li class="">
							<a id="abrir_buscador_invitados" style="cursor:pointer; cursor: hand">
								<i class="menu-icon fa fa-caret-right"></i>
								Buscar Invitados
							</a>

							<b class="arrow"></b>
						</li>
					</ul>
				</li>
			</ul>
		</li>
		<!-- Fin de agenda Invitados -->

		<!-- inicio de ingreso de programas -->
		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-folder-open-o"></i>
				<span class="menu-text">
					Programas
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">

				<!--<li class="">
					<a href="#/">
						<i class="menu-icon fa fa-files-o"></i>
						Ingresos Principales
						<i class="menu-icon fa fa-files-o"></i>
					</a>

					<b class="arrow"></b>
				</li>-->	

				<li class="">
					<a href="#/ficha_programas">
						<i class="menu-icon fa fa-calendar"></i>
						Ficha de Programas
						<i class="menu-icon fa fa-calendar"></i>
					</a>
				</li>

				<li class="">
					<a href="#/reportes">
						<i class="menu-icon fa fa-caret-right"></i>
						Reportes
						<i class="menu-icon fa fa-file-archive-o right"></i>
					</a>

					<b class="arrow"></b>
				</li>
			</ul>
		</li>
		<!-- Fin de ingreso de Programas -->

		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-file"></i>
				<span class="menu-text">
					Contratos
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<li class="">
					<a href="#/contratos">
						Ingreso Contratos
					</a>
				</li>
			</ul>
		</li>

		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-pencil-square-o"></i>
				<span class="menu-text">
					Facturación
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<li class="">
					<a href="#/facturas">
						Ingreso Facturas
					</a>
				</li>
			</ul>
		</li>

		<li class="">
			<a href="" class="dropdown-toggle">
				<i class="menu-icon fa fa-archive"></i>
				<span class="menu-text">
					Rol de Pagos
				</span>
				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>

			<ul class="submenu">
				<li class="">
					<a href="#/rol_pagos">
						Ingreso Roles
					</a>
				</li>
			</ul>
		</li>
	</ul><!-- /.nav-list -->

	<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
		<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
	</div>

	<script type="text/javascript">
		try{ace.settings.check("sidebar" , "collapsed")}catch(e){}
	</script>';
}

?>