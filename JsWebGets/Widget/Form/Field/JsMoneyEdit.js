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
	
	//M�rio C�sar Gasparini Nascimento!
	//buggy on IE, fixed by Pablo Santiago S�nchez ;-)
	JsMoneyEdit = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);
		
		self.type = "JsMoneyEdit";
		
		self.input.style.width = 100;
		self.style.width = 100;
	
		self.setMask = function(keyvalue)
		{
			if (!isNaN(keyvalue) || !keyvalue)
			{
				var str = self.input.value;
				
				if (!str && !keyvalue)
					str = "0,00";
				
				if (isNaN(str) && str.indexOf(",") != -1)
					str = str.replace(",","");
				else
					str += "";
				
				while (str.indexOf(".") != -1)
					str = str.replace(".","");
					
				if (keyvalue)
					str += keyvalue;
				
				if (str.length >= 3)
					while (str.charAt(0) == "0")
						str = str.slice(1,str.length);
				
				while(str.length < 3)
					str = "0" + str;
				
				var temp_arr = new Array();
				
				for (var js_i=0;js_i<str.length;js_i++)
					temp_arr[js_i] = str.slice(js_i,(js_i+1));
				
				var decimal = "";
				
				if (temp_arr[temp_arr.length - 2])
					decimal = temp_arr[temp_arr.length - 2];
				if (temp_arr[temp_arr.length - 1])
					 decimal += "" + temp_arr[temp_arr.length - 1];
				
				str = "";
				temp_arr = temp_arr.reverse();
				var temp_arr2 = new Array();
				
				var js_j=1;
				var js_x=0;
				for (var js_i=2;js_i<temp_arr.length;js_i++)
				{
					temp_arr2[js_i + js_x] = temp_arr[js_i];
					if (js_j==3)
					{
						js_j=0;
						if ((temp_arr.length + js_x)>temp_arr2.length)
							temp_arr2[js_i + js_x + 1]=".";
						js_x+=2;
					}
					js_j++;
				}
				
				temp_arr2 = temp_arr2.reverse();
				str = temp_arr2.join("");
				
				if (temp_arr.length>2)
					str = str + "," + decimal;
				else 
					str += "" + decimal;
						
				self.input.value = str;
			}
			
			if (jsEvent)
			{
				if (browserType == "ie")
				{
					jsEvent.returnValue = false;
				}
			}
		};

		//Format Money while typing
		if (browserType == "ie")
			self.setEvent("keypress",function(jsEvent)
			{
				var newvalue = "";
				
				if (isNaN(String.fromCharCode(jsEvent.keyCode)))
					jsEvent.returnValue = false;
				else 
					newvalue = String.fromCharCode(jsEvent.keyCode);
				
				if (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39 && jsEvent.keyCode != 36 && jsEvent.keyCode != 35)
					self.setMask(newvalue);
			});
		else
			self.setEvent("keyup",function(jsEvent)
			{
				if (isNaN(String.fromCharCode(jsEvent.charCode)) && (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39 && jsEvent.keyCode != 36 && jsEvent.keyCode != 35))
					jsEvent.preventDefault();
				
				if (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39 && jsEvent.keyCode != 36 && jsEvent.keyCode != 35)
					self.setMask();
			});
		
		self.getValue = function()
		{
			var str = self.input.value;
			while (str.indexOf(".") != -1)
			{
				str = str.replace(".","");
			}
			str = str.replace(",",".");
			return parseFloat(str);
		};
		
		self.setValue = function(value)
		{
			jsEvent = null;
			if (value)
			{
				if (parseInt(value) == parseFloat(value))
					value += "00";
				else
				{
					value += "";
					if (value.indexOf(".") == value.length - 2)
						value += 0;
				}
				self.input.value = value;
			}
			else 
				self.input.value = "";
				
				self.setMask();
		};
		
		//This has to come after setting input.type, or IE will hang
		self.buildObject();
		
		return self;
	};