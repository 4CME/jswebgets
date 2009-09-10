<?php

	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sánchez

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

	/*******************************************************************
				PHP Controller Example using JsHTTPRequest
	*******************************************************************/

	header ("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
	header ("Cache-Control: no-cache, must-revalidate");		//HTTP/1.1
	header ("Pragma: no-cache");								//HTTP/1.0
	header ("Content-type: text/html; charset=ISO-8859-1");

	//for jsdesigner, magic_quotes_gpc must be set to off
	ini_set("magic_quotes_gpc","Off");

	//Includes the controller class
	require("system/classes/controls/JsDesigner/jsdesigner_control.php");

	//start session (so we can have some session persistence
	session_start();

	//if the control is not intantiated, let's start it
	if (!isset($_SESSION["jsdesigner_control"]))
		$_SESSION["jsdesigner_control"]= new JsDesignerControl();

	//let's set the path where JsDesigner will save it's files
	$_SESSION["jsdesigner_control"]->setClassesPath("../../ENAP_PHP/includes/php/interfaces/websco");
	//$_SESSION["jsdesigner_control"]->setClassesPath("./custom_classes/");
	$_SESSION["jsdesigner_control"]->setExtension("php");

	//the controle_msg is the method wich should be called by the interface
	//for each action the controller is supposed to have
	if ($_REQUEST["control_msg"])
		$_SESSION["jsdesigner_control"]->$_REQUEST["control_msg"]();

?>