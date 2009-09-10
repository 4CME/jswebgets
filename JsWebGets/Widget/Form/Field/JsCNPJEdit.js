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
	JsCNPJEdit = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);

		self.type = "JsCNPJEdit";

		self.input.maxLength = 18;
		self.input.style.width = 120;
		self.style.width = 120;

		self.setMask = function(newvalue)
		{
			if (!jsEvent || (jsEvent && jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39))
			{
				var str = self.input.value.replace(".","");
				str = str.replace(".","");
				str = str.replace("/","");
				str = str.replace("-","");

				part1 = str.substr(0,2);
				part2 = str.substr(2,3);
				part3 = str.substr(5,3);
				part4 = str.substr(8,4);
				part5 = str.substr(12);

				str = part1;
				if (str.length == 2)
					str += "." + part2;
				if (str.length == 6)
					str += "." + part3;
				if (str.length == 10)
					str += "/" + part4;
				if (str.length == 15)
					str += "-" + part5;

				self.input.value = str;
			}
		};

		self.setEvent("keyup",self.setMask);

		//Format CNPJ while typing
		self.setEvent("keypress",function(jsEvent)
		{
			var newvalue = "";
			if (browserType == "ie")
			{
				if (isNaN(String.fromCharCode(jsEvent.keyCode)) && !jsCtrlKey)
				{
					jsEvent.returnValue = false;
				}
				else
					newvalue = String.fromCharCode(jsEvent.keyCode);
			}
			else
			{
				if (isNaN(String.fromCharCode(jsEvent.charCode)) && !jsCtrlKey && (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39))
					jsEvent.preventDefault();
			};
		});

		self.validaCNPJ = function(value)
		{
			if (!value || value.type)
				var CNPJ = self.getValue();
			else 
				var CNPJ = value + "";

			var jscnpj_ok = true;

			if (CNPJ)
			{
				CNPJ = CNPJ.replace(".","");
				CNPJ = CNPJ.replace(".","");
				CNPJ = CNPJ.replace("/","");
				CNPJ = CNPJ.replace("-","");
				if (CNPJ.length != 14 || CNPJ == "00000000000000" || CNPJ == "11111111111111" ||
				CNPJ == "22222222222222" ||	CNPJ == "33333333333333" || CNPJ == "44444444444444" ||
				CNPJ == "55555555555555" || CNPJ == "66666666666666" || CNPJ == "77777777777777" ||
				CNPJ == "88888888888888" || CNPJ == "99999999999999")
				{
					jscnpj_ok = false;
				}
				var a = [];
				var b = new Number;
				var c = [6,5,4,3,2,9,8,7,6,5,4,3,2];
				for (i=0; i<12; i++)
				{
					a[i] = CNPJ.charAt(i);
					b += a[i] * c[i+1];
				}
				if ((x = b % 11) < 2) { a[12] = 0;} else { a[12] = 11-x;}
				b = 0;
				for (y=0; y<13; y++)
				{
					b += (a[y] * c[y]);
				}
				if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11-x; }
				if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13]))
				{
					jscnpj_ok = false;
				}

				if (!jscnpj_ok)
				{
					alert(translation[lang]["error"][1]);
					return false;
				}
			}

			return true;
		};

		//Validates CNPJ on blur
		self.setEvent("blur",self.validaCNPJ);

		self.getValue = function()
		{
			var str = self.input.value.replace(".","");
			str = str.replace(".","");
			str = str.replace("/","");
			str = str.replace("-","");
			return str;
		};

		self.setValue = function(value)
		{
			if (self.validaCNPJ(value) && value)
			{
				self.input.value = value;
				jsEvent = null;
				self.setMask();
			}
			else
				self.input.value = "";

		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};