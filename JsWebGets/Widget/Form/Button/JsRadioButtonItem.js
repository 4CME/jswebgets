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
	JsRadioButtonItem = function (name, value, label, selected)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsRadioButtonItem";

		self.name = name;

		var radio_id = randomizer();

		input_name = "js_input_" + self.name;

		if (browserType == "ie")
		{
			self.input = document.createElement("<input type='radio' name='" + input_name + "' id='" + radio_id + "' >");
		}
		else
		{
			self.input = document.createElement("input");
			self.input.name = "js_input_" + self.name;
			self.input.id = radio_id;
			self.input.type = "radio";
		}

		if (selected)
			self.input.defaultChecked = true;

		self.label = document.createElement("label");
		self.label.htmlFor = radio_id;
		self.label.style.position = "relative";
		if (browserType=="ie")
			self.label.style.top = -2;
		else
		{
			self.label.style.left = -1;
			self.label.style.top = -3;
		}
		self.input.style.position = "relative";
		self.input.style.top = 0;

		self.label.onmousedown = new Function ("return false");
		self.label.onselectstart = new Function ("return false");

		self.input.js_parent = self.js_parent;
		self.label.js_parent = self.js_parent;

		self.input.value = value;

		if (!label)
			label = value;

		self.setLabel = function (value)
		{
			self.label.innerHTML = value;
		};

		if (label)
			self.setLabel(label);

		self.getValue = function ()
		{
			if (!self.input.checked)
			{
				return false;
			}
			else
			{
				return self.input.value;
			}
		};

		self.input.getValue = function ()
		{
			return this.parentNode.getValue();
		};

		self.label.getValue = function ()
		{
			return this.parentNode.getValue();
		};

		if (browserType=="ie")
		{
			self.input.attachEvent("onclick",
				function ()
				{
					if (!self.input.disabled)
						self.parentNode.setValue(self.input.value);
				}
			);
			self.label.attachEvent("onclick",
				function ()
				{
					if (!self.input.disabled)
						self.parentNode.setValue(self.input.value);
				}
			);
		};

		//had to do this, because this function must be called as last
		//on internet explorer (error if you try to change type after
		//appending it to another object
		self.buildObject = function ()
		{
			self.appendChild(self.input);
			self.appendChild(self.label);
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		//returns a pointer to itself
		return self;
	};