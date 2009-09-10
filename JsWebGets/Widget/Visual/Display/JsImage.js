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
	JsImage = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);
		
		self.type = "JsImage";
		
		self.img = document.createElement("img");
		self.img.js_parent = self.js_parent;
		self.img.src = jsimages_path+"images/blank.gif";
		self.appendChild(self.img);
		
		self.onmousedown = new Function ("return false");
		self.img.ondragstart = new Function ("return false");
		
		self.setSource = function(value)
		{
			if (value.indexOf('.png') != -1 && browserType=="ie")
			{
				self.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+value +"',sizingMethod='scale')";
				self.img.src = jsimages_path +'blank.gif';
			}
			else
			{
				self.img.src = value;
			}
		};
		
		self.setHeight = function(value)
		{
			self.style.height = value;
			self.img.style.height = value;
		};
		
		self.setWidth = function(value)
		{
			self.style.width = value;
			self.img.style.width = value;
		};
				
		return self;
	};