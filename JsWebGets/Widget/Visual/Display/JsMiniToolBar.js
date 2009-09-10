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
	JsMiniToolBar = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsMiniToolBar";
		
		self.className	= "jsminitoolbar";
		self.style.padding	= "0px 8px 0px 5px";
		self.style.height	= 20;
		self.style.overflow	= "hidden";
		
		self.clearData = function()
		{
			var nodeslength = self.childNodes.length;
			for (var js_i=0;js_i<nodeslength;js_i++)
			{
				obj = self.removeChild(self.childNodes[0]);
				delete obj;
			}
		};
		
		self.addItem = function(obj)
		{
			blankdiv = document.createElement("div");
			blankdiv.className = "jsminitoolbaritemblankdiv";
			blankdiv.style.position = "relative";
			if (browserType=="ie")
				blankdiv.style.styleFloat = "left";
			else 
				blankdiv.style.cssFloat = "left";
			blankdiv.js_parent = self.js_parent;
			
			self.appendChild(obj);
			self.appendChild(blankdiv);
		};
		
		self.addDiv = function()
		{
			blankdiv = document.createElement("div");
			blankdiv.className = "jsminitoolbaritemblankdiv";
			hrdiv = document.createElement("div");
			hr = document.createElement("hr");
			
			hrdiv.className = "jsminitoolbardiv";
			
			if (browserType=="ie")
			{
				hrdiv.style.styleFloat = "left";
				blankdiv.style.styleFloat = "left";
			}
			else 
			{
				hrdiv.style.cssFloat = "left";
				blankdiv.style.cssFloat = "left";
			}
			
			hr.style.height = "6";
			hr.style.width = "2";
			
			blankdiv.js_parent = self.js_parent;
			hrdiv.js_parent = self.js_parent;
			hr.js_parent = self.js_parent;
			
			hrdiv.appendChild(hr);
			self.appendChild(hrdiv);
			self.appendChild(blankdiv);
		};
		
		self.setResizable = function()
		{
		};
		
		self.unsetResizable = function()
		{
		};
		
		return self;
	};