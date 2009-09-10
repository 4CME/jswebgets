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
	JsIPEdit = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);
		
		self.type = "JsIPEdit";
		
		self.input.style.width = 110;
		self.style.width = 110;
		self.input.maxLength = 15;
		
		//Formats IP while typing
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
				if ((isNaN(String.fromCharCode(jsEvent.charCode)) && isNaN(String.fromCharCode(jsEvent.charCode) != ".")) && (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39))
					jsEvent.preventDefault();
			};
			
			//if (browserType=="ie" && self.input.value.length < 15)
			//	self.input.value += newvalue;
		});
		
		//validades IP input
		self.setEvent("blur",function()
		{
			var value = obj.getValue();		
		});
		
		
		self.validateIP = function(value)
		{
			if (!value || value.type)
				var value = self.getValue();
				
			if (value)
			{
				var octets = value.split(".");
				
				var jsip_ok = true;
				
				if(octets.length != 4)
					jsip_ok = false;
				
				if (octets[0] == "" || octets[0] < 0 || octets[0] > [255])
					jsip_ok = false;
				if (octets[1] == "" || octets[1] < 0 || octets[1] > [255])
					jsip_ok = false;
				if (octets[2] == "" || octets[2] < 0 || octets[2] > [255])
					jsip_ok = false;
				if (octets[3] == "" || octets[3] < 0 || octets[3] > [255])
					jsip_ok = false;
				
				if (!jsip_ok)
				{
					alert(translation[lang]["error"][4]);
					return false;
				}
			}
			
			return true;
		};
		
		//Validates CPF on blur
		self.setEvent("blur",self.validateIP);
		
		self.getValue = function()
		{
			return self.input.value;
		};
		
		self.setValue = function(value)
		{
			if (self.validateIP(value) && value)
			{
				self.input.value = value;
			}
			else 
				self.input.value = "";
		};
		
		//This has to come after setting input.type, or IE will hang
		self.buildObject();
		
		return self;
	};