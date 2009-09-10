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
	JsSpinBox = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);

		self.type = "JsSpinBox";

		self.bts = document.createElement("div");
		self.upbt = document.createElement("input");
		self.dwbt = document.createElement("input");

		self.upbt.js_parent = self.js_parent;
		self.dwbt.js_parent = self.js_parent;

		self.input.className = "spinboxinput";
		self.bts.className = "spinboxbts";

		if (browserType=="ie")
		{
			self.input.style.styleFloat = "left";
			self.bts.style.styleFloat = "left";
		}
		else
		{
			self.input.style.cssFloat = "left";
			self.bts.style.cssFloat = "left";
		}

		self.bts.style.height = 14;
		self.bts.style.width = 14;

		self.input.value = 0;

		self.increaseFactor = 10;

		self.upbt.type = "image";
		self.dwbt.type = "image";

		self.upbt.src=jsimages_path + "up_bt.gif";
		self.dwbt.src=jsimages_path + "down_bt.gif";

		self.style.width = 114;

		self.input.style.width = 100;
		self.input.maxLength = 15;

		//Allow Only Numbers IP while typing
		self.setEvent("keypress",function(jsEvent)
		{
			var newvalue = "";
			if (browserType == "ie")
			{
				if (isNaN(String.fromCharCode(jsEvent.keyCode)))
					jsEvent.returnValue = false;
				else
					newvalue = String.fromCharCode(jsEvent.keyCode);
			}
			else
			{
				if (isNaN(String.fromCharCode(jsEvent.charCode)) && (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39))
					jsEvent.preventDefault();
			};

			if (browserType=="ie" && self.input.value.length < 15)
				self.input.value += newvalue;
		});

		self.setRaiseFactor = function(value)
		{
			self.upbt.increaseFactor = value;
			self.dwbt.increaseFactor = value;
		};

		self.upbt.onclick = function ()
		{
			self.setValue(parseInt(self.input.value) + parseInt(self.increaseFactor));
		};

		self.dwbt.onclick = function (e)
		{
			self.setValue(parseInt(self.input.value) - parseInt(self.increaseFactor));
		};

		self.setHeight = function(value)
		{
			self.style.height = value;
			self.input.style.height = value - 15;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
			self.input.style.width = value - 15;
		};

		self.disable = function(value)
		{
			self.upbt.disabled = value;
			self.dwbt.disabled = value;

			if (value)
			{
				for (var js_i in self.events)
				{
					self.delEvent(js_i);
					self.setEvent(js_i,self.disabledWidget);
				}
				self.setEvent("click",self.disabledWidget);
			}
			else
			{
				for (var js_i in self.events)
				{
					self.unsetEvent(js_i,self.disabledWidget);
					self.addEvent(js_i);
				}
				self.unsetEvent("click",self.disabledWidget);
			}
		};

		self.buildObject = function ()
		{
			self.appendChild(self.input);
			self.appendChild(self.bts);
			self.bts.appendChild(self.upbt);
			self.bts.appendChild(document.createElement("br"));
			self.bts.appendChild(self.dwbt);
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};