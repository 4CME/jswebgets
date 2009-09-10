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
	JsComboBox = function (name)
	{
		//sets itself as a div
		var self = new JsInput(name);

		self.type = "JsComboBox";

		self.input = document.createElement("select");
		self.input.js_parent = self;

		self.ordered = false;

		self.style.overflow = "visible";
		self.widgetcorner.style.bottom = "-10px";
		self.widgetcorner.style.right = "-10px";

		self.input.style.width = 120;
		self.style.width = 120;

		self.input.onselectstart = null;

		self.disablediv = new JsWidget();
		self.disablediv.js_parent = self;

		self.disablediv.style.backgroundColor = "#000000";
		self.disablediv.style.position = "absolute";
		self.disablediv.style.top = 0;
		self.disablediv.style.left = 0;
		self.disablediv.style.width = "100%";
		self.disablediv.style.height = 22;

		if (browserType=="ie")
			self.disablediv.style.filter = "alpha(opacity=25)";
		else
		{
			self.disablediv.style.opacity = "0.25";
			self.disablediv.style.mozOpacity = "0.25";
		}

		if (browserType=="ie")
		{
			self.onmousedown = "";//function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus()};
			self.input.onmousedown = "";//function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus()};
		}

		self.input.className = "jscombobox";

		self.setOrdered = function(value)
		{
			self.ordered = value;
		};

		self.order = function(a,b)
		{
			var value_a = a[0];
			var value_b = b[0];

			if (value_a > value_b)
				return 1;
			else
				return -1;

			return 0;
		};

		self.addItem = function (value, label, icon, selected)
		{
			//infortunatelly, icon has been discontinued, due
			//performance issues. When people learn how to make
			//light browsers, we may get it back on JsObjects v 3.0
			//kept on the arguments for back-compatibility
			var icon = null;
			var label;
			var value;
			var selected;

			if (!label)
				label = value;

			if (browserType=="ie")
			{
				var obj = new Option();
				self.input.add(obj);
				obj.innerText = label;
				obj.value = value;
				obj.selected = selected;
			}
			else
			{
				var obj = new Option(label,value,false,selected);
				self.input.appendChild(obj);
			}

			if (self.ordered)
			{
				var arr = new Array();
				for (var js_i=0; js_i<self.input.childNodes.length; js_i++)
				{
					arr[js_i] = new Array();
					arr[js_i][0] = self.input.childNodes[js_i].innerHTML;
					arr[js_i][1] = self.input.childNodes[js_i];
				}

				arr.sort(self.order);

				for (var js_i=0; js_i<arr.length; js_i++)
				{
					self.input.appendChild(arr[js_i][1]);
				}
			}

			obj.js_parent = self.js_parent;
		};

		self.clearData = function ()
		{
			self.input.innerHTML = "";
		};

		self.getValue = function ()
		{
			var js_i = self.input.selectedIndex;
			if (js_i >=0)
				return self.input.options[js_i].value;
			else 
				return null;
		};

		self.getLabel = function ()
		{
			var js_i = self.input.selectedIndex;
			return self.input.options[js_i].text;
		};

		self.setValue = function (value)
		{
			self.input.value = value;
		};

		self.disable = function (value)
		{
			self.input.disabled = value;
			if (value && self.style.position == "absolute")
				self.appendChild(self.disablediv);
			else if(self.disablediv.parentNode == self)
				self.removeChild(self.disablediv);
		};

		self.setMovable = function(jscallback)
		{
			if (jscallback)
				self.jscallback = jscallback;

			self.setEvent("mousedown",self.move);
			self.disablediv.setEvent("mousedown",self.move);

			//if it's a complete click, it's not a drag, so I must reset the jsDragged var
			self.setEvent("click", function ()
			{
				jsMoved = null;
				return false;
			});
		};

		self.unsetMovable = function()
		{
			self.unsetEvent("mousedown",self.move);
			self.disablediv.unsetEvent("mousedown",self.move);
		};

		/********************************************
		Visual Methods
		********************************************/

		self.setHeight = function(value)
		{
			self.style.height = value;
			self.input.style.height = value;
			self.disablediv.style.height = value;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
			self.input.style.width = value;
			self.disablediv.style.width = value;
		};

		self.setClass = function(value)
		{
			self.input.className = value;
		};

		/********************************************
		Visual Methods
		********************************************/

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		//returns a pointer to itself
		return self;
	};