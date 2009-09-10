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
	JsLineEdit = function (name)
	{
		//sets itself as a div
		var self = new JsInput(name);

		self.type = "JsLineEdit";

		self.input.type = "text";
		self.input.style.width = "100%";
		self.style.width = "100%";

		self.fix = function(){return true;};

		self.setEvent("focus",enableSelection);
		self.setEvent("mouseover",enableSelection);
		self.setEvent("blur",disableSelection);
		self.setEvent("mouseout",disableSelection);
		self.setEvent("click",function(){self.input.focus();});
		self.setEvent("keypress",self.fix);

		self.input.getValue = function ()
		{
			return this.parentNode.getValue();
		};

		self.setMaxLength = function (value)
		{
			self.input.maxLength = value;
		};

		self.setPassword = function()
		{
			self.removeChild(self.input);
			self.input = document.createElement("input");
			self.input.type = "password";
			self.input.style.width = "100%";

			self.setEvent("focus",enableSelection);
			self.setEvent("mouseover",enableSelection);
			self.setEvent("blur",disableSelection);
			self.setEvent("mouseout",disableSelection);
			self.setEvent("click",function(){self.input.focus();});

			for (var js_i in self.events)
			{
				self.addEvent(js_i);
			}


			self.buildObject();
		};

		//Check if input is a real number
		self.setNumeric = function ()
		{
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

				//if (browserType=="ie" && self.input.value.length < 15)
				//	self.input.value += newvalue;
			});
		};

		//Check if input is a float number
		self.setFloat = function ()
		{
			self.setEvent("keypress",function(jsEvent)
			{
				var newvalue = "";
				if (browserType == "ie")
				{
					if (isNaN(String.fromCharCode(jsEvent.keyCode)) && String.fromCharCode(jsEvent.keyCode) != ".")
						jsEvent.returnValue = false;
					else
						newvalue = String.fromCharCode(jsEvent.keyCode);
				}
				else
				{
					if (isNaN(String.fromCharCode(jsEvent.charCode)) && String.fromCharCode(jsEvent.charCode) != "." && (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39))
					{
						jsEvent.preventDefault();
					}
				};

				if (self.input.value.indexOf(".") != -1)
				{
					if (browserType == "ie"  && String.fromCharCode(jsEvent.keyCode)==".") jsEvent.returnValue = false;
					else if (String.fromCharCode(jsEvent.charCode)==".") jsEvent.preventDefault();
				}


				//if (browserType=="ie" && self.input.value.length < 15)
				//	self.input.value += newvalue;
			});
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};