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
	JsFieldSet = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsFieldSet";

		self.fieldset = document.createElement("fieldset");
		self.fieldsetdiv = document.createElement("div");
		self.legend = document.createElement("legend");
		self.legendlabel = new JsLabel();

		self.fieldset.js_parent = self.js_parent;
		self.fieldsetdiv.js_parent = self.js_parent;
		self.legend.js_parent = self.js_parent;
		self.legendlabel.js_parent = self.js_parent;
		self.legendlabel.label.js_parent = self.js_parent;
		if (self.legendlabel.icon)
			self.legendlabel.icon.js_parent = self.js_parent;

		self.fieldset.type = "JsFieldSetDiv";

		self.fieldsetdiv.style.position = "absolute";
		if (browserType=="ie")
			self.fieldsetdiv.style.top = 15;

		self.legend.appendChild(self.legendlabel);
		self.fieldset.appendChild(self.legend);
		self.fieldset.appendChild(self.fieldsetdiv);
		self.appendChild(self.fieldset);
		self.fieldset.style.position = "relative";

		self.legendlabel.onselectstart = new Function ("return false");
		self.legendlabel.onmousedown = new Function ("return false");

		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.fieldset.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				self.fieldset.addEventListener(eventStr, self.execEvent, false);
			}
		};


		self.setHeight = function(value)
		{
			self.style.height = value;
			if (browserType=="ie")
			{
				self.fieldset.style.height = value;
				self.fieldsetdiv.style.height = value -15;
			}
			else
			{
				self.fieldset.style.height = value -17;
				self.fieldsetdiv.style.height = value -30;
			}
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
		};

		self.setLegend = function(value)
		{
			self.legendlabel.setValue(value);
		};

		self.setIcon = function(img_src)
		{
			self.legendlabel.setIcon(img_src);
		};

		self.addItem = function(obj)
		{
			self.fieldsetdiv.appendChild(obj);
			obj.js_parent_container = self;
		};

		self.delItem = function(obj)
		{
			self.fieldsetdiv.removeChild(obj);
			delete obj;
		};

		return self;
	};