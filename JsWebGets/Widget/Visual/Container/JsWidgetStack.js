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
	JsWidgetStack = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsWidgetStack";

		self.className = "jsstack";
		self.style.position = "relative";
		self.style.width = "100%";
		self.style.height = "100%";
		self.style.padding = 0;

		self.stack_index = 0;

		self.addStack = function()
		{
			var stack = document.createElement("div");
			stack.className = "jsstackdiv";
			stack.style.position = "absolute";
			stack.style.padding = 0;
			stack.style.width = "100%";
			stack.style.height = "100%";

			stack.js_parent = self.js_parent;

			index = self.childNodes.length;

			if (index == 0)
			{
				stack.style.visibility = "visible";
				stack.style.display = "block";
			}
			else
			{
				stack.style.visibility = "hidden";
				stack.style.display = "none";
			}

			self.stack_index = index;

			self.appendChild(stack);
		};

		self.delStack = function(index)
		{
			self.removeChild(self.childNodes[index]);
		};

		self.showStack = function(index)
		{
			var index;

			self.stack_index = index;

			if (self.childNodes[index])
			{
				for (var js_i in self.childNodes)
				{
					if (self.childNodes[js_i].style)
					{
						self.childNodes[js_i].style.visibility = "hidden";
						self.childNodes[js_i].style.display = "none";
					}
				}

				self.childNodes[index].style.visibility = "visible";
				self.childNodes[index].style.display = "block";
			}
		};

		self.addItem = function(obj)
		{
			self.childNodes[self.stack_index].appendChild(obj);
			obj.js_parent_container = self;
			obj.js_parent_stack = self.stack_index;
		};

		self.delItem = function(obj)
		{
			obj.parentNode.removeChild(obj);
		};

		self.addItemToStack = function(obj, stack_index)
		{
			self.childNodes[stack_index].appendChild(obj);
			obj.js_parent_container = self;
			obj.js_parent_stack = stack_index;
		};

		return self;
	};