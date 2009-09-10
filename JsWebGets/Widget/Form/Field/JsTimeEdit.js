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
	JsTimeEdit = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);
		
		self.type = "JsTimeEdit";
		
		self.input.style.width = 45;
		self.style.width = 45;
		self.input.maxLength = 5;
		
		self.setMask = function(newvalue)
		{
			//if (browserType=="ie" && self.input.value.length < 18)
			//	self.input.value += newvalue;
				
			str = self.input.value.replace(":","");

			part1 = str.substr(0,2);
			part2 = str.substr(2,2);
			
			str = part1;
			if (str.length == 2)
				str += ":" + part2;
			
			self.input.value = str;
		};
		
		//Formats time while typing
		self.setEvent("keypress",function (jsEvent)
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
			
			if (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39)
				self.setMask(newvalue);
		});
		
		self.validateTime = function(time)
		{
			if (!time || time.type)
				var value = self.getValue();
			else 
				var value = time + "";
				
			if (value)
			{
				
				var jsdate_ok = false;
				
				if (value.search(":") != -1)
				{
					value = value.split(":");
					var js_hour = value[0];
					var js_minute = value[1];
					
					if (js_hour >= 0 && js_hour <=23)
					{
						if (js_minute >= 0 && js_minute <= 59)
						{
							jsdate_ok = true;
						};
					};
				};
				
				if (!jsdate_ok)
				{
					alert(translation[lang]["error"][8]);
					return false;
				};
				
				if (js_hour.length < 2)
					js_hour = "0" +js_minute;
				
				if (js_minute.length < 2)
					js_minute = "0" +js_minute;
				
				self.input.value = js_hour + ":" + js_minute;
			}
			
			return true;
		};
		
		//validates time input
		self.setEvent("blur",self.validateTime);
		
		self.getValue = function()
		{
			return self.input.value;
		};
		
		self.input.getValue = function ()
		{
			return this.parentNode.getValue();
		};
		
		self.setValue = function(value)
		{
			if (value != '')
			{
				self.validateTime(value);
			}
			else
			{
				self.input.value = '';
			}
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};