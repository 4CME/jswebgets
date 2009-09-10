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
	JsMiniToolBarButton = function (name)
	{
		//sets itself as a div
		var self = new JsImageButton(name);
		
		self.type = "JsMiniToolBarButton";
		
		self.className = "jsminitoolbaritem";
		self.style.position = "relative";
		self.style.padding = 0;
		
		self.input.style.height = 16;
		self.input.style.width = 16;
		
		if (browserType=="ie")
			self.style.styleFloat = "left";
		else 
			self.style.cssFloat = "left";
		
		self.setEvent("mouseover",function (e)
		{
			self.className = "jsminitoolbaritemover";
		});
		
		self.setEvent("mouseup",function (e)
		{
			self.className = "jsminitoolbaritemover";
		});
		
		self.setEvent("mousedown", function (e)
		{
			self.className = "jsminitoolbaritemmousedown";
		});
		
		self.setEvent("mouseout",function (e)
		{
			self.className = "jsminitoolbaritem";
		});
		
		//returns a pointer to itself	    
		return self;
	};