<?php

	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago S�nchez

	This library is free software; you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public
	License as published by the Free Software Foundation; either
	version 2.1 of the License, or (at your option) any later version.

	This library is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public
	License along with this library; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	******************************************************************/

	header('Last-Modified: '.gmdate("D, d M Y H:i:s").' GMT');
	header('Cache-Control: no-cache, must-revalidate');		//HTTP/1.1
	header('Pragma: no-cache');								//HTTP/1.0
	header('Content-type: text/html; charset=UTF-8');

?>
<html>
	<head>
	<script language="JavaScript" src="../JsWebGets/include_clean_jswebgets.php"></script>
	<script language="JavaScript" src="system/classes/interfaces/JsMainWindow/JsMainWindow.ui.js"></script>
	<script language="JavaScript" src="system/classes/interfaces/JsDesigner/JsDesigner.ui.js"></script>
	<script>

		//prevents the window to be closed accidentally by the user
		/**/
		window.onbeforeunload = function(e)
		{
			if (!e)
				e = window.event;
			if (document.all)
				e.returnValue = false;
			else
				e.preventDefault();
		};
		/**/

		//JsMainWindow variables
		var lang = "pt";
		var jsmainwindow_images = "system/images/";
		//JsDesigner Variables
		var jsdesigner_images = jsmainwindow_images;
		//JsDesigner - used by createNewInterface
		var interfaceType = "JsWindow";

		//Jsapplication - sets the environment ready for JsObjects
		app = new JsMainWindow();
		app.setTitle("JsDesigner");
		app.setTheme("../JsThemes/default_black");
		app.setAppLabel("JsDesigner");
		app.setLogo(jsdesigner_images + "logo_jswebgets.png");
		app.setLogoWidth(180);
		app.setLogoHeight(45);

		//JsHTTPrequest - client-server communication layer
		app.request.setHandler("control.php");
		//JsDataConnector - another client-server communication layer
		//that can upload images
		app.dc.setHandler("control.php");

		//Instance of the JsDesigner
		jsdesigner = new JsDesigner();

		//Build the interface now using the instances
		app.addItem(jsdesigner);

		//let's set the jsdesigner height, otherwise IE gets crazy
		jsdesigner.setHeight(parseInt(document.body.clientHeight) - 70);

		window.onresize = jsdesigner.resizeMe;

		//now we show the default "new interface dialog"
		jsdesigner.showNewDialog();
		//====================================

		//Splash screen
		splash = new JsDialog();
		splash.setWidth(500);
		splash.setHeight(250);

		splashimg = new JsImage();
		splashimg.setSource("system/images/jsdesigner.png");
		splashimg.setWidth(128);
		splashimg.setHeight(128);
		splashimg.setXPos(10);
		splashimg.setYPos(10);

		splashtitle = new JsLabel();
		splashtitle.setHeight(40);
		splashtitle.setFontSize(20);
		splashtitle.setFontWeight("bold");
		splashtitle.setValue("JsDesigner");
		splashtitle.setXPos(150);
		splashtitle.setYPos(20);

		splashtextstring  = 'Copyright 2006 - Pablo Santiago Sánchez\n';
		splashtextstring += '\n';
		splashtextstring += 'JsDesigner is Free Software released under the GNU GPL.\n';
		splashtextstring += '\n';
		splashtextstring += 'Use it freely, but restrained to the rights given to you explicited on the GNU GPL license, version 2.0\n';
		splashtextstring += '\n';
		splashtextstring += 'http://www.jswebgets.com.br\n';

		splashtext = new JsTextEdit();
		splashtext.setWidth(350);
		splashtext.setHeight(180);
		splashtext.setXPos(150);
		splashtext.setYPos(70);
		splashtext.setValue(splashtextstring);
		splashtext.readOnly(true);

		splash.addItem(splashimg)
		splash.addItem(splashtitle)
		splash.addItem(splashtext)

		splash.showDialog();

		window.setTimeout("splash.hideDialog()",2000);

	</script>
	<style>

	/*Redefine the body style to include a wallpaper*/

	body
	{
		/** /
		background-color: #666666;
		/**/
		/**/
		background-color: #000000;
		/**/
		/**/
		background-image: url("system/images/js_wallpaper.png");
		/**/
		margin: 0px;
		overflow: hidden;
	}
	</style>
	</head>
	<body>
	</body>
</html>