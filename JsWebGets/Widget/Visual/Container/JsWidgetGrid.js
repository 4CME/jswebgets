	/******************************************************************
	JsWebGets - Web User Interface Library
	Copyright (C) 2006  Pablo Santiago Sanchez
	
	self library is free software; you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public
	License as published by the Free Software Foundation; either
	version 2.1 of the License, or (at your option) any later version.
	
	self library is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public
	License along with self library; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	******************************************************************/
	
	//
	JsWidgetGrid = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsWidgetGrid";
		
		self.grid				= document.createElement("table");
		self.grid.style.height	= "100%";
		self.grid.style.width	= "100%";
		self.grid.className		= "jsgrid";
		
		self.appendChild(self.grid);
		
		self.addRow = function()
		{
			self.currentrow = self.grid.insertRow(self.grid.rows.length);
		};
		
		self.addCell = function(width,height,align,valign,colspan,rowspan,bgcolor,bgimage)
		{
			self.currentcell = self.currentrow.insertCell(self.currentrow.cells.length);
			
			self.currentcell.className = "jsgridcell";
			self.currentcell.style.padding = 0;
			self.currentcell.style.position = "relative";
			
			if (width)
				self.currentcell.style.width = width;
			if (height)
				self.currentcell.style.height = height;
			if (align)
				self.currentcell.align = align;
			if (valign)
				self.currentcell.style.verticalAlign = valign;
			else 
				self.currentcell.style.verticalAlign = "top";
			if (colspan)
				self.currentcell.colSpan = colspan;
			if (rowspan)
				self.currentcell.rowSpan = rowspan;
			if (bgcolor)
				self.currentcell.style.backgroundColor = bgcolor;
			if (bgimage)
				self.currentcell.style.backgroundImage = "url('" + bgimage + "')";
		};
		
		self.addItem = function(obj)
		{
			obj.parent = self;
			self.currentcell.appendChild(obj);
			obj.js_parent_container = self;
		};
		
		self.clearGrid = function()
		{
			self.removeChild(self.grid);
			self.grid				= document.createElement("table");
			self.grid.style.height	= "100%";
			self.grid.style.width	= "100%";
			self.grid.className		= "jsgrid";
			
			self.appendChild(self.grid);
		};
		
		return self;
	};