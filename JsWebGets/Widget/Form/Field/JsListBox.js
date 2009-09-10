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
	JsListBox = function (name)
	{
		//sets itself as a div
		var self = new JsComboBox(name);

		if (browserType=="ie")
		{
			self.removeChild(self.input);
			self.input = document.createElement("<SELECT MULTIPLE>");
		}

		self.input.js_parent = self.js_parent;

		//self.input.onclick = function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus();};
		self.onmousedown = function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus();};
		self.input.onmousedown = function (){if (!self.input.disabled && !self.input.readOnly)self.input.focus();};
		self.setEvent("click",function(){self.input.focus();});

		self.type = "JsListBox";

		self.input.multiple = true;

		self.input.className = "jslistbox";
		self.input.style.width = 200;
		self.input.style.height = 100;
		self.style.width = 200;
		self.style.height = 100;

		self.disablediv.style.height = 100;

		self.resetSelecteds = function ()
		{
			for(var js_i=0;js_i<self.input.options.length;js_i++)
			{
				self.input.options[js_i].selected = false;
			}
		};

		self.getValue = function ()
		{
			var tmp_arr = new Array();
			for(var js_i=0;js_i<self.input.options.length;js_i++)
			{
				if (self.input.options[js_i].selected)
				{
					index = tmp_arr.length;
					tmp_arr[index] = new Array();
					tmp_arr[index][0] = self.input.options[js_i].value;
					tmp_arr[index][1] = self.input.options[js_i].text;
				}
			}
			return tmp_arr;
		};

		self.getAllValues = function ()
		{
			var tmp_arr = new Array();
			for(var js_i=0;js_i<self.input.options.length;js_i++)
			{
				tmp_arr[js_i] = new Array();
				tmp_arr[js_i][0] = self.input.options[js_i].value;
				tmp_arr[js_i][1] = self.input.options[js_i].text;
			}
			return tmp_arr;
		};

		self.delItem = function(index)
		{
			obj = self.input.removeChild(self.input.options[index]);
			delete obj;
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		//returns a pointer to itself
		return self;
	};