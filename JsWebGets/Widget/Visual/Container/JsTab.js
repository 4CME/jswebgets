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
	JsTab = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsTab";

		self.tabrow = document.createElement("div");
		self.tabrow.js_parent = self.js_parent;
		self.stack = new JsWidgetStack();
		self.stack.js_parent = self.js_parent;

		self.style.position = "relative";
		self.style.width = "100%";
		self.tabrow.className = "jstabrow";
		self.tabrow.style.width = "100%";
		self.tabrow.style.height = 14;
		self.tabrow.style.zIndex = 2;
		self.tabrow.style.top = 0;
		self.stack.className = "jstabsstack";
		self.stack.style.position = "absolute";
		self.stack.style.whiteSpace = "nowrap";
		self.stack.style.overflow = "auto";
		self.stack.style.clear = "both";
		if (browserType=="ie")
		{
			self.stack.style.height = "100%";
			self.stack.style.width = "100%";
		}
		else
		{
			self.stack.style.height = "";
			self.stack.style.width = "";
			self.stack.style.top = 24;
			self.stack.style.bottom = 0;
			self.stack.style.right = 0;
			self.stack.style.left = 0;
		}


		self.appendChild(self.tabrow);
		self.appendChild(self.stack);

		self.addTab = function(value, jscallback)
		{
			//var tabcell = document.createElement("div");
			var tabcell = new JsLabel();
			tabcell.js_parent = self.js_parent;

			if (browserType=="ie")
				tabcell.style.height = 24;
			else 
				tabcell.style.height = 14;
			tabcell.style.width = "";
			tabcell.style.position = "relative";
			tabcell.style.display = "inline";

			tabcell.label.style.width = "";
			tabcell.parentWidget = self;
			tabcell.label.parentWidget = self;

			if (browserType=="ie")
				tabcell.style.styleFloat = "left";
			else 
				tabcell.style.cssFloat = "left";

			if (self.tabrow.childNodes.length > 0)
			{
				tabcell.className = "jstabcell_notselected";
				tabcell.style.top = 3;
				tabcell.style.padding = "2px 6px 3px 7px";
			}
			else
			{
				tabcell.className = "jstabcell_selected";
				tabcell.style.top = 0;
				tabcell.style.padding = "2px 6px 5px 7px";
			}

			//tabcell.innerHTML = value;
			tabcell.setValue(value);

			if (jscallback)
				tabcell.setEvent("click",jscallback);

			tabcell.index = self.tabrow.childNodes.length;

			self.tabrow.appendChild(tabcell);
			self.stack.addStack();

			/*
			if (browserType=="ie")
			{
				tabcell.attachEvent("onclick", self.showTab);
			}
			else
			{
				tabcell.addEventListener("click", self.showTab, false);
			}
			*/
			tabcell.setEvent("click", self.showTab);
		};

		self.delTab = function(tab_index)
		{
			self.tabrow.removeChild(self.tabrow.childNodes[tab_index]);
		};

		self.addItem = function(obj)
		{
			self.stack.addItem(obj);
			obj.js_parent_container = self;
		};

		self.addItemToTab = function(obj,tab_index)
		{
			self.stack.addItemToStack(obj,tab_index);
			obj.js_parent_container = self;
		};

		self.delItem = function(obj)
		{
			self.stack.delItem(obj);
		};

		self.showTab = function(e)
		{
			if (e.type == "click")
			{
				if (browserType == "ie")
				{
					e = window.event;
					obj = e.srcElement;
				}
				else
				{
					obj = e.target;
				}
				if (obj.js_parent != self)
					obj = obj.js_parent;
			}
			else
			{
				var obj = self.tabrow.childNodes[e];
			}

			for (var js_i=0; js_i < self.tabrow.childNodes.length; js_i++)
			{
				self.tabrow.childNodes[js_i].className = "jstabcell_notselected";
				self.tabrow.childNodes[js_i].style.top = 3;
				self.tabrow.childNodes[js_i].style.padding = "2px 6px 3px 7px";
			}

			if (obj.nodeType == 3)
			{
				obj.parentNode.className = "jstabcell_selected";
				obj.parentNode.style.top = 0;
				obj.parentNode.style.padding = "2px 6px 5px 7px";

				index = obj.parentNode.index;
			}
			else
			{
				obj.className = "jstabcell_selected";
				obj.style.top = 0;
				obj.style.padding = "2px 6px 5px 7px";
				index = obj.index;
			}

			self.stack.showStack(index);
		};

		self.setHeight = function(value)
		{
			self.style.height = value;
		};

		self.setWidth = function(value)
		{
			self.style.width = value;
		};

		return self;
	};