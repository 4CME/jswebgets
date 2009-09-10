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
	
	//
	JsCheckBox = function (name)
	{
		//sets itself as a div
		var self = new JsInput(name);
		
		self.type = "JsCheckBox";
		
		//back compatibility
		self.check = self.input;
		
		self.input.type = "checkbox";
		self.label = document.createElement("label");
		self.label.htmlFor = "js_input_" + self.name;
		
		self.label.onmousedown = new Function ("return false");
		self.label.onselectstart = new Function ("return false");
		
		self.label.style.position = "relative";
		if (browserType=="ie")
			self.label.style.top = -2;
		else 
			self.label.style.top = -4;
		self.input.style.position = "relative";
		self.input.style.top = 0;
		
		self.label.js_parent = self.js_parent;
		
		self.setLabel = function (value)
		{
			self.label.innerHTML = value;
		};
		
		self.setMenu = function(obj)
		{
			self.menu = obj;
			self.input.menu = obj;
			self.label.menu = obj;
			self.setEvent("contextmenu",obj.showContextMenu);
		};
		
		self.getValue = function ()
		{
			if (self.input.checked)
				return self.input.value;
			return self.input.checked;
		};
		
		self.setChecked = function (value)
		{
			if (value)
			{
				self.input.checked = true;
				if (browserType=="ie")
					self.input.defaultChecked = true;
			}
			else 
			{
				self.input.checked = false;
				if (browserType=="ie")
					self.input.defaultChecked = false;
			}
		};
		
		self.input.getValue = function ()
		{
			return this.parentNode.getValue();
		};
		
		self.label.getValue = function ()
		{
			return this.parentNode.getValue();
		};
		
		//had to do this, because this function must be called as last
		//on internet explorer (error if you try to change type after
		//appending it to another object
		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.attachEvent("on" + eventStr, self.execEvent);
				self.input.attachEvent("on" + eventStr, self.execEvent);
				self.label.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				self.addEventListener(eventStr, self.execEvent, false);
				self.input.addEventListener(eventStr, self.execEvent, false);
				self.label.addEventListener(eventStr, self.execEvent, false);
			}
		};
		
		if (browserType=="ie")
		{
			self.setEvent("click",
				function ()
				{
					self.input.defaultChecked = self.input.checked;
				}
			);
		};
		
		self.setHeight = function(value)
		{
			self.style.height = value;
		};
		
		self.setWidth = function(value)
		{
			self.style.width = value;
		};
		
		//had to do this, because this function must be called as last
		//on internet explorer (error if you try to change type after
		//appending it to another object
		self.buildObject = function ()
		{
			self.appendChild(self.input);
			self.appendChild(self.label);
		};
		
		//This has to come after setting input.type, or IE will hang
		self.buildObject();
		
		//returns a pointer to itself	
		return self;
	};