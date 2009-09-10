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
	JsMenuItem = function (name)
	{
		//sets itself as a div
		var self = new JsLabel(name);

		self.type = "JsMenuItem";

		self.style.height = 24;
		self.style.position = "relative";

		self.setIcon(jsimages_path + "blank.gif");
		self.icon.style.height = "16";
		self.icon.style.width = "16";
		self.icon.style.top = "4";
		self.icon.style.left = "4";
		self.label.style.width = "";
		self.label.style.top = "5";
		self.label.style.left = "5";
		self.style.whiteSpace = "nowrap";

		self.className = "jsmenuitem";

		self.setAsSubMenu = function()
		{
			self.arrow = document.createElement("img");
			self.arrow.js_parent = self.js_parent;
			self.arrow.style.height = "7";
			self.arrow.style.width = "4";
			self.arrow.style.position = "absolute";
			if (browserType=="ie")
				self.arrow.style.top = "10";
			else
				self.arrow.style.top = "8";
			self.arrow.style.right = "5";
			self.arrow.style.align = "right";
			self.arrow.src=jsimages_path + "left_arrow.gif";
			self.appendChild(self.arrow);
		};

		self.setItemMouseOver = function (jsEvent)
		{
			if (self.parentNode.type == "JsMenuBar")
			{
				self.className = "jsmenubaritemover";
				if (showmenus)
				{
					self.menu.showBarMenu(jsEvent);
				};
			}
			else
				self.className = "jsmenuitemover";
		};

		self.setItemMouseOut = function (jsEvent)
		{
			if (self.parentNode.type == "JsMenuBar")
				self.className = "jsmenubaritem";
			else
				self.className = "jsmenuitem";
		};

		self.setResizable = function()
		{
		};

		self.unsetResizable = function()
		{
		};

		self.setEvent("mouseover",self.setItemMouseOver);
		self.setEvent("mouseout",self.setItemMouseOut);

		return self;
	};