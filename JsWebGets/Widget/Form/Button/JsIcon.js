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
	JsIcon = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		self.input = new JsImageButton();
		self.label = new JsLabel();
		
		self.input.setHeight(32);
		self.input.setWidth(32);
		
		self.jscallback = null;
		
		self.input.js_parent = self.js_parent;
		self.label.js_parent = self.js_parent;
		
		self.input.input.js_parent = self.js_parent;
		self.label.label.js_parent = self.js_parent;
	
		self.label.style.whiteSpace = "normal";
		self.label.label.style.whiteSpace = "normal";
		
		self.appendChild(self.input);
		self.appendChild(self.label);
		
		self.type = "JsIcon";
		
		self.className = "jsicon";
		
		self.style.position = "absolute";
		self.style.textAlign = "center";
		
		self.setLabel = function(value)
		{
			self.label.setValue(value);
		};
		
		self.setSource = function(value)
		{
			self.input.setSource(value);
		};
		
		self.setResizable = function()
		{
		};
		
		self.unsetResizable = function()
		{
		};
		
		self.setMovable();
		
		//returns a pointer to itself	    
		return self;
	};