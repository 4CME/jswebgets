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
	JsToolTip = function ()
	{
		//sets itself as a div
		var self = new JsWidget();

		self.type = "JsToolTip";

		self.className = "jstooltip";

		self.style.top	= 0;
		self.style.left	= 0;
		self.style.position	= "absolute";
		self.style.visibility = "hidden";
		self.style.display = "none";
		self.style.zIndex=100000000000000000;

		self.setValue = function (value)
		{
			self.value = value;

			value = value.replace(/\n/gi, "<br>");

			self.innerHTML = value.replace("\n", "<br>");
		};

		self.getValue = function ()
		{
			return self.value;
		};

		return self;
	};

	function showToolTip(jsEvent)
	{
		if (browserType == "ie")
		{
			w = jsEvent.clientX;
			h = jsEvent.clientY;
		}
		else
		{
			w = jsEvent.pageX;
			h = jsEvent.pageY;
		}

		h +=20;

		jstooltip_obj = jsTarget.jstooltip;

		jstooltip_obj.style.visibility = "visible";
		jstooltip_obj.style.display = "block";
		jstooltip_obj.style.top = h;
		jstooltip_obj.style.left = w;

		document.body.appendChild(jstooltip_obj);

	}

	function hideToolTip(jsEvent)
	{
		jstooltip_obj = jsTarget.jstooltip;

		jstooltip_obj.style.visibility = "hidden";
		jstooltip_obj.style.display = "none";
	}

