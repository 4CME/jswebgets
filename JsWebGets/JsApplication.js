	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sanchez
	
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
	
	//JsApplication. Refers to the document it self
	JsApplication = function ()
	{		
		//If we don`t have a body, create one
		if (!document.body)
			document.write("<head><title></title></head><body class=\"jsapplication\"></body>");
			//document.write("<!DOCTYPE HTML PUBLIC \"-\/\/W3C\/\/DTD HTML 4.01 Transitional\/\/EN\" \"http:\/\/www.w3.org/TR/html4/loose.dtd\"><head><title></title></head><body class=\"jsapplication\"></body>");
		
		//attach object to body
		var self = document.body;
		
		self.js_parent = self;
		self.js_parent_container = self;
		
		//gets ctrl and shift keys status
		self.onkeydown = setJsEventJsTarget;
		
		//inherit common things from JsObject
		inherit(self, JsObject);
		
		//set the Language used for JsObjects messages and warnings
		self.setLanguage = function(value)
		{
			lang = value;
		};
		
		//defines the Title for the Web Application
		self.setTitle = function(value)
		{
			document.title = value;
		};
		
		//sets the theme that will be used
		self.setTheme = function(value)
		{
			self.theme = value;
			
			//first, let's load the theme CSS
			document.write("<link href=\"" + value + "/css/jsstyle.css\" type=\"text/css\" rel=\"stylesheet\">");
			
			//sets the path for JsObjects images
			jsimages_path = value + "/images/";
		};
		
		//addItem to the Body
		self.addItem = function(obj)
		{
			//self.childNodes[self.childNodes.length] = obj;
			self.appendChild(obj);
			obj.js_parent_container = self;
		};
		
		//delItem from Body
		self.delItem = function(obj)
		{
			self.removeChild(obj);
			delete obj;
		};
		
		//set Document menu
		self.setMenu = function(obj)
		{
			self.menu = obj;
		};
		
		//returns a pointer to itself
		return self;
	};