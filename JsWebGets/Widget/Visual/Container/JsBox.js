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
	JsBox = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsBox";
		self.className = "jsbox";
		self.style.position = "relative";
		
		self.boxtitle = new JsLabel();
		self.corner = new JsImage();
		self.boxitens = new JsWidget();
		
		self.boxtitle.style.height = 24;
		self.boxtitle.style.height = 24;
		self.boxtitle.style.fontWeight = "bold";
		self.boxtitle.className = "jsboxlabel";
		
		self.corner.style.position = "absolute";
		self.corner.setWidth(24);
		self.corner.setHeight(24);
		self.corner.style.top = 0;
		self.corner.style.right = 0;
		self.corner.setSource(jsimages_path + "toolbox_corner_inactive.png");
		
		self.boxitens.style.display = "none";
		self.boxitens.style.overflow = "auto";
		
		self.addItem(self.boxtitle);
		self.boxtitle.appendChild(self.corner);
		self.addItem(self.boxitens);
		
		self.setTitle = function (boxtitle)
		{
			self.boxtitle.setValue(boxtitle);
		};
		
		self.setIcon = function (boxicon)
		{
			self.boxtitle.setIcon(boxicon);
		};
		
		self.addItem = function (obj)
		{
			self.boxitens.addItem(obj);
		};
		
		self.delItem = function (obj)
		{
			self.boxitens.delItem(obj);
			delete obj;
		};
		
		self.showMe = function ()
		{
			self.js_parent.box_index = self.box_index;
			self.parentNode.showBox(self.box_index);
		};
		
		self.showBox = function ()
		{
			self.className = "jsboxselected";
			self.boxtitle.className = "jsboxlabelselected";
			self.corner.setSource(jsimages_path + "toolbox_corner_active.png");
			
			boxitensheight = self.parentNode.offsetHeight - (self.parentNode.childNodes.length * 26);
			
			if (boxitensheight > 0)
				self.boxitens.style.height = boxitensheight;
				
			self.boxitens.style.display = "block";
		};
		
		self.hideBox = function ()
		{
			self.corner.setSource(jsimages_path + "toolbox_corner_inactive.png");
			self.className = "jsbox";
			self.boxtitle.className = "jsboxlabel";
			self.boxitens.style.display = "none";
		};
		
		self.boxtitle.setEvent("mousedown",self.showMe);
		
		self.setResizable = function(){};		
		self.unsetResizable = function(){};
		
		self.boxtitle.setResizable = function(){};
		self.boxtitle.unsetResizable = function(){};
		
		self.corner.setResizable = function(){};
		self.corner.unsetResizable = function(){};
				
		self.boxitens.setResizable = function(){};
		self.boxitens.unsetResizable = function(){};

		
		return self;
	};