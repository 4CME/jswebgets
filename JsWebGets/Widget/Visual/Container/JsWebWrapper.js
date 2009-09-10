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
	JsWebWrapper = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsWebWrapper";

		self.iframe = document.createElement("iframe");
		self.appendChild(self.iframe);
		self.iframe.name = "iframe_" + name;
		self.iframe.id = "iframe_" + name;
		self.iframe.style.width = "100%";
		self.iframe.style.height = "100%";

		self.setPage = function(value)
		{
			self.iframe.src	= value;
		};

		self.disable = function(value)
		{
			if (value)
			{
				self.removeChild(self.iframe);
				self.style.border = "1px solid #666666";
				self.style.backgroundColor = "#CCCCCC";
			}
			else
			{
				self.appendChild(self.iframe);
				self.style.border = "";
				self.style.backgroundColor = "";
			}
		};

		self.readOnly = function(value)
		{
			self.disable(value);
		};

		return self;
	};