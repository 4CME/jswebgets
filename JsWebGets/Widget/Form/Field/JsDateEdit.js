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
	JsDateEdit = function (name)
	{
		//sets itself as a div
		var self = new JsWidget(name);

		self.type = "JsDateEdit";

		//small fix for wirephrame
		self.input = true;

		self.day = new JsLineEdit();
		self.month = new JsLineEdit();
		self.year = new JsLineEdit();

		self.setWidth(80);

		self.day.setWidth(20);
		self.month.setWidth(20);
		self.year.setWidth(35);

		self.day.setYPos(0);
		self.month.setYPos(0);
		self.year.setYPos(0);

		self.day.setPosition("relative");
		self.month.setPosition("relative");
		self.year.setPosition("relative");

		if (document.all)
		{
			self.day.style.styleFloat = "left";
			self.month.style.styleFloat = "left";
			self.year.style.styleFloat = "left";
		}
		else
		{
			self.day.style.cssFloat = "left";
			self.month.style.cssFloat = "left";
			self.year.style.cssFloat = "left";
		}

		self.day.setMaxLength(2);
		self.month.setMaxLength(2);
		self.year.setMaxLength(4);

		//allow only numbers
		self.day.setNumeric();
		self.month.setNumeric();
		self.year.setNumeric();

		self.addEvent = function(eventStr)
		{
			if (browserType == "ie")
			{
				self.day.input.attachEvent("on" + eventStr, self.execEvent);
				self.month.input.attachEvent("on" + eventStr, self.execEvent);
				self.year.input.attachEvent("on" + eventStr, self.execEvent);
			}
			else
			{
				self.day.input.addEventListener(eventStr, self.execEvent, false);
				self.month.input.addEventListener(eventStr, self.execEvent, false);
				self.year.input.addEventListener(eventStr, self.execEvent, false);
			}
		};

		self.jumpNext = function(jsEvent)
		{
			if (!jsShiftKey && !jsTabKey && jsEvent.keyCode !=8 && jsEvent.keyCode !=9 && jsEvent.keyCode != 46 && jsEvent.keyCode != 37 && jsEvent.keyCode != 39)
			{
				if (jsRealTarget && jsRealTarget.value.length == jsRealTarget.maxLength)
				{
					if (jsRealTarget && jsRealTarget == jsRealTarget.parentNode.parentNode.js_parent.day.input)
						jsRealTarget.parentNode.parentNode.js_parent.month.input.focus();
					if (jsRealTarget && jsRealTarget == jsRealTarget.parentNode.parentNode.js_parent.month.input)
						jsRealTarget.parentNode.parentNode.js_parent.year.input.focus();
				}
			}
		};

		self.setEvent("keyup", self.jumpNext);

		self.validateDate = function(data)
		{
			if (!data || data.type)
			{
				var js_day = self.day.getValue();
				var js_month = self.month.getValue();
				var js_year = self.year.getValue();

				var value = js_year + "-" + js_month + "-" + js_day;
			}
			else 
				var value = data + "";

			if (value)
			{
				data = value.split(" ");

				if (data[0].search("/") != -1)
					data = data[0]("/");

				if (data[0].search("-") != -1 )
					data = data[0].split("-");

				var js_year = data[0];
				var js_month = data[1];
				var js_day = data[2];

				if (js_day || js_month || js_year)
				{

					var jsdate_ok = false;

					if (js_day > 0 && js_day <=31 && js_year.length == 4)
					{
						if (js_month == 1 || js_month == 3 || js_month == 5 || js_month == 7 || js_month == 8 || js_month == 10 || js_month == 12)
						{
							if (js_day <= 31)
							jsdate_ok = true;
						}
						else if (js_month == 4 || js_month == 6 || js_month == 9 || js_month == 11)
						{
							if (js_day <= 30)
							jsdate_ok = true;
						}

						if (js_year%4)
						{
							if (js_month == 2)
							{
								if (js_day <= 28)
								jsdate_ok = true;
							}
						}
						else if (js_month == 2)
						{
							if (js_day <= 29)
								jsdate_ok = true;
						}
					}
				}
			}
			return jsdate_ok;
		};

		self.checkDate = function()
		{
			if (!self.validateDate())
			{
				alert(translation[lang]["error"][3]);
				return false;
			}
		};

		//validades date input
		//self.setEvent("blur",self.checkDate);

		self.getValue = function()
		{
			if (self.validateDate())
			{
				var js_day = self.day.getValue();
				var js_month = self.month.getValue();
				var js_year = self.year.getValue();

				if (js_day.length < 2)
					js_day = "0" + js_day;

				if (js_month.length < 2)
					js_month = "0" + js_month;

				return js_year + "-" + js_month + "-" + js_day;
			}
			else 
				return "";
		};

		self.setValue = function(value)
		{
			var js_year = "";
			var js_month = "";
			var js_day = "";

			if (self.validateDate(value) && value)
			{
				data = value.split(" ");

				if (data[0].search("/") != -1)
					data = data[0]("/");

				if (data[0].search("-") != -1 )
					data = data[0].split("-");

				js_year = data[0];
				js_month = data[1];
				js_day = data[2];

				if (js_day.length == 1)
				{
					js_day = " 0" + js_day;
					js_day = js_day.replace(" ","");
				}

				if (js_month.length == 1)
				{
					js_month = " 0" + js_month;
					js_month = js_month.replace(" ","");
				}
			}

			self.day.setValue(js_day);
			self.month.setValue(js_month);
			self.year.setValue(js_year);
		};
		
		self.focus = function()
		{
			self.day.focus();
		};
		
		self.disable = function(value)
		{
			self.day.disable(value);
			self.month.disable(value);
			self.year.disable(value);

			if (value)
			{
				for (var js_i in self.events)
				{
					self.delEvent(js_i);
					self.setEvent(js_i,self.disabledWidget);
				}
				self.setEvent("click",self.disabledWidget);
			}
			else
			{
				for (var js_i in self.events)
				{
					self.unsetEvent(js_i,self.disabledWidget);
					self.addEvent(js_i);
				}
				self.unsetEvent("click",self.disabledWidget);
			}
		};

		//had to do this, because this function must be called as last
		//on internet explorer (error if you try to change type after
		//appending it to another object
		self.buildObject = function ()
		{
			self.addItem(self.day);
			self.addItem(self.month);
			self.addItem(self.year);
		};

		//This has to come after setting input.type, or IE will hang
		self.buildObject();

		return self;
	};