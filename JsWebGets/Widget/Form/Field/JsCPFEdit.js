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
	JsCPFEdit = function (name)
	{
		//sets itself as a div
		var self = new JsLineEdit(name);

		self.type = "JsCPFEdit";

		self.input.maxLength = 14;
		self.input.style.width = 100;
		self.style.width = 100;

		self.setMask = function(newvalue)
		{
			if (jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39)
			{
				var str = self.input.value.replace(".","");
				str = str.replace(".","");
				str = str.replace("-","");

				part1 = str.substr(0,3);
				part2 = str.substr(3,3);
				part3 = str.substr(6,3);
				part4 = str.substr(9);

				str = part1;
				if (str.length == 3)
					str += "." + part2;
				if (str.length == 7)
					str += "." + part3;
				if (str.length == 11)
					str += "-" + part4;

				self.input.value = str;
			}
		};

		self.setEvent("keyup",self.setMask);

		//Format CPF while typing
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

		self.validaCPF = function(value)
		{
			if (!value || value.type)
				var CPF = self.getValue();
			else 
				var CPF = value + "";

			var jscpf_ok = true;

			if (CPF)
			{
				CPF = CPF.replace(".","");
				CPF = CPF.replace(".","");
				CPF = CPF.replace("-","");
				if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" ||
				CPF == "22222222222" ||	CPF == "33333333333" || CPF == "44444444444" ||
				CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" ||
				CPF == "88888888888" || CPF == "99999999999")
				{
					jscpf_ok = false;
				}
				soma = 0;
				for (var i=0; i < 9; i ++)
					soma += parseInt(CPF.charAt(i)) * (10 - i);
				resto = 11 - (soma % 11);
				if (resto == 10 || resto == 11)
					resto = 0;
				if (resto != parseInt(CPF.charAt(9)))
					jscpf_ok = false;
				soma = 0;
				for (var i = 0; i < 10; i ++)
					soma += parseInt(CPF.charAt(i)) * (11 - i);
				resto = 11 - (soma % 11);
				if (resto == 10 || resto == 11)
					resto = 0;
				if (resto != parseInt(CPF.charAt(10)))
					jscpf_ok = false;

				if (!jscpf_ok)
				{
					alert(translation[lang]["error"][2]);
					return false;
				}
			}
			return true;
		};

		//Validates CPF on blur
		self.setEvent("blur",self.validaCPF);

		self.getValue = function()
		{
			var str = self.input.value;
			str = str.replace(".","");
			str = str.replace(".","");
			str = str.replace("-","");
			return str;
		};

		self.setValue = function(value)
		{
			if (self.validaCPF(value) && value)
			{
				self.input.value = value;
				self.setMask();
			}
			else
				self.input.value = "";
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};