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

	/***********************************/
	/**************GLOBALS**************/
	/***********************************/
	//global variables for use on the interface control
	//DO NOT USE THEM IN YOUR CODE!

	/***********************************/
	/***********CONFIGURATION***********/
	/***********************************/
	//Set these according to your application
	//JsMainWindow variables
	var lang = "pt";

	/***********************************/
	/**************UI CLASS*************/
	/***********************************/

	//JsMainWindow.js User Interface Class
	JsMainWindow = function()
	{
		//this is the referer to the object itself.
		//using self as a local var allow us to create
		//inheritance on Javascript.
		//in the end of the object, thou, it must return
		//the self reference, otherwise it won't work
		var self = new JsApplication();

		/***********************************/
		/*************INTERFACE*************/
		/***********************************/

		//this is the function used to build the interface
		//it contains references to all the widgets
		self.buildInterface = function()
		{
			//used by JsDesigner, to load and save the interface
			self.UIcomponents = new Array();

				/***************User defined**************/
				//Data Handlers
				//JsHTTPrequest - client-server communication layer
				self.request = new JsHTTPRequest();

				//JsDataConnector - another client-server communication layer
				//that can upload images
				self.dc = new JsDataConnector();

				//JsWebServiceConnector - client-server communication layer
				self.ws = new JsWebServiceConnector();

				//Top of the Application Window
				//topgrid
				self.UIcomponents.topgrid = new JsWidgetGrid();
				self.UIcomponents.topgrid.setHeight(50);

				//Demo Label
				self.UIcomponents.label = new JsLabel();
				self.UIcomponents.label.setFontSize(30);
				self.UIcomponents.label.setHeight(40);
				self.UIcomponents.label.setFontWeight("bold");
				self.UIcomponents.label.setFontColor("#FFFFFF");

				//logo
				self.UIcomponents.logo = new JsImage();

				self.UIcomponents.topgrid.addRow();
				self.UIcomponents.topgrid.addCell('','','left','middle','','','',jsmainwindow_images + 'bgtop.png');
				self.UIcomponents.topgrid.addItem(self.UIcomponents.label);
				self.UIcomponents.topgrid.addCell('','','right','middle','','','',jsmainwindow_images + 'bgtop.png');

				//Main Area
				self.UIcomponents.mainarea = new JsWidget();
				self.UIcomponents.mainarea.style.position = "relative";
				windowHeight = document.body.clientHeight;
				self.UIcomponents.mainarea.setHeight(parseInt(windowHeight) - 70);

				self.appendChild(self.UIcomponents.topgrid);

				self.UIcomponents.menubar = new JsMenuBar();

				self.appendChild(self.UIcomponents.menubar);

				self.appendChild(self.UIcomponents.mainarea);
				/************End of User defined**********/

		};

		/***********************************/
		/***************EVENTS**************/
		/***********************************/

		self.createEvents = function()
		{
			//we place the events on an array so we can easily recover
			//them when loading the interface on JsDesigner
			self.UIcallbacks = new Array();

				/***************User defined**************/
				self.UIcallbacks.setAppLabel = function(value)
				{
					self.UIcomponents.label.setValue(value);
				}

				self.UIcallbacks.setLogo = function(value)
				{
					self.UIcomponents.logo.setSource(value);
					self.UIcomponents.topgrid.addItem(self.UIcomponents.logo);
				}

				self.UIcallbacks.setLogoWidth = function(value)
				{
					self.UIcomponents.logo.setWidth(value);
				}

				self.UIcallbacks.setLogoHeight = function(value)
				{
					self.UIcomponents.logo.setHeight(value);
				}

				self.UIcallbacks.addMenu = function(menu)
				{
					self.UIcomponents.menubar.addItem(menu);
				};
				/************End of User defined**********/

			//this will put the methods accessible on a more OO way
			for (i in self.UIcallbacks)
				self[i] = self.UIcallbacks[i];
		};

		/***********************************/
		/**EVENTS AND HANDLERS ATTACHMENTS**/
		/***********************************/

		self.attachEvents = function()
		{
			//Widgets events
			self.UIcallbacksHandlers = new Array();

			for (var js_i = 0; js_i < self.UIcallbacksHandlers.length; js_i++)
			{
				if (self.UIcallbacksHandlers[js_i][0] == "callback")
					self.UIcallbacksHandlers[js_i][1].setCallback(self.UIcallbacksHandlers[js_i][2])
				else
					self.UIcallbacksHandlers[js_i][1].setEvent(self.UIcallbacksHandlers[js_i][0],self.UIcallbacksHandlers[js_i][2])
			}
		};

		/***********************************/
		/**  REWROTE METHODS FROM JSAPP   **/
		/***********************************/

		self.addItem = function(obj)
		{
			self.UIcomponents.mainarea.addItem(obj);
		};

		self.delItem = function(obj)
		{
			self.UIcomponents.mainarea.delItem(obj);
		};

		self.resizeMe = function()
		{
			windowHeight = document.body.clientHeight;
			self.UIcomponents.mainarea.setHeight(parseInt(windowHeight) - 70);
		}

		window.onresize = self.resizeMe;

		//now, we build the interface
		self.buildInterface();
		//we create all the events it will have
		self.createEvents();
		//we attach the events to it's handler
		self.attachEvents();

		return self;

	}