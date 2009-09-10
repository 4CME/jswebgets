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
	JsMenuBar = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsMenuBar";
		
		self.className	= "jsmenubar";
		self.style.overflow	= "hidden";
		self.style.height	= 20;
		
		self.addItem = function(obj)
		{
			obj.setAsMenuBar();
			self.appendChild(obj.label);
			
			obj.label.label.style.left = 0;
			if (obj.label.icon)
				obj.label.icon.style.left = 0;
		};
		
		self.setResizable = function()
		{
		};
		
		self.unsetResizable = function()
		{
		};
		
		return self;
	};