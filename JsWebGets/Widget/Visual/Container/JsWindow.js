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
	JsWindow = function (name)
	{
		//sets itself as a div
		var self = new JsDialog(name);
		
		self.titlebar = new JsLabel();
		self.windowarea = new JsWidget();
		if (browserType=="ie")
			self.windowcorner = new JsImageButton();
		else 
			self.windowcorner = new JsImage();
			
		self.windowclose = new JsImageButton();
		self.windowmax = new JsImageButton();
		self.windowundock = new JsImageButton();
		
		self.titlebar.js_parent = self.js_parent;
		self.windowarea.js_parent = self.js_parent;
		self.windowclose.js_parent = self.js_parent;
		self.windowmax.js_parent = self.js_parent;
		self.windowcorner.js_parent = self.js_parent;
		self.windowundock.js_parent = self.js_parent;
		
		self.type = "JsWindow";
		self.dockable = false;
		self.docked = false;
		
		self.windowclose.setSource(jsimages_path + "windowclose.png");
		self.windowmax.setSource(jsimages_path + "windowmax.png");
		self.windowundock.setSource(jsimages_path + "windowundock.png");
		
		self.windowclose.style.position = "absolute";
		self.windowmax.style.position = "absolute";
		self.windowundock.style.position = "absolute";
		self.windowclose.style.right = "3px";
		self.windowmax.style.right = "22px";
		self.windowundock.style.right = "3px";
		
		if (browserType=="ie")
		{
			self.windowclose.style.top = "-1px";
			self.windowundock.style.top = "-1px";
			self.windowmax.style.top = "-1px";
		}
		else
		{
			self.windowclose.style.top = "3px";
			self.windowundock.style.top = "3px";
			self.windowmax.style.top = "3px";
		}
		
		self.windowclose.setWidth(16);
		self.windowclose.setHeight(16);
		self.windowmax.setWidth(16);
		self.windowmax.setHeight(16);
		self.windowundock.setWidth(16);
		self.windowundock.setHeight(16);
		
		self.oldtop = null;
		self.oldleft = null;
		self.oldwidth = null;
		self.oldheight = null;
		
		self.appendChild(self.titlebar);
		self.appendChild(self.windowarea);
		
		self.className = "jswindow";
		self.titlebar.className = "jswindowtitle";
		self.windowarea.className = "jswindowarea";
		self.windowarea.style.overflow = "auto";
		self.windowarea.style.position = "relative";
		
		self.style.padding = 2;
		self.style.position = "absolute";
		
		self.titlebar.style.height = 16;
		self.titlebar.style.paddingLeft = 5;
		
		self.windowcorner.setSource(jsimages_path + "window_corner.png");
		
		self.windowcorner.setWidth(15);
		self.windowcorner.setHeight(15);
		self.windowcorner.style.position = "absolute";
		self.windowcorner.style.bottom = "0px";
		self.windowcorner.style.right = "0px";
		self.windowcorner.style.cursor = "se-resize";
		if (browserType=="ie")
			self.windowcorner.input.style.cursor = "se-resize";
		
		self.onselectstart = new Function ("return false");
		self.titlebar.onselectstart = new Function ("return false");
		//self.windowarea.onselectstart = new Function ("return false");
		//self.onmousedown = new Function ("return false");
		self.titlebar.onmousedown = new Function ("return false");
		//self.windowarea.onmousedown = new Function ("return false");
			
		self.windowclose.setEvent("mousedown",function()
		{
			self.hideWindow();	
		});
		
		self.resizeMax = function()
		{
			if (self.oldwidth)
			{
				new_top = self.oldtop;
				new_left = self.oldleft;
				new_width = self.oldwidth;
				new_height = self.oldheight;
				
				self.oldtop = null;
				self.oldleft = null;
				self.oldwidth = null;
				self.oldheight = null;
			}
			else
			{
				new_top = 0;
				new_left = 0;
				
				if (browserType=="ie")
				var sizefactor = 22;
				else 
					var sizefactor = 8;
				
				new_width = parseInt(self.parentNode.offsetWidth) - sizefactor;
				if (self.parentNode == document.body)
				new_height = parseInt(self.parentNode.clientHeight) - sizefactor;
				else 
					new_height = parseInt(self.parentNode.offsetHeight) - sizefactor;
					
				self.oldtop = self.style.top;
				self.oldleft = self.style.left;
				self.oldwidth = self.style.width;
				self.oldheight = self.style.height;
			}
			
			self.style.top = new_top;
			self.style.left = new_left;
			self.setWidth(new_width);
			self.setHeight(new_height);
			
			self.js_tempNode = null;
			
		};
		
		self.windowmax.setEvent("mousedown",self.resizeMax);
		
		self.setEvent("click", function(jsEvent)
		{
			if (jsTarget == self && !self.docked)
				self.parentNode.appendChild(self);
		});
		
		self.setTitle = function(value)
		{
			self.titlebar.setValue(value);
		};
		
		self.addItem = function (obj)
		{
			self.windowarea.addItem(obj);
			obj.js_parent_container = self;
		};
		
		self.delItem = function (obj)
		{
			self.windowarea.delItem(obj);
		};
		
		self.setHeight = function(value)
		{
			self.style.height = value;
			if (browserType=="ie")
				self.windowarea.style.height=parseInt(self.style.height)-22;
			else 
				self.windowarea.style.height=parseInt(self.style.height)-20;
		};
		
		self.setWidth = function(value)
		{
			self.style.width = value;
		};
		
		self.showWindow = function()
		{
			self.showDialog();
		};
		
		self.hideWindow = function()
		{
			self.hideDialog();
		};
		
		self.resize = function (jsEvent)
		{
			self.beginPosX = jsEvent.clientX;
			self.beginPosY = jsEvent.clientY;
			jsResized = self;
			return false;
		};
		
		self.move = function (jsEvent)
		{
			if (browserType=="ie")
			{
				self.correctX = jsEvent.x;
				self.correctY = jsEvent.y;
			}
			else
			{
				self.correctX = jsEvent.pageX - getObjLeft(self);
				self.correctY = jsEvent.pageY - getObjTop(self);
			}
			
			jsMoved = self;
			
			if(self.js_tempNode)
			{
				self.js_tempNode.style.height = self.style.height;
				self.js_tempNode.style.width = self.style.width;
			}
			
			if (browserType=="ie")
				jsEvent.returnValue = false;
			else 
				jsEvent.stopPropagation();
			
			return false;
		};
		
		self.setResizable = function(jscallback)
		{
			if (jscallback)
				self.resize_jscallback = jscallback;
				
			self.titlebar.appendChild(self.windowmax);
			self.titlebar.setEvent("dblclick",self.resizeMax);
			self.appendChild(self.windowcorner);
			
			self.windowcorner.setEvent("mousedown", self.resize);
			
			self.windowcorner.setEvent("click", function ()
			{
				jsResized = null;
				return false;
			});
		};
		
		self.unsetResizable = function()
		{
			self.titlebar.removeChild(self.windowmax);
			self.titlebar.unsetEvent("dblclick",self.resizeMax);
			self.removeChild(self.windowcorner);
		};
		
		self.setClosable = function()
		{
			self.titlebar.appendChild(self.windowclose);
		};
		
		self.unsetClosable = function()
		{
			self.titlebar.removeChild(self.windowclose);
		};
		
		self.setMovable = function(jscallback)
		{
			if (jscallback)
				self.jscallback = jscallback;
			
			self.titlebar.style.cursor = "move";	
			self.titlebar.setEvent("mousedown",self.move);
			
			//if it's a complete click, it's not a drag, so I must reset the jsDragged var
			self.titlebar.setEvent("click", function ()
			{
				jsMoved = null;
				return false;
			});
		};
		
		self.unsetMovable = function()
		{
			self.titlebar.style.cursor = "default";
			self.titlebar.unsetEvent("mousedown",self.move);
		};
		
		self.setDockable = function ()
		{
			self.dockable = true;
		};
		
		self.unsetDockable = function ()
		{
			self.dockable = false;
		};
		
		self.undock = function ()
		{
			self.setWidth(self.offsetWidth);
			
			if (self.parentNode.childNodes.length == 1)
			self.js_dock.showhideDock();
			
			self.titlebar.removeChild(self.windowundock);
			self.titlebar.className = "jswindowtitle";
			
			document.body.appendChild(self);
			
			self.docked = false;
			
			self.titlebar.unsetEvent("dblclick",self.undock);
			
			self.showWindow();
			
			self.setMovable();
			self.setClosable();
		};
		
		
		self.dock = function ()
		{
			self.titlebar.appendChild(self.windowundock);
			self.titlebar.className = "jsdockedwindowtitle";
			
			self.docked = true;
			
			self.unsetMovable();
			self.unsetClosable();
			
			self.titlebar.setEvent("dblclick",self.undock);
		};
		
		self.windowundock.setEvent("mousedown",self.undock);
		
		self.setResizable();
		self.setMovable();
		self.setClosable();
		
		return self;
	};