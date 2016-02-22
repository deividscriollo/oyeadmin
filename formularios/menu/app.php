<?php 

	if(!isset($_SESSION)) {
		session_start();		
	}
	if(!isset($_SESSION["Id"])) {

		header('Location: ../../formularios/login/');
	}

function menu_arriba() {
print '<div id="navbar" class="navbar navbar-default    navbar-collapse       h-navbar">
			<script type="text/javascript">
				try{ace.settings.check(navbar , fixed)}catch(e){}
			</script>

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="" class="navbar-brand">
						<small>
							<i class="fa fa-user"></i>
							OyeFm 93.1
						</small>
					</a>

					<button class="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
						<span class="sr-only">Toggle user menu</span>

						<img src="../../ice/dist/avatars/user.jpg" alt="Jason" />
					</button>

					<button class="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
						<span class="sr-only">Toggle sidebar</span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>

						<span class="icon-bar"></span>
					</button>
				</div>

				<div class="navbar-buttons navbar-header pull-right  collapse navbar-collapse" role="navigation">
					<ul class="nav ace-nav">
						<li class="transparent">
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-bell icon-animated-bell"></i>
							</a>

							<div class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
								<div class="tabbable">
									<ul class="nav nav-tabs">
										<li class="active">
											<a data-toggle="tab" href="#navbar-tasks">
												Tasks
												<span class="badge badge-danger">4</span>
											</a>
										</li>

										<li>
											<a data-toggle="tab" href="#navbar-messages">
												Messages
												<span class="badge badge-danger">5</span>
											</a>
										</li>
									</ul><!-- .nav-tabs -->

									<div class="tab-content">
										<div id="navbar-tasks" class="tab-pane in active">
											<ul class="dropdown-menu-right dropdown-navbar dropdown-menu">
												<li class="dropdown-content">
													<ul class="dropdown-menu dropdown-navbar">
														<li>
															<a href="#">
																<div class="clearfix">
																	<span class="pull-left">Software Update</span>
																	<span class="pull-right">65%</span>
																</div>

																<div class="progress progress-mini">
																	<div style="width:65%" class="progress-bar"></div>
																</div>
															</a>
														</li>

														<li>
															<a href="#">
																<div class="clearfix">
																	<span class="pull-left">Hardware Upgrade</span>
																	<span class="pull-right">35%</span>
																</div>

																<div class="progress progress-mini">
																	<div style="width:35%" class="progress-bar progress-bar-danger"></div>
																</div>
															</a>
														</li>

														<li>
															<a href="#">
																<div class="clearfix">
																	<span class="pull-left">Unit Testing</span>
																	<span class="pull-right">15%</span>
																</div>

																<div class="progress progress-mini">
																	<div style="width:15%" class="progress-bar progress-bar-warning"></div>
																</div>
															</a>
														</li>

														<li>
															<a href="#">
																<div class="clearfix">
																	<span class="pull-left">Bug Fixes</span>
																	<span class="pull-right">90%</span>
																</div>

																<div class="progress progress-mini progress-striped active">
																	<div style="width:90%" class="progress-bar progress-bar-success"></div>
																</div>
															</a>
														</li>
													</ul>
												</li>

												<li class="dropdown-footer">
													<a href="#">
														See tasks with details
														<i class="ace-icon fa fa-arrow-right"></i>
													</a>
												</li>
											</ul>
										</div><!-- /.tab-pane -->

										<div id="navbar-messages" class="tab-pane">
											<ul class="dropdown-menu-right dropdown-navbar dropdown-menu">
												<li class="dropdown-content">
													<ul class="dropdown-menu dropdown-navbar">
														<li>
															<a href="#">
																<img src="../../ice/dist/avatars/avatar.png" class="msg-photo" alt="Alex Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Alex:</span>
																		Ciao sociis natoque penatibus et auctor ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>a moment ago</span>
																	</span>
																</span>
															</a>
														</li>

														<li>
															<a href="#">
																<img src="../../ice/dist/avatars/avatar3.png" class="msg-photo" alt="Susans Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Susan:</span>
																		Vestibulum id ligula porta felis euismod ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>20 minutes ago</span>
																	</span>
																</span>
															</a>
														</li>

														<li>
															<a href="#">
																<img src="../../ice/dist/avatars/avatar4.png" class="msg-photo" alt="Bobs Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Bob:</span>
																		Nullam quis risus eget urna mollis ornare ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>3:15 pm</span>
																	</span>
																</span>
															</a>
														</li>

														<li>
															<a href="#">
																<img src="../../ice/dist/avatars/avatar2.png" class="msg-photo" alt="Kates Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Kate:</span>
																		Ciao sociis natoque eget urna mollis ornare ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>1:33 pm</span>
																	</span>
																</span>
															</a>
														</li>

														<li>
															<a href="#">
																<img src="../../ice/dist/avatars/avatar5.png" class="msg-photo" alt="Freds Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Fred:</span>
																		Vestibulum id penatibus et auctor  ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>10:09 am</span>
																	</span>
																</span>
															</a>
														</li>
													</ul>
												</li>

												<li class="dropdown-footer">
													<a href="inbox.html">
														See all messages
														<i class="ace-icon fa fa-arrow-right"></i>
													</a>
												</li>
											</ul>
										</div><!-- /.tab-pane -->
									</div><!-- /.tab-content -->
								</div><!-- /.tabbable -->
							</div><!-- /.dropdown-menu -->
						</li>

						<li class="light-blue user-min">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="../../ice/dist/avatars/user.jpg" alt="Jasons Photo" />
								<span class="user-info">
									<small>Welcome,</small>
									'.$_SESSION['Nombre_usuario'].'
								</span>

								<i class="ace-icon fa fa-caret-down"></i>
							</a>

							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										Settings
									</a>
								</li>

								<li>
									<a href="profile.html">
										<i class="ace-icon fa fa-user"></i>
										Profile
									</a>
								</li>

								<li class="divider"></li>

								<li>
									<a href="../../formularios/login">
										<i class="ace-icon fa fa-power-off"></i>
										Salir
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!-- /.navbar-container -->
		</div>
	';
}



function menu_lateral() {
print '
	<div id="sidebar" class="sidebar                  responsive">
		<script type="text/javascript">
			try{ace.settings.check(sidebar , fixed)}catch(e){}
		</script>

		<div class="sidebar-shortcuts" id="sidebar-shortcuts">
			<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
				<button class="btn btn-success">
					<i class="ace-icon fa fa-signal"></i>
				</button>

				<button class="btn btn-info">
					<i class="ace-icon fa fa-pencil"></i>
				</button>

				<button class="btn btn-warning">
					<i class="ace-icon fa fa-users"></i>
				</button>

				<button class="btn btn-danger">
					<i class="ace-icon fa fa-cogs"></i>
				</button>
			</div>

			<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
				<span class="btn btn-success"></span>

				<span class="btn btn-info"></span>

				<span class="btn btn-warning"></span>

				<span class="btn btn-danger"></span>
			</div>
		</div><!-- /.sidebar-shortcuts -->

		<ul class="nav nav-list">
			<li class="">
				<a href="index.html">
					<i class="menu-icon fa fa-tachometer"></i>
					<span class="menu-text"> Dashboard </span>
				</a>

				<b class="arrow"></b>
			</li>

			<li class="">
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-desktop"></i>
					<span class="menu-text">
						UI &amp; Elements
					</span>

					<b class="arrow fa fa-angle-down"></b>
				</a>

				<b class="arrow"></b>

				<ul class="submenu">
					<li class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-caret-right"></i>

							Layouts
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="top-menu.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Top Menu
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="two-menu-1.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Two Menus 1
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="two-menu-2.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Two Menus 2
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="mobile-menu-1.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Default Mobile Menu
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="mobile-menu-2.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Mobile Menu 2
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="mobile-menu-3.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Mobile Menu 3
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li class="">
						<a href="typography.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Typography
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="elements.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Elements
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="buttons.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Buttons &amp; Icons
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="content-slider.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Content Sliders
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="treeview.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Treeview
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="jquery-ui.html">
							<i class="menu-icon fa fa-caret-right"></i>
							jQuery UI
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="nestable-list.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Nestable Lists
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-caret-right"></i>

							Three Level Menu
							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="#">
									<i class="menu-icon fa fa-leaf green"></i>
									Item #1
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="#" class="dropdown-toggle">
									<i class="menu-icon fa fa-pencil orange"></i>

									4th level
									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="">
										<a href="#">
											<i class="menu-icon fa fa-plus purple"></i>
											Add Product
										</a>

										<b class="arrow"></b>
									</li>

									<li class="">
										<a href="#">
											<i class="menu-icon fa fa-eye pink"></i>
											View Products
										</a>

										<b class="arrow"></b>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>

			<li class="">
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-list"></i>
					<span class="menu-text"> Tables </span>

					<b class="arrow fa fa-angle-down"></b>
				</a>

				<b class="arrow"></b>

				<ul class="submenu">
					<li class="">
						<a href="tables.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Simple &amp; Dynamic
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="jqgrid.html">
							<i class="menu-icon fa fa-caret-right"></i>
							jqGrid plugin
						</a>

						<b class="arrow"></b>
					</li>
				</ul>
			</li>

			<li class="active open">
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-pencil-square-o"></i>
					<span class="menu-text"> Forms </span>

					<b class="arrow fa fa-angle-down"></b>
				</a>

				<b class="arrow"></b>

				<ul class="submenu">
					<li class="">
						<a href="form-elements.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Form Elements
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="form-elements-2.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Form Elements 2
						</a>

						<b class="arrow"></b>
					</li>

					<li class="active">
						<a href="form-wizard.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Wizard &amp; Validation
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="wysiwyg.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Wysiwyg &amp; Markdown
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="dropzone.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Dropzone File Upload
						</a>

						<b class="arrow"></b>
					</li>
				</ul>
			</li>

			<li class="">
				<a href="widgets.html">
					<i class="menu-icon fa fa-list-alt"></i>
					<span class="menu-text"> Widgets </span>
				</a>

				<b class="arrow"></b>
			</li>

			<li class="">
				<a href="calendar.html">
					<i class="menu-icon fa fa-calendar"></i>

					<span class="menu-text">
						Calendar

						<span class="badge badge-transparent tooltip-error" title="2 Important Events">
							<i class="ace-icon fa fa-exclamation-triangle red bigger-130"></i>
						</span>
					</span>
				</a>

				<b class="arrow"></b>
			</li>

			<li class="">
				<a href="gallery.html">
					<i class="menu-icon fa fa-picture-o"></i>
					<span class="menu-text"> Gallery </span>
				</a>

				<b class="arrow"></b>
			</li>

			<li class="">
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-tag"></i>
					<span class="menu-text"> More Pages </span>

					<b class="arrow fa fa-angle-down"></b>
				</a>

				<b class="arrow"></b>

				<ul class="submenu">
					<li class="">
						<a href="profile.html">
							<i class="menu-icon fa fa-caret-right"></i>
							User Profile
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="inbox.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Inbox
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="pricing.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Pricing Tables
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="invoice.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Invoice
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="timeline.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Timeline
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="email.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Email Templates
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="login.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Login &amp; Register
						</a>

						<b class="arrow"></b>
					</li>
				</ul>
			</li>

			<li class="">
				<a href="#" class="dropdown-toggle">
					<i class="menu-icon fa fa-file-o"></i>

					<span class="menu-text">
						Other Pages

						<span class="badge badge-primary">5</span>
					</span>

					<b class="arrow fa fa-angle-down"></b>
				</a>

				<b class="arrow"></b>

				<ul class="submenu">
					<li class="">
						<a href="faq.html">
							<i class="menu-icon fa fa-caret-right"></i>
							FAQ
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="error-404.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Error 404
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="error-500.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Error 500
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="grid.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Grid
						</a>

						<b class="arrow"></b>
					</li>

					<li class="">
						<a href="blank.html">
							<i class="menu-icon fa fa-caret-right"></i>
							Blank Page
						</a>

						<b class="arrow"></b>
					</li>
				</ul>
			</li>
		</ul><!-- /.nav-list -->

		<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
			<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
		</div>

		<script type="text/javascript">
			try{ace.settings.check(sidebar , collapsed)}catch(e){}
		</script>
	</div>


';


}


 ?>