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
	JsDock = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		self.type = "JsDock";
		
		jsDocks[jsDocks.length] = self;
		
		self.alignment = "left";
		
		self.dockarea = new JsWidget();
		self.dockhandler = new JsWidget();
		self.showdockbutton = new JsImageButton();
		
		self.dockarea.js_parent = self.js_parent;
		self.dockhandler.js_parent = self.js_parent;
		self.showdockbutton.js_parent = self.js_parent;
		
		self.style.position = "relative";
		self.dockarea.style.position = "relative";
		self.dockhandler.style.position = "relative";
		
		//default styles
		self.className = "jsdock";
		self.dockarea.className = "jsdockarea";
		self.dockhandler.className = "jsdockhandler";
		
		self.dockhandler.addItem(self.showdockbutton);
		self.appendChild(self.dockarea);
		self.appendChild(self.dockhandler);
		
		self.setAlign = function(alignment)
		{
			self.alignment = alignment;
			
			self.showdockbutton.setSource(jsimages_path + "showhidelr.gif");
				
			self.style.width = "230";
			self.style.height = "100%";
			self.style.top = 0;
			self.style.left = 0;
			self.dockarea.style.width = "218";
			self.dockarea.style.height = "100%";
			self.dockarea.style.overflow = "auto";
			self.dockhandler.style.width = "10";
			self.dockhandler.style.height = "100%";
			self.dockhandler.style.cursor = "e-resize";
			self.showdockbutton.style.width = "4";
			self.showdockbutton.style.height = "13";
			
			if (alignment == "left")
			{
				if (browserType=="ie")
				{
					self.dockarea.style.styleFloat = "left";
					self.dockhandler.style.styleFloat = "right";
					self.style.styleFloat = "left";
				}
				else
				{
					self.dockarea.style.cssFloat = "left";
					self.dockhandler.style.cssFloat = "right";
					self.style.cssFloat = "left";
				}
				
				self.appendChild(self.dockarea);
				self.appendChild(self.dockhandler);
			}
			if (alignment == "right")
			{
				if (browserType=="ie")
				{
					self.dockarea.style.styleFloat = "right";
					self.dockhandler.style.styleFloat = "left";
					self.style.styleFloat = "right";
				}
				else
				{
					self.dockarea.style.cssFloat = "right";
					self.dockhandler.style.cssFloat = "left";
					self.style.cssFloat = "right";
				}
				
				self.appendChild(self.dockhandler);
				self.appendChild(self.dockarea);
			}
		};
		
		self.addItem = function(obj)
		{
			if (obj.type != "JsWindow")
			{
				alert("Only windows can be docked!");
				return false;
			}

			obj.style.top = 0;
			obj.style.left = 0;
			
			if (browserType == "ie")
			{
				width = "100%";
			}
			else
			{
				width = "auto";
			}
			
			self.dockarea.addItem(obj);
			
			obj.setDockable();
			obj.dock();
			obj.style.position = "relative";
			obj.style.clear = "both";
			obj.js_dock = self;
			
			if (parseInt(self.dockarea.style.width) == 0)
				self.showhideDock();
				
			obj.setWidth(width);
			obj.js_parent_container = self;
		};
		
		self.delItem = function(obj)
		{
			self.dockarea.delItem(obj);
			delete obj;
		};
		
		self.showhideDock = function(jsEvent)
		{
			if (parseInt(self.dockarea.style.width) == 0)
			{
				self.setWidth(self.oldwidth);
			}
			else
			{
				self.oldwidth = self.style.width;
				self.setWidth(12);
			}
			
		};
		
		self.resizeDock= function(jsEvent)
		{
			self.beginPosX = jsEvent.clientX;
			jsResized = self;
			return false;
		};
		
		self.dockhandler.setEvent("dblclick",self.showhideDock);
		
		self.dockhandler.setEvent("mousedown",self.resizeDock);
		
		self.dockhandler.setEvent("click",function()
		{
			jsResized = null;
			return false;
		});
		
		self.setWidth = function(width)
		{
			self.style.width = width;
			if (self.alignment == "left" || self.alignment == "right")
				self.dockarea.style.width = parseInt(width) - 12;
		};
		
		return self;
	};