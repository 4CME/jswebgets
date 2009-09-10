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
	//JsInterface variables

	/***********************************/
	/**************UI CLASS*************/
	/***********************************/

	//JsInterface.js User Interface Class
	JsInterface = function()
	{
		//this is the referer to the object itself.
		//using self as a local var allow us to create
		//inheritance on Javascript.
		//in the end of the object, thou, it must return
		//the self reference, otherwise it won't work
		var self = new JsWidget();

		/***********************************/
		/****************DATA***************/
		/***********************************/

		self.loadData = function(data)
		{
			for (var js_i in data)
			{
				if (
							self.UIcomponents[js_i].type == "JsCNPJEdit" ||
							self.UIcomponents[js_i].type == "JsComboBox" ||
							self.UIcomponents[js_i].type == "JsCodeEdit" ||
							self.UIcomponents[js_i].type == "JsCPFEdit" ||
							self.UIcomponents[js_i].type == "JsDateEdit" ||
							self.UIcomponents[js_i].type == "JsIPEdit" ||
							self.UIcomponents[js_i].type == "JsLineEdit" ||
							self.UIcomponents[js_i].type == "JsLineEditAdv" ||
							self.UIcomponents[js_i].type == "JsListBox" ||
							self.UIcomponents[js_i].type == "JsMoneyEdit" ||
							self.UIcomponents[js_i].type == "JsRichTextEdit" ||
							self.UIcomponents[js_i].type == "JsSpinBox" ||
							self.UIcomponents[js_i].type == "JsTextEdit" ||
							self.UIcomponents[js_i].type == "JsTimeEdit"
						)
				{
					self.UIcomponents[js_i].setValue(data[js_i]);
				}
				else if (self.UIcomponents[js_i].type == "JsListView")
				{
					for (var js_j=0;js_j<data[js_i].length;js_j++)
					{
						var tmpobj = new JsListViewItem();
						self.UIcomponents[js_i].addItem(tmpobj);
						for (var js_x=0; js_x < data[js_i][js_j].length; js_x++)
						{
							tmpobj.addItem(data[js_i][js_j][js_x]);
						}

						tmpobj = null;
					}
				}
				else if (self.UIcomponents[js_i].type == "JsDataView")
				{
					self.UIcomponents[js_i].loadData(data[js_i]);
				}
			}
		};

		self.dumpData = function()
		{
			return data;
		};

		self.resetData = function()
		{
		};

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

			/*
			Array Structure
			self.UIcallbacksHandlers[0] = new Array();
			self.UIcallbacksHandlers[0][0] = "click"	//event
			self.UIcallbacksHandlers[0][1] = object //handler
			self.UIcallbacksHandlers[0][2] = callback //callback
			*/

			for (var js_i = 0; js_i < self.UIcallbacksHandlers.length; js_i++)
			{
				if (self.UIcallbacksHandlers[js_i][0] == "callback")
					self.UIcallbacksHandlers[js_i][1].setCallback(self.UIcallbacksHandlers[js_i][2])
				else
					self.UIcallbacksHandlers[js_i][1].setEvent(self.UIcallbacksHandlers[js_i][0],self.UIcallbacksHandlers[js_i][2])
			}
		};

		//now, we build the interface
		self.buildInterface();
		//we create all the events it will have
		self.createEvents();
		//we attach the events to it's handler
		self.attachEvents();

		return self;

	}