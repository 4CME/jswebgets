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
	JsToolBox = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsToolBox";
		self.className = "jstoolbox";
		self.style.height = "100%";
		self.currentBox = null;
		self.js_parent = self;
		
		self.clearData = function()
		{
			self.innerHTML = "";
			self.boxes = Array();
		};
		
		self.addBox = function (boxtitle, boxicon)
		{
			var index = self.childNodes.length;
			var boxtemp = new JsBox();
			
			self.appendChild(boxtemp);
			
			boxtemp.setTitle(boxtitle);
			
			if (boxicon)
				boxtemp.setIcon(boxicon);
			else 
				boxtemp.setIcon(jsimages_path + "blank.gif");
				
			self.box_index = index;
			boxtemp.box_index = index;
			boxtemp.js_parent = self;
			boxtemp.boxtitle.js_parent = self;
			boxtemp.boxtitle.label.js_parent = self;
			boxtemp.boxtitle.icon.js_parent = self;
			boxtemp.corner.js_parent = self;
			boxtemp.corner.img.js_parent = self;
			boxtemp.boxitens.js_parent = self;
		};
		
		self.delBox = function (box_index)
		{
			self.delItem(self.boxes[box_index]);
		};
		
		self.addItem = function (obj)
		{
			box_index = self.box_index;
			self.childNodes[box_index].addItem(obj);
			obj.js_parent_container = self;
			obj.js_parent_box = box_index;
		};
		
		self.addItemToBox = function (obj, box_index)
		{
			self.childNodes[box_index].addItem(obj);
			obj.js_parent_container = self;
			obj.js_parent_box = box_index;
		};
		
		self.showBox = function (box_index)
		{
			if (self.currentBox)
				self.currentBox.hideBox();
			
			if (self.currentBox !== self.childNodes[box_index])
			{
				self.currentBox = self.childNodes[box_index];
				self.currentBox.showBox();
				self.box_index = self.currentBox.box_index;
			}
			else self.currentBox = null;
		};
		
		self.setResizable = function()
		{
		};
		
		self.unsetResizable = function()
		{
		};
		
		return self;
	};