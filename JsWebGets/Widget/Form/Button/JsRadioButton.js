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
	JsRadioButton = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsRadioButton";

		self.orientation = "v";

		self.setOrientation = function (value)
		{
			self.orientation = value;
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.orientation == "h")
				{
					self.childNodes[js_i].className = "jsradiohorizontal";

					if (browserType=="ie")
						self.childNodes[js_i].style.styleFloat = "left";
					else
						self.childNodes[js_i].style.cssFloat = "left";
				}
				else
				{
					self.childNodes[js_i].className = "";

					if (browserType=="ie")
						self.childNodes[js_i].style.styleFloat = "";
					else
						self.childNodes[js_i].style.cssFloat = "";
				}
			}
		};

		self.getValue = function (value)
		{
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.childNodes[js_i].input.checked)
				{
					return self.childNodes[js_i].input.value;
				}
			}
		};

		self.getLabel = function ()
		{
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.childNodes[js_i].input.checked)
				{
					return self.childNodes[js_i].label.innerHTML;
				}
			}
		};

		self.getLabelForValue = function (value)
		{
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.childNodes[js_i].input.value == value)
				{
					return self.childNodes[js_i].label.innerHTML;
				}
			}

			return "";
		};

		self.setValue = function (value)
		{
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.childNodes[js_i].input.value == value)
				{
					self.childNodes[js_i].input.defaultChecked = true;
					self.childNodes[js_i].input.checked = true;
				}
				else
				{
					self.childNodes[js_i].input.defaultChecked = false;
					self.childNodes[js_i].input.checked = false;
				}
			}
		};

		self.setMenu = function(obj)
		{
			self.menu = obj;
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				if (self.childNodes[js_i].input)
				{
					self.childNodes[js_i].input.menu = obj;
					self.childNodes[js_i].label.menu = obj;
				}
			};
			self.setEvent("contextmenu",obj.showContextMenu);
		};

		self.addItem = function (value, label, selected)
		{
			var newjs_radio = eval (self.name + "_radio = new JsRadioButtonItem('" +self.name + "_radio', value, label, selected)");

			if (self.orientation == "h")
			{
				newjs_radio.className = "jsradiohorizontal";
				newjs_radio.style.paddingRight = 10;
				if (browserType=="ie")
					newjs_radio.style.styleFloat = "left";
				else
					newjs_radio.style.cssFloat = "left";
			}

			newjs_radio.style.whiteSpace = "nowrap";

			for (var js_i in self.events)
			{
				for	(var js_j in self.events[js_i])
				{
					if (browserType == "ie")
					{
						newjs_radio.input.attachEvent("on" + js_i, self.events[js_i][js_j]);
					}
					else
					{
						newjs_radio.input.addEventListener(js_i, self.events[js_i][js_j], false);
					}
				}
			}

			self.appendChild(newjs_radio);

			newjs_radio.js_parent = self.js_parent;
			newjs_radio.input.js_parent = self;
			newjs_radio.label.js_parent = self;

			if (self.orientation == "v")
			{
				if (browserType=="ie")
					var correction_factor = 20;
				else 
					var correction_factor = 19;

				if (isNaN(parseInt(self.style.height)))
					self.style.height = correction_factor;
				else 
					self.style.height = parseInt(self.style.height) + correction_factor;
			}
		};

		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.attachEvent("on" + eventStr, self.execEvent);
				for (var js_i = 0; js_i < self.childNodes.length; js_i++)
				{
					if (self.childNodes[js_i].input)
					{
						self.childNodes[js_i].input.attachEvent("on" + eventStr, self.execEvent);
						self.childNodes[js_i].label.attachEvent("on" + eventStr, self.execEvent);
						self.childNodes[js_i].attachEvent("on" + eventStr, self.execEvent);
					}
				}
			}
			else
			{
				self.addEventListener(eventStr, self.execEvent, false);
				for (var js_i = 0; js_i < self.childNodes.length; js_i++)
				{
					if (self.childNodes[js_i].input)
					{
						self.childNodes[js_i].input.addEventListener(eventStr, self.execEvent, false);
						self.childNodes[js_i].label.addEventListener(eventStr, self.execEvent, false);
						self.childNodes[js_i].addEventListener(eventStr, self.execEvent, false);
					}
				}
			}
		};

		self.disable = function (value)
		{
			for (var js_i = 0; js_i < self.childNodes.length; js_i++)
			{
				self.childNodes[js_i].disable(value);
				if (value)
					self.childNodes[js_i].label.htmlFor = null;
				else
					self.childNodes[js_i].label.htmlFor = self.childNodes[js_i].input.id;
			}
		};

		//returns a pointer to itself
		return self;
	};