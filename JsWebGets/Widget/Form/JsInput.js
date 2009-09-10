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

	//Base for JsInput. All should have at least those attributes and methods
	JsInput = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsInput";

		//self.style.textAlign = "center";

		self.input = document.createElement("input");
		self.input.js_parent = self.js_parent;

		self.onmousedown = function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus();};
		self.input.onmousedown = function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus();};

		self.input.name = "js_input_" + self.name;
		self.input.id = "js_input_" + self.name;

		self.setValue = function (value)
		{
			self.input.value = value;
			self.value = value;
		};

		self.getValue = function ()
		{
			return self.input.value;
		};

		self.input.getValue = function ()
		{
			return self.input.value;
		};

		self.setLabel = function () {};

		self.setAttribute = function(name, value)
		{
			eval("self." + name + " = \"" + value + "\"");
			eval("self.input." + name + " = \"" + value + "\"");
		};

		self.setMenu = function(obj)
		{
			self.menu = obj;
			self.input.menu = obj;
			self.setEvent("contextmenu",obj.showContextMenu);
		};

		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				//self.attachEvent("on" + eventStr, self.execEvent);
				self.input.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				//self.addEventListener(eventStr, self.execEvent, false);
				self.input.addEventListener(eventStr, self.execEvent, false);
			}
		};

		self.setHeight = function(value)
		{
			self.style.height = value;
			self.input.style.height = value;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
			self.input.style.width = value;
		};

		//had to do this, because this function must be called as last
		//on internet explorer (error if you try to change type after
		//appending it to another object
		self.buildObject = function ()
		{
			self.appendChild(self.input);
		};

		//returns a pointer to itself
		return self;
	};