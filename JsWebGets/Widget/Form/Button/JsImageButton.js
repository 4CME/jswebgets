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
	JsImageButton = function ()
	{
		//sets itself as a div
		var self = new JsInput();
		
		self.type = "JsImageButton";
		
		
		if (browserType=="ie")
		{
			self.input = document.createElement("image");
			self.input.js_parent = self.js_parent;
			self.input.ondragstart = function(){return false;};
		}
		else
		{
			self.input.type = "image";
		}
			self.input.style.cursor = "pointer";
			
		
		self.setLabel = function (value)
		{
		};
		
		self.setSource = function (value)
		{
			if (value.indexOf('.png') != -1 && browserType=="ie")
			{
				self.input.src = jsimages_path +"blank.gif";
				self.input.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+value +"',sizingMethod='scale')";
			}
			else
			{
				self.input.src = value;
			}
		};
		
		//This has to come after setting input.type, or IE will hang
		self.buildObject();
		
		//returns a pointer to itself	    
		return self;
	};