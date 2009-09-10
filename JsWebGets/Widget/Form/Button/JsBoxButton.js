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
	JsBoxButton = function (name)
	{
		//sets itself as a div
		var self = new JsLabel(name);
		
		self.type = "JsBoxButton";
		
		self.className = "jsboxbuttonitem";
		self.style.position = "relative";
		self.style.height = 22;
		
		self.js_callback = null;
		
		self.setIcon(jsimages_path + "blank.gif");
		
		self.icon.style.position = "absolute";
		self.icon.style.top = 2;
		self.icon.style.left = 0;
		
		self.label.style.position = "absolute";
		self.label.style.top = 2;
		self.label.style.left = 18;
		
		if (browserType == "ie")
		{
			self.style.width = "100%";
		}
		else
		{
			self.style.width = "auto";
		}
		
		self.setEvent("mouseover",function (e)
		{
			self.className = "jsboxbuttonitemover";
		});
		
		self.setEvent("mouseup",function (e)
		{
			self.className = "jsboxbuttonitemselected";
		});
		
		self.setEvent("mousedown", function (e)
		{
			if (jsBoxButton)
				jsBoxButton.className = "jsboxbuttonitem";
				
			jsBoxButton = self;
			
			document.onmousedown = self.toolboxaction;
			document.body.style.cursor = "crosshair";
			
			self.className = "jsboxbuttonitemmousedown";
		});
		
		self.setCallback = function (js_callback)
		{
			self.js_callback = js_callback;
		};
		
		self.toolboxaction = function (jsEvent)
		{
			if (browserType=="ie")
				jsEvent = window.event;
				
			if (self.js_callback)
			{
				self.js_callback(jsEvent);
			}
				
			self.className = "jsboxbuttonitem";
				
			document.onmousedown = new Function ("return false");
			document.body.style.cursor = "default";
			jsBoxButton = null;
		};
		
		self.setEvent("mouseout",function (e)
		{
			if (jsBoxButton != self)
				self.className = "jsboxbuttonitem";
			else if (jsBoxButton)
				self.className = "jsboxbuttonitemselected";
		});
		
		//returns a pointer to itself	    
		return self;
	};
	